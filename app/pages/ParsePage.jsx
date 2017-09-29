import React, { Component } from 'react';
import Page from '../pages/Page';
import ParseContainer from '../containers/Parse';

class ParsePage extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Parse Page | @creant';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Parser page' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <ParseContainer {...this.props} />
      </Page>
    );
  }
}

export default ParsePage;

