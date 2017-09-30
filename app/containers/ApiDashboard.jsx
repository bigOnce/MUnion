import React from 'react';
import {Link} from 'react-router';
import NewsAPIPage from './NewsAPIPage';

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const ApiDashboard = () => {
  return (
    <section className="content">

      <header className="main-header clearfix">
        <h1 className="main-header__title">
          <i className="icon pe-7s-edit" />
          API
          <small>
            Console</small>
        </h1>
        <ul className="main-header__breadcrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="active">
            <Link to="api">API Console</Link>
          </li>
        </ul>
        <div className="main-header__date">
          <i className="icon pe-7s-date" />
          <span>December 30, 2013</span>
          <i className="pe-7s-angle-down-circle" />
        </div>
      </header>

      <NewsAPIPage />
    </section>
  );
};

export default ApiDashboard;
