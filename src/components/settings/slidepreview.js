import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import {slidePreview} from "../presentation/utils";


class SlidePreview extends Component {

    store = null;
    baseUrl = null;

    constructor(props) {
        super(props);
        const {store, d2, baseUrl} = props;
        this.store = store;
        this.store.setBaseUrl(baseUrl);
        this.store.presentation.setHtmlTables(d2);
    }


    render() {
        return <div className="smart-div">
            {
                slidePreview(this.store.presentation, this.props.d2)
            }
        </div>
    }
}

SlidePreview.propTypes = {
    d2: PropTypes.object.isRequired,
    baseUrl:PropTypes.string.isRequired
};


export default inject("store")(observer(SlidePreview));
