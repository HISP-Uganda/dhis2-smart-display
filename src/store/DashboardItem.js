import {decorate, observable, action} from 'mobx';

class DashboardItem {
    id;
    selected = true;
    shape;
    type;

    chart;
    map;
    reportTable;
    eventReport;
    eventChart;
    appKey;

    text = '';
    messages = [];
    reports = [];
    resources = [];
    users = [];

    dashboardItemContent;

    setId = val => this.id = val;
    setSelected = val => this.selected = val;
    setShape = val => this.shape = val;
    setType = val => this.type = val;
    setReports = val => this.reports = val;
    setResources = val => this.resources = val;
    setUsers = val => this.users = val;

    setChart = val => this.chart = val;
    setMap = val => this.map = val;
    setReportTable = val => this.reportTable = val;
    setEventReport = val => this.eventReport = val;
    setEventChart = val => this.eventChart = val;
    setAppKey = val => this.appKey = val;

    setDashboardItemContent = val => this.dashboardItemContent = val;

    handleChange = e => {
        const isChecked = e.target.checked;
        this.setSelected(isChecked);
    };

    deleteItem = () => {
        this.setSelected(false)
    }
}

decorate(DashboardItem, {
    id: observable,
    dashboardItemContent: observable,
    selected: observable,


    chart: observable,
    map: observable,
    reportTable: observable,
    eventReport: observable,
    eventChart: observable,
    appKey: observable,

    text: observable,
    messages: observable,
    reports: observable,
    resources: observable,
    users: observable,

    setId: action,
    setDashboardItemContent: action,
    setSelected: action,
    handleChange: action,
    setShape: action,
    setType: action,
    setReports: action,
    setResources: action,
    setUsers: action,

});

export default DashboardItem;