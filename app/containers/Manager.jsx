import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';



class Manager extends Component {
    render() {
        return (
            <div></div>
        );
    }
}

Manager.propTypes = {};

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Manager);
