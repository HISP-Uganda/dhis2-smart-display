import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {init} from 'd2/d2'

let baseUrl = '';
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:8080/dhis';
} else {
    let urlArray = window.location.pathname.split('/');
    let apiIndex = urlArray.indexOf('api');
    if (apiIndex > 1) {
        baseUrl = '/' + urlArray[apiIndex - 1];
    } else {
        baseUrl = '/';
    }

    baseUrl = window.location.protocol + '//' + window.location.host + baseUrl
}

init({baseUrl: baseUrl + '/api'})
    .then(d2 => {
        ReactDOM.render(
            <App d2={d2} baseUrl={baseUrl}/>, document.getElementById('root'));
    })
    .catch(err => console.error(err));

serviceWorker.unregister();
