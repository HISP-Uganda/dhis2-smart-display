import {action, decorate, observable} from 'mobx';

class DashboardItemContent {
    id;
    name;
    created;
    interpretations = [];
    endpoint;

    setId = val => this.id = val;
    setName = val => this.name = val;
    setInterpretations = val => this.interpretations = val;
    setCreated = val => this.created = val;
    setEndpoint = val => this.endpoint = val;
}

decorate(DashboardItemContent, {
    id: observable,
    name: observable,
    interpretations: observable,
    created: observable,

    setId: action,
    setName: action,
    setInterpretations: action,
    setCreated: action,
    setEndpoint: action

});

export default DashboardItemContent;
