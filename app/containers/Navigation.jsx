import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logOut} from '../actions/users';

const Navigation = ({user, logOut}) => {
  return (
    <header className="top-bar">
      <div className="main-logo">API
        <span> for developers</span>
      </div>

      <div className="main-search">
        <input
          type="text"
          placeholder="Search for task, goal &amp; review"
          id="msearch"/>
        <label for="msearch">
          <i className="pe-7s-search"></i>
        </label>
      </div>

      <ul className="profile">
        <li>
          <a href="#">
            <i className="pe-7f-config"></i>
          </a>
        </li>
      </ul>

    </header>
  );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {user: state.user};
}

export default connect(mapStateToProps, {logOut})(Navigation);
