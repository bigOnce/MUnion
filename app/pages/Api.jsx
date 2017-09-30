import React, { Component } from 'react';
import Page from '../pages/Page';
import ApiDashboard from '../containers/ApiDashboard';

class Api extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Api for developers | @reant';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'The API Development' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <ApiDashboard {...this.props} />
      </Page>
    );
  }
}

export default Api;
