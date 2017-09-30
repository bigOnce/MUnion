import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import parse from '../actions/parse';
import ReactDOM from 'react-dom';
import JSONTree from 'react-json-tree';
import Form from 'react-jsonschema-form';
import {ArrayField} from '../components/JsonSchema';

class Parse extends Component {

    constructor(props) {
        super(props);
        this._handleClickParse = this
            ._handleClickParse
            .bind(this);
    }

    _handleClickParse() {
        const url = ReactDOM
            .findDOMNode(this.refs.url)
            .value;

        if (url.trim().length > 0) {
            this
                .props
                .parseUrl(url);
        }
    }

    _jsonNodeExpand(keyName, data, level) {
        // console.log(keyName + data + level);
        return false;
    }

    render() {
        const theme = {
            scheme: 'custom',
            author: 'custom',
            base00: '#ffffff', // BACKGROUND_COLOR
            base01: '#383830',
            base02: '#49483e',
            base03: '#dd2adf', // ITEM_STRING_EXPANDED_COLOR
            base04: '#a59f85',
            base05: '#f8f8f2',
            base06: '#f5f4f1',
            base07: '#f9f8f5', // TEXT_COLOR
            base08: '#c0c1c3', // NULL_COLOR,UNDEFINED_COLOR,FUNCTION_COLOR,SYMBOL_COLOR
            base09: '#ff0000', // NUMBER_COLOR, BOOLEAN_COLOR
            base0A: '#f4bf75',
            base0B: '#989898', // STRING_COLOR, DATE_COLOR, ITEM_STRING_COLOR
            base0C: '#a1efe4',
            base0D: '#2ebff6', // LABEL_COLOR, ARROW_COLOR
            base0E: '#ae81ff',
            base0F: '#cc6633'
        };

        const schema = {
            type: 'object',
            title: 'Topic',
            properties: {
                name: {
                    type: 'string',
                    title: 'Name'
                },
                description: {
                    type: 'string',
                    title: 'Description'
                },
                catelogries: {
                    title: 'Catelogry',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            title: {
                                "type": "string"
                            },
                            desc: {
                                "type": "string"
                            },
                            tag: {
                                "type": "string"
                            }
                        }
                    }

                }
            }
        };

        const uiSchema = {
            classNames: "jschema-layout"
        };

        const formData = {
            name: "First task",
            description: "ccccc"
        };

        return (
            <section className="content">

                <header className="main-header clearfix">
                    <h1 className="main-header__title">
                        <i className="icon pe-7s-edit"/>
                        API
                        <small>
                            Console</small>
                    </h1>
                    <ul className="main-header__breadcrumb">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="api">API Console</Link>
                        </li>
                        <li className="active">
                            <Link to="parse">Parse Page</Link>
                        </li>
                    </ul>
                    <div className="main-header__date">
                        <i className="icon pe-7s-date"/>
                        <span>December 30, 2013</span>
                        <i className="pe-7s-angle-down-circle"/>
                    </div>
                </header>

                <div className="col-md-12">
                    <article className="widget">

                        <header className="widget__header">
                            <h3 className="widget__title">Parser Page</h3>
                        </header>

                        <div className="widget__content">

                            <div className="row">
                                <div className="ct-parse-input">
                                    <input type="text" placeholder="Input a url here !!!" ref="url"/>
                                    <button type="button" className="btn btn-grey" onClick={this._handleClickParse}>Parse</button>
                                </div>
                            </div>

                            <div className="row ct-parse-pre">
                                <pre>
                            <JSONTree
                                    data={this.props.parser}
                                    theme={{
                                    extend: theme,
                                    valueLabel: {
                                        textDecoration: 'initial',
                                        fontWeight: 300,
                                        color: '#f41919',
                                    },
                                    nestedNodeLabel: ({ style }, nodeType, expanded) => ({
                                        style: { ...style, textTransform: expanded ? 'initial' : style.textTransform, fontWeight: 300}
                                        })
                                    }}
                                    invertTheme={false}
                                    getItemString={(type, data, itemType, itemString) => (<span>{itemType} {itemString} <em className="json-three-italic">{type}</em></span>)}
                                    labelRenderer={([raw]) => <span>{raw}:</span>}
                                    valueRenderer={raw => <span>{raw}</span>}
                                    shouldExpandNode={this._jsonNodeExpand}
                                    hideRoot />
                    </pre>
                  </div>

                  <div className="ct-parse-creator">
                    <Form
                        className="ct-parse-json-form"
                        schema={schema}
                        uiSchema={uiSchema}
                        formData={formData}
                        ArrayFieldTemplate={ArrayField}
                        />
                  </div>
                </div>

              </article>
            </div>

          </section>
        );
    }

}

Parse.propTypes = {
    parseUrl: PropTypes.func.isRequired,
    parser: PropTypes.object
};

function mapStateToProps(state) {
    return {parser: state.parse.parser};
}

export default connect(mapStateToProps, {parseUrl: parse.parseURL})(Parse);
