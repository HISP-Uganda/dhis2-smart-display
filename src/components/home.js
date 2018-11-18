import React from 'react';
import {Delete, Edit, Notes, Print, Tv, Visibility} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";

import Table from '@dhis2/d2-ui-table';
import '@dhis2/d2-ui-core/css/Table.css';

import ContentSettings from './settings/contents';
import SmartDisplay from './presentation'

import Button from "@material-ui/core/Button/Button";
import AddIcon from '@material-ui/icons/Add';
import Fullscreen from "react-full-screen";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class HomePage extends React.Component {
    store = null;

    constructor(props) {
        super(props);
        const {store, d2} = props;

        this.store = store;
        store.checkDataStore(d2);
        // Translations are all available below
        d2.i18n.translations['name'] = "Presentation Name";
        d2.i18n.translations['description'] = "Presentation Description";
        d2.i18n.translations['present'] = "Start Smart Display";
        d2.i18n.translations['preview'] = "Preview Presentation";
        d2.i18n.translations['edit'] = "Edit Presentation";
        d2.i18n.translations['details'] = "Show details";
        d2.i18n.translations['print'] = "Print Presentation";
        d2.i18n.translations['delete'] = "Delete Presentation";
    }

    present = args => {
        this.store.goFull();
        this.store.setPresentation(args);
        this.store.setStatus(3);
    };

    smartMenuActions = {
        preview(...args) {
            console.log('Edit', ...args);
        },
        present: this.present,
        edit(...args) {
            console.log('Edit', ...args);
        },
        details(...args) {
            // console.log('Edit', ...args);
        },
        print(...args) {
            console.log('Edit', ...args);
        },
        delete(...args) {
            console.log('Remove', ...args);
        }
    };

    render() {
        const {d2, store, baseUrl} = this.props;

        const style = {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
        };

        let display = '';
        console.log(store.presentations.length);
        if (this.store.status === 1) {
            if (store.presentations.length > 0) {
                display = <div>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            {/*<Paper className={classes.paper}>xs=12</Paper>*/}
                            <Card className="start">
                                <CardContent>
                                    <h2 className="app-info">Please select a presentation to display on your smart
                                        screen or create a new
                                        presentation by clicking on the + Button below</h2>
                                    <Table
                                        columns={['name', 'description']}
                                        rows={store.presentations}
                                        contextMenuActions={this.smartMenuActions}
                                        contextMenuIcons={
                                            {
                                                edit: <Edit/>,
                                                present: <Tv/>,
                                                delete: <Delete/>,
                                                details: <Notes/>,
                                                print: <Print/>,
                                                preview: <Visibility/>
                                            }
                                        }
                                        // primaryAction={this.store.editPresentation}
                                        primaryAction={this.smartMenuActions.preview}
                                    />
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Share
                                    </Button>
                                    <Button size="small" color="primary">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                    <Button variant="fab" style={style} onClick={this.store.setStatus2(2)}
                            color="primary">
                        <AddIcon/>
                    </Button>
                </div>
            } else {
                const boxStyle = {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }
                const iconStyles = {
                    largeIcon: {
                        width: 60,
                        height: 60,
                    },
                }
                display = <div>
                    <div style={boxStyle}>

                        <h2 className="app-info">
                            <Tv style={iconStyles.largeIcon}/> <br/>
                            No presentation available. Please start by Creating a Presentation
                        </h2>
                    </div>
                    <Button variant="fab" style={style} onClick={this.store.setStatus2(2)}
                            color="primary">
                        <AddIcon/>
                    </Button>
                </div>
            }


        } else if (this.store.status === 2) {
            display = <ContentSettings d2={d2} baseUrl={baseUrl}/>
        } else if (this.store.status === 3) {
            display = <SmartDisplay d2={d2} baseUrl={baseUrl}/>

        }

        return <Fullscreen enabled={this.store.isFull} onChange={isFull => this.store.setFull(isFull)}>
            {display}
        </Fullscreen>

    }
}


HomePage.propTypes = {
    d2: PropTypes.object.isRequired
};

export default inject("store")(observer(HomePage));
