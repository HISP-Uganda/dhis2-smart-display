import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";
import '@dhis2/d2-ui-core/css/Table.css';
import {Deck, Heading, Image, Slide} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import Grid from '@material-ui/core/Grid';

import {display} from "./utils";


const theme = createTheme(
    {
        primary: '#f5fffa',
        secondary: '#000000',
        textColor: '#327dcc',
    },
    {
        primary: 'Helvetica'
    }
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
        const {baseUrl}= this.props;
        return <Deck
            transition={this.store.presentation.pTransitionModes}
            transitionDuration={this.store.presentation.transitionDuration}
            autoplay={true}
            autoplayDuration={this.store.presentation.slideDuration}
            controls={true}
            theme={theme}
            textColor={theme.textColor}
            bgColor="primary" className="deck">
            {
                display(this.store.presentation.presentation)
            }
            {console.log(this.store.presentation.presentation)}
        </Deck>
    }
}

Presentation.propTypes = {
    d2: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired
};


export default inject("store")(observer(Presentation));
