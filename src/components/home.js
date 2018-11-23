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
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {displayPreview} from "./presentation/utils";


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

const styles = theme => ({
    paper: {
        // position: 'absolute',
        width: '90%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});


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
        d2.i18n.translations['assign_all'] = "Assign All";
        // Menu bar translations
        d2.i18n.translations['app_search_placeholder'] = 'Search Apps';
        d2.i18n.translations['manage_my_apps'] = 'Manage My Apps';
        d2.i18n.translations['settings'] = 'Settings';
        d2.i18n.translations['account'] = 'Account';
        d2.i18n.translations['profile'] = 'Profile';
        d2.i18n.translations['log_out'] = 'Logout';
        d2.i18n.translations['help'] = 'Help';
        d2.i18n.translations['about_dhis2'] = 'About DHIS2';
        d2.i18n.translations['id'] = 'Id';

        this.state = {open: false,}
    }

    present = args => {
        this.store.goFull();
        this.store.setPresentation(args);
        this.store.presentation.setBaseUrl(this.props.baseUrl);
        this.store.setStatus(3);
    };

    preview = args => {
        this.store.setPresentation(args);
        this.store.presentation.setBaseUrl(this.props.baseUrl);
        this.store.presentation.setHtmlTables(this.props.d2);
        this.setState({open: true})
    };

    delete = args => {
        args.deletePresentation(this.props.d2, this.store.presentations).then(deleted => {

        });
    };

    edit = args => {
        this.store.editPresentation(args);
    };

    smartMenuActions = {
        preview: this.preview,
        present: this.present,
        edit: this.edit,
        details(...args) {
            // console.log('Edit', ...args);
        },
        print(...args) {
            console.log('Edit', ...args);
        },
        delete: this.delete
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    getModalStyle = () => {
        return {
            // top: `${top}%`,
            // left: `${left}%`,
            // width: `${width}%`,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '5%',
            marginBottom: '10%',
            height: 400,
            backgroundColor: '#85bbda'
            // height,
            // margin:'auto',
            // transform: `translate(-${top}%, -${left}%)`,
        };
    };

    displayPreview = () => {
        if (this.store.presentation) {

            return displayPreview(this.store.presentation)
        }

        return null;
    };

    render() {
        const {d2, store, baseUrl, classes} = this.props;

        const style = {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
        };

        const previewSettings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: true
        }

        let display = '';
        console.log(this.store.status);
        if (this.store.status === 1) {
            if (store.presentations.length > 0) {
                display = <div>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            {/*<Paper className={classes.paper}>xs=12</Paper>*/}
                            <Card className="start">
                                <CardContent>
                                    <h2 className="info-header">To get started, click on a presentation below or add a
                                        new one to continue</h2>
                                    <Table
                                        columns={['id', 'name', 'description']}
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

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
                style={{alignItems: 'center', justifyContent: 'center'}}
            >
                <div className={classes.paper} style={this.getModalStyle()}>
                    <Slider {...previewSettings}>
                        {
                            this.displayPreview(this.store.presentation)
                        }
                    </Slider>
                </div>
            </Modal>
        </Fullscreen>

    }
}


HomePage.propTypes = {
    d2: PropTypes.object.isRequired
};


export default withStyles(styles)(inject("store")(observer(HomePage)));
