import isObject from 'lodash/isObject';

import {apiFetchFavorite, getMapFields} from '../api/metadata';
import {
    REPORT_TABLE,
    CHART,
    MAP,
    EVENT_REPORT,
    EVENT_CHART,
    itemTypeMap,
} from './itemTypes';
import {getBaseUrl, orObject, getGridItemDomId} from './util';

export const extractMapView = map =>
    map.mapViews && map.mapViews.find(mv => mv.layer.includes('thematic'));

// export const getId = item => extractFavorite(item).id;
// export const getName = item => extractFavorite(item).name;
// export const getDescription = item => extractFavorite(item).description;
// export const getLink = (item, d2) => {
//     const baseUrl = getBaseUrl(d2);
//     const appUrl = itemTypeMap[item.type].appUrl(getId(item));
//
//     return `${baseUrl}/${appUrl}`;
// };

const getUserOrgUnitIds = (ouPaths = []) => {
    return ouPaths.map(ouPath => ouPath.split('/').slice(-1)[0]);
};

// if original visualisation, set id and let the plugin handle it
// otherwise fetch and pass the correct config to the plugin


export const resize = item => {
    const plugin = itemTypeMap[item.type].plugin;

    if (plugin && plugin.resize) {
        plugin.resize(getGridItemDomId(item.id));
    }
};

export const unmount = (item, activeType) => {
    const plugin = itemTypeMap[activeType].plugin;

    if (plugin && plugin.unmount) {
        plugin.unmount(getGridItemDomId(item.id));
    }
};
