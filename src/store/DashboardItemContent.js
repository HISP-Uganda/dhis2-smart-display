import {action, computed, decorate, observable} from 'mobx';
import {getEndPointName} from "../api";
import {itemTypeMap, MAP} from "../modules/itemTypes";
import {getMapFields} from "../api/metadata";
import {orObject} from "../modules/util";
import {extractMapView} from "../modules/plugin";

class DashboardItemContent {
    id;
    name;
    type;
    interpretations = [];
    dashboardItemType;


    setId = val => this.id = val;
    setName = val => this.name = val;
    setType = val => this.type = val;
    setInterpretations = val => this.interpretations = val;
    setDashboardItemType = val => this.dashboardItemType = val;


    configureFavorite = async (d2) => {
        const api = d2.Api.getApi();
        const fetchedFavorite = await api.get(`${getEndPointName(this.dashboardItemType)}/${this.id}`, {
            fields: this.dashboardItemType === MAP ? getMapFields() : null,
        });

        const favorite = this.dashboardItemType === MAP ? orObject(extractMapView(fetchedFavorite)) : fetchedFavorite;

        // favorite.id = null;

        return favorite;
    };

    get getItemId() {
        return `item-${this.id}`
    }

    loadPlugin = (plugin, config, d2) => {
        if (!(plugin && plugin.load)) {
            return;
        }

        const api = d2.Api.getApi();

        const idx = api.baseUrl.indexOf('/api');
        plugin.url = idx > -1 ? api.baseUrl.slice(0, idx) : api.baseUrl;
        plugin.auth = api.defaultHeaders.Authorization;
        plugin.loadingIndicator = true;
        // plugin.dashboard = true;

        // plugin.auth = d2.auth;

        plugin.load(config);
    };

    // const configureFilter = (filter = {}) => {
    //     const ouIds = getUserOrgUnitIds(filter[FILTER_USER_ORG_UNIT]);
    //     const userOrgUnitFilter = ouIds.length
    //         ? {[FILTER_USER_ORG_UNIT]: ouIds}
    //         : {};
    //
    //     return Object.assign({}, ...filter, userOrgUnitFilter);
    // };


    load = async (d2) => {
        const config = {
            // ...(await this.configureFavorite(d2)),
            id: this.id,
            el: this.getItemId,
            // userOrgUnit: ['O6uvpzGd5pu']
        };

        //         id: mapId,
        //         el: 'map',

        const plugin = itemTypeMap[this.dashboardItemType].plugin;

        this.loadPlugin(plugin, config, d2);
    };

}

decorate(DashboardItemContent, {
    id: observable,
    name: observable,
    interpretations: observable,
    type: observable,
    dashboardItemType: observable,

    setId: action,
    setName: action,
    setInterpretations: action,
    setType: action,
    setDashboardItemType: action,
    getItemId: computed

});

export default DashboardItemContent;
