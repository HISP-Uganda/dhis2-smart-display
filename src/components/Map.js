import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import Button from "@material-ui/core/Button";
import {InputField} from '@dhis2/d2-ui-core';

const styles = theme => ({
    paper: {
        width: '90%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    map: {
        width: '450px',
        height: '450px',
        border: '1px solid black'
    }
});


class Map extends Component {
    render() {
        const {store, baseUrl,classes} = this.props;
        return <div>
            {/*<div id="savedMapPicker" className="savedMapPicker">
                <div>
                    <label>Saved Map ID</label>
                    <InputField id="inputMapID" value={store.inputMapID} onChange={store.setInputMapID}/>
                </div>
                <div>
                    <label>User Org Unit</label>
                    <InputField id="inputUserOrgUnit" value={store.inputUserOrgUnit}
                                onChange={store.setInputUserOrgUnit}/>
                    <small><strong>Bo</strong> district = <strong>O6uvpzGd5pu</strong></small>
                </div>
                <div>

                </div>
            </div>*/}
            <Button onClick={store.load(store.inputMapID, store.inputUserOrgUnit, baseUrl)}>Load</Button>
            <div id="mapContainer">
                <div id="map" className={classes.map}>
                </div>
            </div>
        </div>
    }

}

export default withStyles(styles)(inject("store")(observer(Map)));