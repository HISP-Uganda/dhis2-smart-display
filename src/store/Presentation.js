import {action, computed, decorate, observable} from 'mobx';
import PresentationOption from "./PresentationOption";
import _ from 'lodash';
import {extractFavorite} from "../modules/util";
import DashboardItemContent from "./DashboardItemContent";

class Presentation {
    id;
    name = '';
    dashboards = [];
    description = '';
    baseUrl; //= 'http://localhost:8080'
    transitionModes = [
        new PresentationOption('slide', true),
        new PresentationOption('zoom', true),
        new PresentationOption('spin', true),
        new PresentationOption('fade', true)
    ];
    transitionDuration = 500; // 5 Miliseconds
    slideDuration = 20000; //20 Seconds

    htmlTables;

    // Setters

    setName = val => this.name = val;
    setDashboards = val => this.dashboards = val;
    setDescription = val => this.description = val;
    setTransitionModes = val => this.transitionModes = val;
    setTransitionDuration = val => this.transitionDuration = val;
    setSlideDuration = val => this.slideDuration = val;
    setBaseUrl = val => this.baseUrl = val;
    setId = val => this.id = val;
    setHtmlTables2 = val => this.htmlTables = val;

    setHtmlTables = async (d2) => {
        /*const data = this.dashboards.map(dashboard => {
            return dashboard.dashboardItems.filter(item => {
                return item.selected && item.dashboardItemContent.endpoint === 'reportTables';
            }).map(i => {
                return i.dashboardItemContent.id
            });
        });

        const ids = _.flatten(data);
        const api = d2.Api.getApi();
        const allTables = ids.map(id => {
            return api.get("/reportTables/" + id + "/data.html", {headers: {'Accept': 'text/html'}})
        });

        let found = await Promise.all(allTables);
        let processedTables = {};

        ids.forEach((v, k) => {
            processedTables = {...processedTables, ..._.fromPairs([[v, found[k]]])}
        });*/
        this.setHtmlTables2([]);
    };


    deletePresentation = async (d2, presentations) => {
        const mapping = _.findIndex(presentations, {id: this.id});
        presentations.splice(mapping, 1);
        const whatToSave = presentations.map(p => {
            return p.canBeSaved;
        });
        const namespace = await d2.dataStore.get('smart-slides');
        namespace.set('presentations', whatToSave);
    };

    deletePresentationItem = item => {
        this.dashboards = this.dashboards.map(dashboard => {
            const dashboardItems = dashboard.dashboardItems.map(dashboardItem => {
                const i = extractFavorite(dashboardItem);
                if (i && i.id === item.id) {
                    dashboardItem.setSelected(false);
                }
                return dashboardItem
            });
            return {...dashboard, dashboardItems};
        })
    };

    get canBeSaved() {
        return _.pick(this, ['id', 'name', 'dashboards', 'baseUrl', 'description', 'transitionModes', 'transitionDuration', 'slideDuration'])
    }

    get presentation() {
        if (this.dashboards.length > 0) {
            const items = this.dashboards.map((dashboard, k) => {
                const selected = dashboard.dashboardItems.filter(item => {
                    return item.selected;
                });
                return selected.map((dashboardItem, itemkey) => {

                    const i = extractFavorite(dashboardItem);
                    const content = new DashboardItemContent();

                    content.setId(i.id);
                    content.setName((i.name));
                    content.setInterpretations(i.interpretations);
                    content.setType(i.type);
                    content.setDashboardItemType(dashboardItem.type);

                    return content;
                });
            });

            return _.flatten(items);
        }
        return [];
    }

    get pTransitionModes() {
        return this.transitionModes.filter(mode => {
            return mode.checked;
        }).map(val => {
            return val.name
        });
    }
}

decorate(Presentation, {
    name: observable,
    dashboards: observable,
    description: observable,
    transitionModes: observable,
    transitionDuration: observable,
    slideDuration: observable,
    htmlTables: observable,
    baseUrl: observable,

    setName: action,
    setDashboards: action,
    setDescription: action,
    setTransitionDuration: action,
    setTransitionModes: action,
    setHtmlTables: action,
    setHtmlTables2: action,
    setSlideDuration: action,
    deletePresentation: action,
    setBaseUrl: action,
    deletePresentationItem: action,

    presentation: computed,
    pTransitionModes: computed

});

export default Presentation;
