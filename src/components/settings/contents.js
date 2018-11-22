import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {Store} from '@dhis2/d2-ui-core';
import i18n from "d2-i18n";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Stepper from "@material-ui/core/Stepper/Stepper";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import Dashboards from "./dashboards";
import DashboardItems from "./dashboardItems";
import {inject, observer} from "mobx-react";
import SlideOptions from "./slideoptions";
import SlidePreview from "./slidepreview";

import Home from '@material-ui/icons/Home';

const itemStore = Store.create();
const assignedItemStore = Store.create();

//Sets Mapping for Dashboard Item Types
export const REPORT_TABLE = 'REPORT_TABLE';
export const CHART = 'CHART';
export const MAP = 'MAP';
export const EVENT_REPORT = 'EVENT_REPORT';
export const EVENT_CHART = 'EVENT_CHART';

export const itemTypeMap = {
    [REPORT_TABLE]: {
        type: REPORT_TABLE,
        endPointName: 'reportTables',
        propName: 'reportTable',
        appUrl: id => `dhis-web-pivot/?id=${id}`,
        icon: 'ViewList',
    },
    [CHART]: {
        type: CHART,
        endPointName: 'charts',
        propName: 'chart',
        appUrl: id => `dhis-web-visualizer/?id=${id}`,
        appName: i18n.t('Visualizer'),
        icon: 'InsertChart',
    },
    [MAP]: {
        type: MAP,
        endPointName: 'maps',
        propName: 'map',
        appUrl: id => `dhis-web-maps/?id=${id}`,
        appName: i18n.t('Maps'),
        icon: 'Public',
    },
    [EVENT_REPORT]: {
        type: EVENT_REPORT,
        endPointName: 'eventReports',
        propName: 'eventReport',
        appUrl: id => `dhis-web-event-reports/?id=${id}`,
        appName: i18n.t('Event Reports'),
        icon: 'ViewList',
    },
    [EVENT_CHART]: {
        id: EVENT_CHART,
        endPointName: 'eventCharts',
        propName: 'eventChart',
        appUrl: id => `dhis-web-event-visualizer/?id=${id}`,
        appName: i18n.t('Event Visualizer'),
        icon: 'InsertChart',
    },
};

//Stepper Contents
function getSteps() {
    return ['Select Dashboards', 'Select Dashboard Items', 'Other Slides Options', 'Preview Slide Show'];
}

class ContentSettings extends Component {
    store = null;
    d2 = null;

    constructor(props) {
        super(props);
        itemStore.state = [];
        assignedItemStore.state = [];
        const {store, d2} = props;
        d2.i18n.translations['assign_all'] = "Assign All";

        this.store = store;
        this.d2 = d2;
        this.dashItems = this.dashItems.bind(this);


    }

    dashItems(e) {
        e.preventDefault();
        this.setState({
            dashboardItems: this.state.dashItems
        })
    }

    /*getChildContext() {
        return {d2: this.state.d2};
    }*/

    //Stepper
    state = {
        activeStep: 0,
        skipped: new Set(),
    };

    isStepOptional = step => {
        return step === false;
    };

    handleNext = () => {
        const {activeStep} = this.state;
        let {skipped} = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });

        if (activeStep === getSteps().length - 1) {
            this.store.savePresentation(this.d2);
        }
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    getStepContent(step) {
        const {d2, baseUrl} = this.props;
        switch (step) {
            case 0:
                return <Dashboards d2={d2}/>;
            case 1:
                return <DashboardItems d2={d2}/>;
            case 2:
                return <SlideOptions d2={d2}/>;
            case 3:
                return <SlidePreview d2={d2} baseUrl={baseUrl}/>;
            default:
                return;
        }
    }

    handleSkip = () => {
        const {activeStep} = this.state;
        if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        this.setState(state => {
            const skipped = new Set(state.skipped.values());
            skipped.add(activeStep);
            return {
                activeStep: state.activeStep + 1,
                skipped,
            };
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    render() {
        // const {store} = this.props;
        const steps = getSteps();
        const {activeStep} = this.state;

        const style = {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
        };

        return <div>

            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    const props = {};
                    const labelProps = {};
                    if (this.isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (this.isStepSkipped(index)) {
                        props.completed = false;
                    }
                    return (
                        <Step key={label} {...props}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {this.state.activeStep === steps.length ? (
                    <div>
                        <Typography className="instruction">All steps completed</Typography>
                        <Button onClick={this.handleReset}>Reset</Button>
                    </div>
                ) : (
                    <div>
                        {this.getStepContent(activeStep)}
                        {/*{store.name}*/}
                        <div className="step-action">
                            <Button
                                disabled={activeStep === 0}
                                onClick={this.handleBack}
                                className="backButton"
                            >
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={this.handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <Button variant="fab" style={style}
                    color="primary" href="/">
                <Home/>
            </Button>
        </div>
    }
}

ContentSettings.propTypes = {
    d2: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired
};

export default inject("store")(observer(ContentSettings));