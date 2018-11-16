import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import Card from "@material-ui/core/Card/Card";
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';


class SlidePreview extends Component {

    store = null;

    constructor(props) {
        super(props);
        const {store} = props;
        this.store = store;
    }

    render() {
        const {baseUrl} = this.props;
        return <div className="smart-div">
            {
                this.store.presentation.dashboards.map((d, k) => {
                    const items = d.dashboardItems.filter(i => {
                        return i.selected;
                    });
                    return <Grid container spacing={8} key={k}>
                        {
                            items.map(item => {
                                // console.log(item)
                                // const baseUrl = "http://localhost:8080/api/";
                                const endpoint = item.dashboardItemContent.endpoint;
                                const id = item.dashboardItemContent.id;
                                let url = baseUrl+"/api/" + endpoint + "/" + id + "/data";
                                if (endpoint === "reportTables") {
                                    url = url + ".html";
                                }
                                return <Grid item xs={3} key={item.id}>
                                    <Paper className="slide-preview">

                                        <Card className="slide-preview">
                                            <CardHeader
                                                action={
                                                    <IconButton>
                                                        <MoreVertIcon/>
                                                    </IconButton>
                                                }
                                                // title={d.name}
                                                subheader={item.dashboardItemContent.name + " - " + endpoint}
                                                className="slide-preview-header"
                                            >
                                            </CardHeader>
                                            <CardMedia
                                                title={item.dashboardItemContent.name}
                                                style={{height: 200, width: '95%'}}
                                                image={url}
                                            />
                                        </Card>
                                    </Paper>
                                </Grid>
                            })
                        }
                    </Grid>
                })
            }
        </div>
    }
}

SlidePreview.propTypes = {
    d2: PropTypes.object.isRequired,
    baseUrl:PropTypes.string.isRequired
};


export default inject("store")(observer(SlidePreview));
