import {action, computed, decorate, observable} from 'mobx';
import PresentationOption from "./PresentationOption";
import _ from 'lodash';

class Presentation {
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
    transitionDuration = 5000; // 5 seconds

    htmlTables;

    // Setters

    setName = val => this.name = val;
    setDashboards = val => this.dashboards = val;
    setDescription = val => this.description = val;
    setTransitionModes = val => this.transitionModes = val;
    setTransitionDuration = val => this.transitionDuration = val;
    setBaseUrl = val => this.baseUrl = val;

    setHtmlTables2 = val => this.htmlTables = val;

    setHtmlTables = async (d2) => {

        const data = this.dashboards.map(dashboard => {
            return dashboard.dashboardItems.filter(item => {
                return item.selected && item.dashboardItemContent.endpoint === 'reportTables';
            }).map(i => {
                return i.dashboardItemContent.id
            });
        });

        const ids = _.flatten(data);
        const api = d2.Api.getApi();
        const allTables = ids.map(id => {
            return api.get("reportTables/" + id + "/data.html", {headers: {'Accept': 'text/html'}})
        });

        let found = await Promise.all(allTables);

        let processedTables = {};

        ids.forEach((v, k) => {
            processedTables = {...processedTables, ... _.fromPairs([[v, found[k]]])}
        });
        this.setHtmlTables2(processedTables);
    };

    onNameChange = (singleHintText) => {
        this.setName(singleHintText)
    };

    onDescriptionChange = (singleHintText) => {
        this.setDescription(singleHintText)
    };

    onDurationChange = (singleHintText) => {
        this.setTransitionDuration(singleHintText)
    };

    get canBeSaved() {
        return _.pick(this, ['name', 'dashboards', 'description', 'transitionModes', 'transitionDuration'])
    }

    get presentation() {
        const items = this.dashboards.map((dashboard, k) => {
            const selected = dashboard.dashboardItems.filter(item => {
                return item.selected;
            });
            return selected.map((dashboardItem, itemkey) => {
                // const baseUrl = "http://localhost:8080/api/";
                const endpoint = dashboardItem.dashboardItemContent.endpoint;
                const id = dashboardItem.dashboardItemContent.id;
                let url = this.baseUrl + "/api/" + endpoint + "/" + id + "/data";
                if (endpoint === "reportTables") {
                    url = url + ".html";
                }
                return {...dashboardItem.dashboardItemContent, url};
            });
        });

        return _.flatten(items);
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
    htmlTables: observable,

    setName: action,
    setDashboards: action,
    setDescription: action,
    setTransitionDuration: action,
    setTransitionModes: action,
    setHtmlTables: action,
    setHtmlTables2: action,

    presentation: computed,
    pTransitionModes: computed

});

export default Presentation;
