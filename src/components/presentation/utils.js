
import React from "react";
import {Heading, Slide, Image} from "spectacle"
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card/Card";
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

import {Scrollbars} from 'react-custom-scrollbars';
import { CircularProgress } from '@dhis2/d2-ui-core';

export const displayContent = (presentation, item) => {
    if (item.endpoint === "reportTables" && presentation.htmlTables) {
        return <div dangerouslySetInnerHTML={{__html: presentation.htmlTables[item.id]}}/>
    } else {
        return <div style={{flex: 1, flexDirection: "row", alignItems: "stretch"}}>
            <Image src={item.url} alt="Preview content" style={{flex: 1}}/>
        </div>
    }
};

export const displayPreviewContent = (presentation, item) => {
    if (item.endpoint === "reportTables") {
        if (presentation.htmlTables) {
            return <Scrollbars style={{height: 370}}>
                <div dangerouslySetInnerHTML={{__html: presentation.htmlTables[item.id]}}/>
            </Scrollbars>
        }
    } else {
        return <div style={{height: 370}}>
            <img src={item.url} width="100%" height="100%" alt="Preview content"/>
        </div>
    }
};

export const displaySlidePreviewContent = (presentation, item) => {
    if (item.endpoint === "reportTables") {
        if (presentation.htmlTables) {
            return <Scrollbars style={{height: 200}}>
                <div dangerouslySetInnerHTML={{__html: presentation.htmlTables[item.id]}}/>
            </Scrollbars>
        }
    } else {
        // console.log(item);
        return <div style={{height: 200}}>
            <img src={item.url} width="100%" height="100%" alt="Preview content"/>
        </div>
    }
};

export const display = (presentation) => {
    const slideTheme = {
        width: '100%',
        border: '1px solid #ff1e43',
        controlColor: '#477fcc',
        marginTop: 25
    };

    return presentation.presentation.map((item, key) => {
        return <Slide key={item.id + key} fill={true} align="center center" controlColor={slideTheme.controlColor} style={slideTheme}>
            <Grid container spacing={8}>
                <Grid item xs={12} style={{marginTop: 25}}>
                    {displayHeader(item)}
                    {displayContent(presentation, item)}
                </Grid>
            </Grid>

        </Slide>
    });
};

export const displayPreview = (presentation) => {
    return presentation.presentation.map((item, key) => {
        return <Grid container spacing={8} key={item.id + key}>
            <Grid item xs={12}>
                <Paper className="slide-preview">
                    <Card className="slide-preview">
                        <CardContent>
                            {displayPreviewContent(presentation, item)}
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </Grid>
    });
};


export const slidePreview = presentation => {
    return <Grid container spacing={8}>{
        presentation.presentation.map((item, key) => {
            return <Grid item xs={3} key={item.id + key}>
                <Card className="slide-preview">
                    <CardHeader
                        action={
                            <IconButton onClick={() => {
                                presentation.deletePresentationItem(item.selectedItem)
                            }}>
                                <Delete/>
                            </IconButton>
                        }
                        subheader={item.name}
                    />
                    <CardContent>
                        {displaySlidePreviewContent(presentation, item)}
                    </CardContent>
                </Card>
            </Grid>
        })
    }
    </Grid>
};

export const displayHeader = (item) => {
    if (item.endpoint === "reportTables") {
        return null;
    }
    return <Heading size={1} fit caps lineHeight={1} textColor="secondary">{item.name}</Heading>
};
