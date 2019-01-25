/* global DHIS_CONFIG, manifest */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {init,config} from 'd2/d2'

let baseUrl = '';
// let appUrl = '';
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:8080';
    // appUrl = 'http://localhost:3000'
    config.headers = { Authorization: 'Basic YWRtaW46ZGlzdHJpY3Q=' };

} else {
    let urlArray = window.location.pathname.split('/');
    let apiIndex = urlArray.indexOf('api');
    if (apiIndex > 1) {
        baseUrl = '/' + urlArray[apiIndex - 1];
        // appUrl = '/' + urlArray[apiIndex - 1];
    } else {
        baseUrl = '/';
    }

    baseUrl = window.location.protocol + '//' + window.location.host + baseUrl;
}

// api config
// const isProd = process.env.NODE_ENV === 'production';
// const baseUrl = isProd
//     ? manifest.activities.dhis.href
//     : DHIS_CONFIG.baseUrl;

config.baseUrl = `${baseUrl}/api`;

init(config)
    .then(d2 => {
        ReactDOM.render(
            <App d2={d2} baseUrl={baseUrl}/>, document.getElementById('root'));
    })
    .catch(err => console.error(err));

serviceWorker.unregister();
