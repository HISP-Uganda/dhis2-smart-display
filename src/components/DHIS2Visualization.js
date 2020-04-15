import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import {isEmpty} from 'lodash'


import ChartPlugin from '@dhis2/data-visualizer-plugin';

const styles = theme => ({
  map: {
    // margin: 'auto',
    height: '75vh',
    padding: '0 4px 4px',
    overflow: 'auto',
    // border: '1px solid black'
  },
  container: {
    overflow: 'auto'
  }
});


class DHIS2Visualization extends Component {
  vItem = {};

  render() {
    const {d2} = this.props;
    return <div>
      <ChartPlugin d2={d2} visualization={this.vItem}/>
    </div>
  }

  async componentDidMount() {
    const {item, d2, store} = this.props;
    console.log(item)
    this.vItem = await store.fetchItem(d2, item);
  }

}

DHIS2Visualization.propTypes = {
  d2: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  height: PropTypes.string,
  width: PropTypes.string
};


export default withStyles(styles)(inject("store")(observer(DHIS2Visualization)));
