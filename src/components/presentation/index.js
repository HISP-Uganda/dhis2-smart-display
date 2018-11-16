import React, {Component} from "react";
import Presentation from './presentation';
import PropTypes from "prop-types";

class SmartDisplay extends Component {
    render() {
        const {d2, baseUrl} = this.props;
        return <Presentation d2={d2} baseUrl={baseUrl}/>
    }
}

SmartDisplay.propTypes = {
    d2: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired
};

// export default inject("store")(observer(SmartDisplay));

export default SmartDisplay;