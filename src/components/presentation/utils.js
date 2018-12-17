import React from "react";
import {Heading, Slide, Image} from "spectacle"
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card/Card";
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import {Scrollbars} from 'react-custom-scrollbars';
import CardHeader from '@material-ui/core/CardHeader';
import {
    ITEM_MIN_HEIGHT,
} from "../dashboardapp/ItemGrid/gridUtil";
import DeleteItemButton from "../dashboardapp/ItemGrid/DeleteItemButton";
import {Item} from "../dashboardapp/Item/Item";

const EXPANDED_HEIGHT = 20;

export const displayContent = (presentation, item) => {
    if (item.endpoint === "reportTables" && presentation.htmlTables) {
        return <div dangerouslySetInnerHTML={{__html: presentation.htmlTables[item.id]}}/>
    } else {
        return <Image src={item.url} alt="Preview content" style={{flex: 1, margin: 0, width: '100%', height: '100%'}}/>
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
    const state = {
        expandedItems: {}
    };
    const slideTheme = {
        // width: '100%',
        border: '1px solid #ff1e43',
        controlColor: '#477fcc'
    };


    const items = presentation.presentation.map((item, index) => {
        item.h = (item.h)? item.h : 100;
        const expandedItem = state.expandedItems[item.id];
        let hProp = {h: item.h};

        if (expandedItem && expandedItem === true) {
            hProp.h = item.h + EXPANDED_HEIGHT;
        }
        return Object.assign({}, item, hProp, {
            i: item.id,
            minH: ITEM_MIN_HEIGHT,
        });
    });

    const edit = false;
    return (
        items.map((item, key) => {
            console.log(item.type);
            const itemClassNames = [
                item.type,
                edit ? 'edit' : 'view',
            ].join(' ');

            return (
                <div key={item.i + key} className={itemClassNames}>
                    {edit ? (
                        <DeleteItemButton
                            onClick={this.onRemoveItemWrapper(
                                item.id
                            )}
                        />
                    ) : null}
                    <Slide key={item.id} fill={true} align="center center"
                           controlColor={slideTheme.controlColor} style={slideTheme}>
                        <Item
                            item={item}
                            editMode={edit}
                        />
                    </Slide>
                </div>
            );
        })
    )
}


export const displayPreview = (presentation) => {
    console.log(presentation.presentation);
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
