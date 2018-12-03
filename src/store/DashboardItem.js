import {decorate, observable, action} from 'mobx';

class DashboardItem {
    id;
    selected = true;
    dashboardItemContent;

    setId = val => this.id = val;
    setSelected = val => this.selected = val;
    setDashboardItemContent = val => this.dashboardItemContent = val;

    handleChange = e =>{
        const isChecked = e.target.checked;
        this.setSelected(isChecked);
    };

    deleteItem = ()=>{
        this.setSelected(false)
    }
}

decorate(DashboardItem, {
    id: observable,
    dashboardItemContent: observable,
    selected: observable,

    setId: action,
    setDashboardItemContent: action,
    setSelected:action,
    handleChange:action

});

export default DashboardItem;