import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { fetchVoteData } from './fetch-data';
import { App, Vote, Dashboard, About, LoginOrRegister, Api, Manager, ParsePage } from './pages';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
    <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Manager} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
      <Route path="api" component={Api} />
      <Route path="about" component={About} />
      <Route path="parse" component={ParsePage} />
    </Route>
    </Router>
  );
};
