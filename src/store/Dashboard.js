import {action, decorate, observable} from 'mobx';

class Dashboard {
    id;
    name;
    itemCount;
    dashboardItems =[];
    presentationItems = [];


    setId = val => this.id = val;
    setName = val => this.name = val;
    setItemCount = val => this.itemCount = val;
    setDashboardItems = val => this.dashboardItems = val;
    setPresentationItems = val => this.presentationItems = val;

}

decorate(Dashboard, {
    id:observable,
    name: observable,
    dashboardItems:observable,
    presentationItems:observable,
    itemCount:observable,

    setId: action,
    setName: action,
    setItemCount:action,
    setDashboardItems:action,
    setPresentationItems:action

});

export default Dashboard;