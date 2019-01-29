import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
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
        const {item, classes} = this.props;
        return <div id={item.getItemId} className={classes.map}>
        </div>
    }

    componentDidMount() {
        const {item, d2} = this.props;
        item.load(d2)
    }

}

export default withStyles(styles)(inject("store")(observer(Visualization)));