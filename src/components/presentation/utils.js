import Image from "spectacle/es/components/image";
import Slide from "spectacle/es/components/slide";
import Heading from "spectacle/es/components/heading";
import React from "react";

import Grid from '@material-ui/core/Grid';


export const displayContent = (presentation, item) => {

    if (item.endpoint === "reportTables" && presentation.htmlTables) {
        return <div dangerouslySetInnerHTML={{__html: presentation.htmlTables[item.id]}}/>
    } else {
        return <div>
            <Image src={item.url} width="100%"/>
        </div>
    }
};

export const displayPreviewContent = (presentation, item) => {

    if (item.endpoint === "reportTables" && presentation.htmlTables) {
        return <div dangerouslySetInnerHTML={{__html: presentation.htmlTables[item.id]}}/>
    } else {
        return <div>
            <img src={item.url} width="500px"/>
        </div>
    }
};

export const display = (presentation) => {
    const slideTheme = {
        width: '100%',
        margin: 0,
        marginBottom: 20,
        border: '1px solid #ff1e43',
    };

    return presentation.map(item => {
        return <Slide key={item.id} fit={true} style={slideTheme}>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    {displayHeader(item)}
                    {displayContent(presentation, item)}
                </Grid>
            </Grid>
        </Slide>
    });
};

export const displayPreview = (presentation) => {
    return presentation.map(item => {
        return <div key={item.id}>
            {item.name}
            {displayPreviewContent(presentation, item)}
        </div>
    });
};


export const displayHeader = (item) => {
    if (item.endpoint === "reportTables") {
        return null;
    }
    return <Heading size={1} fit caps lineHeight={1} textColor="secondary">{item.name}</Heading>
};
