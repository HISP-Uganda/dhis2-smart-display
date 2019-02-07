import React, {Component} from 'react';
import * as  PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";
import '@dhis2/d2-ui-core/css/Table.css';
import {Deck} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';

import {display} from "./utils";
import {Home} from "@material-ui/icons";
import Button from "@material-ui/core/Button/Button";
// import {Link } from "react-router-dom";


const theme = createTheme(
    {
        primary: 'white',
        secondary: '#000000',
        textColor: '#327dcc',
        // marginTop: 50
    },
    {
        primary: 'Helvetica'
    },
);


class Presentation extends Component {
    store = null;

    constructor(props) {
        super(props);
        const {store, baseUrl, d2} = this.props;
        this.store = store;
        this.store.setBaseUrl(baseUrl);
        this.store.presentation.setHtmlTables(d2)
    }


    render() {
        const {d2} = this.props;
        const style = {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            textColor: '#FFFFFF',
            position: 'fixed',
        };
        return <div>
            <Deck
                transition={this.store.presentation.pTransitionModes}
                transitionDuration={this.store.presentation.transitionDuration}
                autoplay={true}
                autoplayDuration={this.store.presentation.slideDuration}
                controls={true}
                theme={theme}
                textColor={theme.textColor}
                bgColor="primary" className="deck">
                {
                    display(this.store.presentation, d2)
                }
            </Deck>
            <Button variant="fab" style={style} color="primary" onClick={this.store.returnHome}>
                <Home/>
            </Button>
        </div>
    }
}

Presentation.propTypes = {
    d2: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired
};


export default inject("store")(observer(Presentation));
