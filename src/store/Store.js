import {action, configure, decorate, observable} from 'mobx';
import {Store as SmartStore} from "@dhis2/d2-ui-core";
import _ from 'lodash';
import Presentation from "./Presentation";
import Dashboard from "./Dashboard";
import DashboardItem from "./DashboardItem";
import DashboardItemContent from "./DashboardItemContent";
import PresentationOption from "./PresentationOption";
import {generateUid} from 'd2/uid';


configure({enforceActions: "observed"});

class Store {

    constructor() {
        this.itemStore.state = [];
        this.assignedItemStore.state = [];
    }


    name = 'Test Store state management';
    //Content.js Variables
    dashboards = [];
    filterText = '';
    selectedDashboards = [];
    checked = [];
    activeStep = 0;
    skipped = new Set();

    presentation;
    presentations = [];
    isFull = false;

    status = 1;

    itemStore = SmartStore.create();
    assignedItemStore = SmartStore.create();

    loadDashboards = async (d2) => {
        const api = d2.Api.getApi();
        const {dashboards} = await api.get('dashboards', {
            paging: false,
            fields: 'id,name,created,dashboardItems[*,map[*],chart[*],reportTable[*]]'
        });
        this.dashboards = dashboards.map(dashboard => {
            const dashboardItems = dashboard.dashboardItems.map(dashboardItem => {
                let dashboardItemContent = {};
                if (dashboardItem['chart']) {

                    dashboardItemContent = {...dashboardItem['chart'], endpoint: 'charts'};

                } else if (dashboardItem['map']) {
                    dashboardItemContent = {...dashboardItem['map'], endpoint: 'maps'};
                } else if (dashboardItem['reportTable']) {
                    dashboardItemContent = {...dashboardItem['reportTable'], endpoint: 'reportTables'};
                }

                return {...dashboardItem, dashboardItemContent}
            });
            return {...dashboard, dashboardItems};
        });

        let items = this.dashboards.map(d => {
            return {text: d.name, value: d.id};
        });

        if (this.presentation) {
            const ass = this.presentation.dashboards.map(d => {
                return {text: d.name, value: d.id};
            });

            const assignedIds = ass.map(i => {
                return i.value;
            });


            items = items.filter(obj => {
                return !(assignedIds.indexOf(obj.value) !== -1);
            });

            const assigned = this.assignedItemStore.state.concat(ass);
            this.assignedItemStore.setState(assigned);


            this.itemStore.setState(items);
        } else {
            this.itemStore.setState(items);
        }

        return Promise.resolve();
    };

    setBaseUrl = (baseUrl) => {
        if (this.presentation) {
            this.presentation.setBaseUrl(baseUrl);
        }
    };

    goFull = () => {
        this.isFull = true;
    };

    setFull = val => {
        this.isFull = val;
    };

    convert = (pre) => {
        let p = new Presentation();
        p.setName(pre.name);
        p.setDescription(pre.description);
        p.setId(pre.id || p.id);

        const transModes = pre.transitionModes.map(m => {
            return new PresentationOption(m.name, m.checked);
        });
        p.setTransitionDuration(parseInt(pre.transitionDuration, 10) || p.transitionDuration);
        p.setSlideDuration(parseInt(pre.slideDuration, 10) || p.slideDuration);
        p.setTransitionModes(transModes);
        const {dashboards} = pre;
        let selectedDashboards = [];
        dashboards.forEach(d => {
            const dashboard = new Dashboard();
            dashboard.setId(d.id);
            dashboard.setItemCount(d.itemCount);
            dashboard.setName(d.name);

            let items = [];

            d.dashboardItems.forEach(item => {
                const dashboardItem = new DashboardItem();
                dashboardItem.setId(item.id);

                dashboardItem.setSelected(item.selected || dashboardItem.selected);

                const content = new DashboardItemContent();
                content.setId(item.dashboardItemContent.id);
                content.setCreated(item.dashboardItemContent.created);
                content.setName((item.dashboardItemContent.name));
                content.setInterpretations(item.dashboardItemContent.interpretations);
                content.setEndpoint(item.dashboardItemContent.endpoint);
                dashboardItem.setDashboardItemContent(content);
                items = [...items, dashboardItem];

            });
            dashboard.setDashboardItems(items);
            selectedDashboards = [...selectedDashboards, dashboard]
        });
        p.setDashboards(selectedDashboards);
        return p;
    };

    // Setters

    setPresentations = val => this.presentations = val;
    setPresentation = val => this.presentation = val;

    checkDataStore = async (d2) => {
        try {
            const val = await d2.dataStore.has('smart-slides');
            if (val) {
                const namespace = await d2.dataStore.get('smart-slides');
                const presentations = await namespace.get('presentations');
                const processed = presentations.map(pre => {
                    return this.convert(pre);
                });
                this.setPresentations(processed);
            } else {
                const namespace = await d2.dataStore.create('smart-slides');
                namespace.set('presentations', this.presentations);
            }
        } catch (e) {
            console.log(e);
        }
    };

    filterChange = e => {
        this.filterText = e;
    };

    assignItems = (items) => {
        // const assigned = this.assignedItemStore.concat(items);
        const assigned = this.assignedItemStore.state.concat(items);
        this.assignedItemStore.setState(assigned);
        this.selectedDashboards = assigned;

        // console.log(this.dashboards);
        const dashboards = this.dashboards.filter(d => {
            return assigned.indexOf(d.id) >= 0;
        });

        const transitionModes = [
            {name: 'slide', checked: true},
            {name: 'zoom', checked: true},
            {name: 'spin', checked: true},
            {name: 'fade', checked: true}];
        this.setPresentation(this.convert({dashboards, transitionModes}));
        return Promise.resolve();
    };

    editPresentation = model => {
        this.setPresentation(model);
        this.setStatus(2);
    };


    unAssignItems = (items) => {
        const assigned = this.assignedItemStore.state.filter(item => items.indexOf(item) === -1);

        this.assignedItemStore.setState(assigned);
        this.selectedDashboards = assigned;
        return Promise.resolve();
    };

    setStatus = value => this.status = value;
    setStatus2 = value => () => this.setStatus(value);

    savePresentation = async (d2) => {
        if (this.presentation.id) {
            const mapping = _.findIndex(this.presentations, {id: this.presentation.id});
            if (mapping !== -1) {
                this.presentations.splice(mapping, 1, this.presentation);
            } else {
                this.presentations = [...this.presentations, this.presentation];
            }
        } else {
            this.presentation.setId(generateUid());
            this.presentations = [...this.presentations, this.presentation];
        }

        const whatToSave = this.presentations.map(p => {
            return p.canBeSaved;
        });
        const namespace = await d2.dataStore.get('smart-slides');
        namespace.set('presentations', whatToSave);
    };

}


decorate(Store, {
    name: observable,
    dashboards: observable,
    filterText: observable,
    selectedDashboards: observable,
    status: observable,
    isFull: observable,

    checked: observable,
    checkedItems: observable,
    activeStep: observable,
    skipped: observable,
    presentation: observable,
    presentations: observable,
    loadDashboards: action,
    filterChange: action,
    assignItems: action,
    unAssignItems: action,
    checkDataStore: action,
    setPresentations: action,
    savePresentation: action, //Added
    setPresentation: action,
    setStatus: action,
    setFull: action,
    goFull: action,
    editPresentation: action
});
export default new Store();
