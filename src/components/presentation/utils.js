import Image from "spectacle/es/components/image";
import Slide from "spectacle/es/components/slide";
import React from "react";

import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card/Card";
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import {Scrollbars} from 'react-custom-scrollbars';

import Visualization from '../Visualization';
import DHIS2Visualization from "../DHIS2Visualization";

export const displayContent = (presentation, item) => {
  if (item.endpoint === "reportTables" && presentation.htmlTables) {
    return <div dangerouslySetInnerHTML={{__html: presentation.htmlTables[item.id]}}/>
  } else {
    return <div>
      <Image src={item.url} width="100%" height="100%" alt="Preview content"/>
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


const realItem = {
  "lastUpdated": "2019-10-06T12:33:19.433",
  "id": "RBHEfVjOlmo",
  "created": "2019-10-06T12:33:19.433",
  "name": "ANC 1 coverage this month",
  "publicAccess": "rw------",
  "type": "SINGLE_VALUE",
  "subscribed": false,
  "cumulativeValues": false,
  "sortOrder": 0,
  "favorite": false,
  "topLimit": 0,
  "percentStackedValues": false,
  "noSpaceBetweenColumns": false,
  "hideTitle": false,
  "showData": true,
  "parentGraphMap": {
    "ImspTQPwCqd": ""
  },
  "regressionType": "NONE",
  "completedOnly": false,
  "hideEmptyRowItems": "NONE",
  "aggregationType": "DEFAULT",
  "hideSubtitle": false,
  "hideLegend": false,
  "externalAccess": false,
  "access": {
    "read": true,
    "update": true,
    "externalize": true,
    "delete": true,
    "write": true,
    "manage": true
  },
  "user": {
    "id": "GOLswS44mh8"
  },
  "yearlySeries": [

  ],
  "interpretations": [

  ],
  "userGroupAccesses": [

  ],
  "subscribers": [

  ],
  "columns": [
    {
      "dimension": "dx",
      "items": [
        {
          "id": "Uvn6LCg7dVU",
          "name": "ANC 1 Coverage",
          "dimensionItemType": "INDICATOR"
        }
      ]
    }
  ],
  "seriesItems": [

  ],
  "periods": [

  ],
  "userAccesses": [

  ],
  "favorites": [

  ],
  "filters": [
    {
      "dimension": "ou",
      "items": [
        {
          "id": "ImspTQPwCqd",
          "name": "Sierra Leone",
          "dimensionItemType": "ORGANISATION_UNIT"
        }
      ]
    },
    {
      "dimension": "pe",
      "items": [
        {
          "id": "THIS_MONTH",
          "name": "THIS_MONTH",
          "dimensionItemType": "PERIOD"
        }
      ]
    }
  ],
  "rows": [

  ]
}

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

export const display = (presentation, d2) => {
  const slideTheme = {
    controlColor: '#477fcc'
  };

  return presentation.presentation.map((item, key) => {
    return <Slide key={item.id + key} fit={true} controlColor={slideTheme.controlColor} style={{background: 'yellow'}}>
      {item.dashboardItemType === 'CHART' ? <DHIS2Visualization d2={d2} item={realItem}/> : <Visualization item={item} d2={d2}/>}
    </Slide>
  });
};

export const displayPreview = (presentation, d2) => {
  return presentation.presentation.map((item, key) => {
    return <Grid container spacing={8} key={item.id + key}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            {/*<Visualization item={item} d2={d2} height={'70vh'}/>*/}
            {item.type === 'SINGLE_VALUE' ? <DHIS2Visualization d2={d2} item={realItem}/> : <Visualization item={item} d2={d2}/>}
          </CardContent>
        </Card>
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
                <Delete/>
              </IconButton>
            }
            subheader={item.name}
          />
          <CardContent>
            {item.type === 'SINGLE_VALUE' ? <DHIS2Visualization d2={d2} item={realItem}/> : <Visualization item={item} d2={d2} height={'30vh'} width={'30vw'}/>}
          </CardContent>
        </Card>
      </Grid>
    })
  }
  </Grid>
};
