import React, {Component} from 'react';
import './App.css';
import HomePage from "./components/home";
import D2UIApp from '@dhis2/d2-ui-app';
import HeaderBar from '@dhis2/d2-ui-header-bar';
import * as PropTypes from "prop-types";
import {Provider} from 'mobx-react';
import Store from "./store/Store";
import {Tv} from '@material-ui/icons';

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
        // const {value} = this.state;
        return (
            //State Management
            <Provider store={Store}>
                {/*<Router>*/}
                <D2UIApp>
                    <HeaderBar d2={d2} className="app-header" />
                    <div className="main-content">
                        <HomePage d2={d2} baseUrl={baseUrl}/>
                    </div>

                    {/*  <AppBar position="static" className="appTab">
                            <Tabs value={value} onChange={this.handleChange} className="test-class">
                                <Tab label="Home" component={Link} to={`/`} icon={<Home/>}/>
                                <Tab label="Smart Display" component={Link} to={`/smartdisplay`} icon={<Tv/>}/>
                                <Tab label="Settings" component={Link} to={`/settings`} icon={<Settings/>}/>
                                <Tab label="Help" component={Link} to={`/help`} icon={<Help/>}/>
                            </Tabs>
                        </AppBar>*/}
                    {/* <Route exact path='/' render={(props) => <HomePage {...props} d2={d2}/>}/>
                        <Route path={`/settings/content`} render={(props) => <ContentSettings {...props} d2={d2}/>}/>

                        <Route path={`/smartdisplay`} render={(props) => <SmartDisplay {...props} d2={d2}/>}/>*/}

                </D2UIApp>
                {/*</Router>*/}
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
