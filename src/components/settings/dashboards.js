import React, {Component} from 'react';
import {InputField} from "@dhis2/d2-ui-core";
import {GroupEditor} from "@dhis2/d2-ui-group-editor";
import * as PropTypes from "prop-types";
import {inject, observer} from "mobx-react";

class Dashboards extends Component {
    store = null;

    constructor(props) {
        super(props);
        const {store} = props;
        this.store = store;

    }

    render() {

        const {store} = this.props;
        // const item = { value: store.itemStore.state.length.toString(), text: `VisualizationItem ${store.itemStore.state.length+1}` };
        return <div className="smart-div">
            <InputField
                id="filter"
                label="Filter"
                type="text"
                fullWidth
                value={store.filterText}
                onChange={(value) => store.filterChange(value)}
            />
            <GroupEditor class="dashboard-list"
                         itemStore={store.itemStore}
                         assignedItemStore={store.assignedItemStore}
                         onAssignItems={store.assignItems}
                         onRemoveItems={store.unAssignItems}
                         height={150}
                         filterText={store.filterText}
            />
        </div>
    }
}

Dashboards.propTypes = {
    d2: PropTypes.object.isRequired
};

export default inject("store")(observer(Dashboards));
