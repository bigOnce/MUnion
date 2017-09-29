import React, { Component } from 'react';
import Page from '../pages/Page';
import ManagerContainer from '../containers/Manager';

class Manager extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Manager | Cre@nt';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Manager page!' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <ManagerContainer {...this.props} />
      </Page>
    );
  }
}

export default Manager;

