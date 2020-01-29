import Image from "spectacle/es/components/image";
import Slide from "spectacle/es/components/slide";
import Heading from "spectacle/es/components/heading";
import React from "react";

import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card/Card";
// import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import ChartPlugin from '@dhis2/data-visualizer-plugin';
import { Scrollbars } from 'react-custom-scrollbars';

import Visualization from '../Visualization'
// import Button from "@material-ui/core/Button/Button";

export const displayContent = (presentation, item) => {
    if (item.endpoint === "reportTables" && presentation.htmlTables) {
        return <div dangerouslySetInnerHTML={{ __html: presentation.htmlTables[item.id] }} />
    } else {
        return <div>
            <Image src={item.url} width="100%" height="100%" alt="Preview content" />
        </div>
    }
};

export const displayPreviewContent = (presentation, item) => {
    if (item.endpoint === "reportTables") {
        if (presentation.htmlTables) {
            return <Scrollbars style={{ height: 370 }}>
                <div dangerouslySetInnerHTML={{ __html: presentation.htmlTables[item.id] }} />
            </Scrollbars>
        }
    } else {
        return <div style={{ height: 370 }}>
            <img src={item.url} width="100%" height="100%" alt="Preview content" />
        </div>
    }
};

export const displaySlidePreviewContent = (presentation, item) => {
    if (item.endpoint === "reportTables") {
        if (presentation.htmlTables) {
            return <Scrollbars style={{ height: 200 }}>
                <div dangerouslySetInnerHTML={{ __html: presentation.htmlTables[item.id] }} />
            </Scrollbars>
        }
    } else {
        // console.log(item);
        return <div style={{ height: 200 }}>
            <img src={item.url} width="100%" height="100%" alt="Preview content" />
        </div>
    }
};

export const display = (presentation, d2) => {
    const slideTheme = {
        // width: '100%',
        // margin: 10,
        // marginTop: 100,
        // marginBottom: 20,
        // border: '1px solid #ff1e43',
        controlColor: '#477fcc'
    };

    return presentation.presentation.map((item, key) => {
        return <Slide key={item.id + key} fit={true} controlColor={slideTheme.controlColor}>
            <Visualization item={item} d2={d2} />
        </Slide>
    });
};

export const displayPreview = (presentation, d2) => {
    return presentation.presentation.map((item, key) => {
        return <Grid container spacing={8} key={item.id + key}>
            <Grid item xs={12}>
                {/*<Paper>*/}
                <Card>
                    <CardContent>
                        <Visualization item={item} d2={d2} height={'70vh'} />
                    </CardContent>
                </Card>
                {/*</Paper>*/}
            </Grid>
        </Grid>
    });
};


export const slidePreview = (presentation, d2) => {
    return <Grid container spacing={8}>{
        presentation.presentation.map((item, key) => {
            return <Grid item xs={3} key={item.id ? item.id + key : key}>
                <Card className="slide-preview">
                    <CardHeader
                        action={
                            <IconButton onClick={() => {
                                presentation.deletePresentationItem(item)
                            }}>
                                <Delete />
                            </IconButton>
                        }
                        subheader={item.name}
                    />
                    <CardContent>
                        <pre>{JSON.stringify(item, null, 2)}</pre>
                        {item.dashboardItemType === 'CHART' ? <ChartPlugin
                            d2={d2}
                            config={{ i: item.id }}
                            forDashboard={true}
                        /> : <Visualization item={item} d2={d2} height={'30vh'} width={'30vw'} />}

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
