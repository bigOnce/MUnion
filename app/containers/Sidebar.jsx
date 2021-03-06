import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const Sidebar = ({}) => {
    return (
      <aside className="sidebar">
        <ul className="main-nav">
          <li >
            <Link className="main-nav__link" to="api">
              <span className="main-nav__icon">
                <i className="icon pe-7s-home" />
              </span>
                        Dashboard
                        <span className="badge main-nav__badge badge--red">10</span>
            </Link>
          </li>
          <li>
            <Link className="main-nav__link" to="api">
              <span className="main-nav__icon">
                <i className="icon pe-7s-edit" />
              </span>
                        API Console
                    </Link>
          </li>
          <li className="main-nav--collapsible">
            <Link className="main-nav__link">
              <span className="main-nav__icon">
                <i className="icon pe-7s-photo-gallery" />
              </span>
                        Sample pages
                    </Link>
            <ul className="main-nav__submenu">
              <li>
                <a href={'404.html'}>
                  <i className="pe-7s-help1" />
                  <span>Error 404</span>
                </a>
              </li>
              <li>
                <a href="login.html">
                  <i className="pe-7s-note" />
                  <span>Login</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a className="main-nav__link">
              <span className="main-nav__icon">
                <i className="icon pe-7s-crop" />
              </span>
                        Grid Layout
                    </a>
          </li>
          <li>
            <a className="main-nav__link">
              <span className="main-nav__icon">
                <i className="icon pe-7s-menu" />
              </span>
                        Tables &amp; forms
                    </a>
          </li>
          <li>
            <a className="main-nav__link">
              <span className="main-nav__icon">
                <i className="icon pe-7s-graph" />
              </span>
                        Statistics
                        <span className="badge main-nav__badge">16</span>
            </a>
          </li>
        </ul>
      </aside>
    );
};

Sidebar.propTypes = {};

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Sidebar);
