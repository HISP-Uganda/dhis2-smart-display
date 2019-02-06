import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import Card from "@material-ui/core/Card/Card";
import {InputField} from '@dhis2/d2-ui-core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Checkbox from '@material-ui/core/Checkbox';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


class SlideOptions extends Component {

    store = null;

    constructor(props) {
        super(props);
        const {store} = props;
        this.store = store;
    }

    render() {
        const {presentation} = this.store;
        return <div className="smart-div">
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Paper>
                        <Card>
                            <CardHeader title="Presentation Transition Settings" className="card-header"/>
                            <CardContent>
                                <InputField
                                    placeholder="Name"
                                    type="text"
                                    fullWidth
                                    value={presentation.name}
                                    onChange={presentation.setName}
                                />
                                <InputField
                                    placeholder="Enter presentation description"
                                    type="text"
                                    multiline
                                    fullWidth
                                    rows={2}
                                    rowsMax={4}
                                    value={presentation.description}
                                    onChange={presentation.setDescription}
                                />
                                <FormControl>
                                    <FormLabel component="legend">Transition Mode</FormLabel>
                                    <FormGroup row>
                                        {presentation.transitionModes.map(transitionMode => {
                                            return <FormControlLabel
                                                key={transitionMode.name}
                                                control={
                                                    <Checkbox
                                                        checked={transitionMode.checked}
                                                        onChange={transitionMode.setChecked}
                                                    />
                                                }
                                                label={transitionMode.name}
                                            />
                                        })}
                                    </FormGroup>
                                </FormControl>
                                <FormGroup>
                                    <FormLabel component="legend">Transition Duration</FormLabel>
                                    <InputField
                                        placeholder="Transition duration (Miliseconds)"
                                        type="number"
                                        fullWidth
                                        value={presentation.transitionDuration}
                                        onChange={presentation.setTransitionDuration}
                                        name="transitionDuration"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel component="legend">Content Change (Slide) Duration
                                        (Miliseconds)</FormLabel>
                                    <InputField
                                        placeholder="Slide Content change duration"
                                        type="number"
                                        fullWidth
                                        value={presentation.slideDuration}
                                        onChange={presentation.setSlideDuration}
                                        name="slideDuration"
                                    />
                                </FormGroup>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    }
}

SlideOptions.propTypes = {
    d2: PropTypes.object.isRequired
};


export default inject("store")(observer(SlideOptions));
