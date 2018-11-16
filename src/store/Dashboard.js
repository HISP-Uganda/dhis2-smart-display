import {action, decorate, observable} from 'mobx';

class Dashboard {
    id;
    name;
    itemCount;
    dashboardItems =[];

    setId = val => this.id = val;
    setName = val => this.name = val;
    setItemCount = val => this.itemCount = val;
    setDashboardItems = val => this.dashboardItems = val;

}

decorate(Dashboard, {
    id:observable,
    name: observable,
    dashboardItems:observable,
    itemCount:observable,

    setId: action,
    setName: action,
    setItemCount:action,
    setDashboardItems:action

});

export default Dashboard;