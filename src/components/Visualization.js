import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
// import Button from "@material-ui/core/Button";
// import {InputField} from '@dhis2/d2-ui-core';

const styles = theme => ({
    map: {
        // margin: 'auto',
        height: '75vh',
        padding: '0 4px 4px',
        overflow: 'auto',
        // border: '1px solid black'
    },
    container: {
        overflow: 'auto'
    }
});


class Visualization extends Component {
    render() {
        const {item, height, width} = this.props;
        let style = {
            height: height || '75vh',
            padding: '0 4px 4px',
            overflow: 'auto',
        };

        if (width) {
            style = {...style, width}
        }
        return <div>
            <div>{item.name}</div>
            <div id={item.getItemId} style={style}></div>
        </div>
    }

    componentDidMount() {
        const {item, d2} = this.props;
        item.load(d2)
    }

}

Visualization.propTypes = {
    d2: PropTypes.object.isRequired,
    height: PropTypes.string,
    width: PropTypes.string
};


export default withStyles(styles)(inject("store")(observer(Visualization)));
