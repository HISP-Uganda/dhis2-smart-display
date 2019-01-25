import React, {Component} from 'react';
import './App.css';
import HomePage from "./components/home";
import D2UIApp from '@dhis2/d2-ui-app';
import HeaderBar from '@dhis2/d2-ui-header-bar';
import * as PropTypes from "prop-types";
import {Provider} from 'mobx-react';
import Store from "./store/Store";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            d2: props.d2,
        };
    }

    getChildContext() {
        return {d2: this.state.d2};
    }

    render() {
        const {d2, baseUrl} = this.props;
        return (
            //State Management
            <Provider store={Store}>
                <D2UIApp>
                    <HeaderBar d2={d2} className="app-header" />
                    <HomePage d2={d2} baseUrl={baseUrl}/>
                </D2UIApp>
            </Provider>
        );
    }
}

App.childContextTypes = {
    d2: PropTypes.object,
};

App.propTypes = {
    d2: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired
}
export default App;
