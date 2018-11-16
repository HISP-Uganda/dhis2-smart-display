import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";
import '@dhis2/d2-ui-core/css/Table.css';
import {Deck, Heading, Image, Slide} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const theme = createTheme(
    {
        primary: '#f5fffa',
        secondary: '#cc168d'
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

    displayContent = (item) => {
        if (item.endpoint === "reportTables" && this.store.presentation.htmlTables) {
            return <div dangerouslySetInnerHTML={{__html: this.store.presentation.htmlTables[item.id]}}/>;
        } else {
            return <Image src={item.url} width="100%"/>
        }
    };

    display = (presentation) => {
        return presentation.map(item => {
            return <Slide key={item.id} className="slide" fit={true}>
                <Heading size={1} fit caps lineHeight={1} textColor="secondary">{item.name}</Heading>
                {/**/}
                {this.displayContent(item)}

            </Slide>
        });
    };

    render() {
        return <div className="main-content">
            <Deck
                transition={this.store.presentation.pTransitionModes}
                transitionDuration={this.store.presentation.transitionDuration}
                autoplay={true}
                controls={true}
                theme={theme}
                bgColor="primary" className="deck">
                {
                    this.display(this.store.presentation.presentation)
                }
            </Deck>
        </div>;
    }
}

Presentation.propTypes = {
    d2: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired
};


export default inject("store")(observer(Presentation));
