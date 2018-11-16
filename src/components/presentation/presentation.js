import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";
import '@dhis2/d2-ui-core/css/Table.css';
import {Deck, Heading, Image, Slide} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';


const theme = createTheme(
    {
        primary: '#f5fffa',
        secondary: '#000000'
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
            return <div dangerouslySetInnerHTML={{__html: this.store.presentation.htmlTables[item.id]}}/>
        } else {
            return <Image src={item.url} width="100%"/>
        }
    };

    display = (presentation) => {
        return presentation.map(item => {
            return <Slide key={item.id} className="slide" fit={true}>
                {this.displayHeader(item)}
                {this.displayContent(item)}
            </Slide>
        });
    };

    displayHeader = (item) => {
        if (item.endpoint === "reportTables") {
            return null;
        }
        return <Heading size={1} fit caps lineHeight={1} textColor="secondary">{item.name}</Heading>
    };

    render() {
        return <Deck
            transition={this.store.presentation.pTransitionModes}
            transitionDuration={this.store.presentation.transitionDuration}
            autoplay={true}
            autoplayDuration={this.store.presentation.slideDuration}
            controls={true}
            theme={theme}
            bgColor="primary" className="deck">
            {
                this.display(this.store.presentation.presentation)
            }
        </Deck>
    }
}

Presentation.propTypes = {
    d2: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired
};


export default inject("store")(observer(Presentation));
