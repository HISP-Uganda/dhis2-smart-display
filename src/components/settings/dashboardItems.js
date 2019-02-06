import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import {Help, InsertChart, Public, ViewList} from "@material-ui/icons";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {inject, observer} from "mobx-react";
import {extractFavorite} from "../../modules/util";

class DashboardItems extends Component {
    store = null;

    constructor(props) {
        super(props);
        const {store} = props;
        this.store = store;
        // this.handleChange = this.handleChange.bind(this);
    }


    handleToggle = value => () => {
        const {checked} = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };

    displayAvatar(endpoint) {
        // console.log(endpoint);
        if (endpoint === 'REPORT_TABLE' || endpoint === 'EVENT_REPORT') {
            return <ViewList/>
        } else if (endpoint === 'CHART' || endpoint === 'EVENT_CHART') {
            return <InsertChart/>
        } else if (endpoint === 'MAP') {
            return <Public/>
        } else {
            return <Help/>
        }
    }

    render() {
        const {presentation} = this.store;
        return <div>

            {
                presentation.dashboards.map((d, k) => {
                    return <div className="smart-div" key={d.id}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <h4>{d.name}</h4>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <List>
                                    {
                                        d.dashboardItems.map((item, key) => {
                                            return <ListItem key={key} role={undefined} dense
                                                             className="fullList">
                                                <Avatar className="avatar-list">
                                                    {this.displayAvatar(item.type)}
                                                    {/*<ViewList/>*/}
                                                </Avatar>

                                                <ListItemText primary={extractFavorite(item).name}/>
                                                <Checkbox checked={item.selected}
                                                          onChange={item.handleChange}/>
                                            </ListItem>

                                        })
                                    }
                                </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                })
            }
        </div>
    }
}

DashboardItems.propTypes = {
    d2: PropTypes.object.isRequired
};

export default inject("store")(observer(DashboardItems));
