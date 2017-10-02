import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class NewsAPIPage extends Component {
  render() {
    return (
      <div className="col-md-12">
        <article className="widget">
          <header className="widget__header">
            <h3 className="widget__title">NEWS API</h3>
            <div className="widget__config">
              <a href="#">
                <i className="pe-7f-refresh"/>
              </a>
            </div>
          </header>

          <div className="widget__content">
            <li>
              <Link className="attach_links" to="parse">News API Parse Page</Link>
            </li>
            <br/>
            <li>
              <Link className="attach_links" to="/">Get list object Type</Link>
            </li>
          </div>

        </article>
      </div>
    );
  }
}

NewsAPIPage.propTypes = {};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(NewsAPIPage);
