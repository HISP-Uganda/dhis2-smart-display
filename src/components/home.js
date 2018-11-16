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
        const {store, d2, baseUrl} = props;

        console.log(baseUrl);
        this.store = store;
        store.checkDataStore(d2);
        d2.i18n.translations['name'] = "Presentation Name";
    }

    present = args => {
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

        let display = '';

        if (this.store.status === 1) {
            display = <div>
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
                />
                <Button variant="fab" className="add-button" onClick={this.store.setStatus2(2)}
                        color="primary">
                    <AddIcon/>
                </Button>
            </div>
        } else if (this.store.status === 2) {
            display = <ContentSettings d2={d2} baseUrl={baseUrl}/>
        } else if (this.store.status === 3) {
            display = <SmartDisplay d2={d2} baseUrl={baseUrl}/>
        }

        return display;

    }
}


HomePage.propTypes = {
    d2: PropTypes.object.isRequired
};

export default inject("store")(observer(HomePage));
