import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const Footer = ({}) => {
    return (
      <footer className="main-footer">
        <a className="back-top" href="#">
          <i className="pe-7s-angle-up-circle" />
        </a>
        <p>2013 © Levo by Pixeden.</p>
      </footer>
    );
};

Footer.propTypes = {
};

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Footer);
