import React from 'react';
import PropTypes from 'prop-types';
import Message from '../containers/Message';
import Navigation from '../containers/Navigation';
import Sidebar from '../containers/Sidebar';
import Footer from '../containers/Footer';

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
const App = ({children}) => {
  return (
    <div>
      <Navigation/>
      <Message/>
      <div className="wrapper">
        <Sidebar/>
        {children}
        <Footer/>
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
