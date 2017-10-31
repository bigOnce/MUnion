import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import parse from '../actions/parse';
import ReactDOM from 'react-dom';
import JSONTree from 'react-json-tree';
import Form from 'react-jsonschema-form';
import Constants from '../../constant';

class Parse extends Component {

    constructor(props) {
        super(props);

        this._handleClickParse = this
            ._handleClickParse
            .bind(this);

        this._jschemaOnUpdate = this
            ._jschemaOnUpdate
            .bind(this);

    }

    _handleClickParse() {

        // get url from ref
        const url = ReactDOM
            .findDOMNode(this.refs.url)
            .value;

        if (url.trim().length) {
            this
                .props
                .parseUrl(url);
        }
    }

    _jsonNodeExpand(keyName, data, level) {
        // console.log(keyName + data + level);

        return false;
    }

    _jschemaOnUpdate({formData}) {
        if (formData) {
            this
                .props
                .parseAddDataForm(formData);
        }
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
            title: 'NEWS Tools Develop',
            properties: {
                name: {
                    type: 'string',
                    title: 'Name'
                },
                domain: {
                    type: 'string',
                    title: 'Domain'
                },
                type: {
                    type: "number",
                    title: 'Type',
                    enum: [
                        Constants.PUBLISHER_CODE, Constants.CATEGORY_CODE, Constants.ANCHOR_CODE, Constants.CONTAINERS_CODE
                    ],
                    enumNames: [
                        "Publisher", "Category", "Contents", "Containers"
                    ],
                    default: Constants.CATEGORY_CODE
                },
                filterurl: {
                    type: 'string',
                    title: 'Filter url'
                },
                filter: {
                    title: 'Filter object',
                    type: 'string'
                }
            }
        };

        const uiSchema = {
            classNames: "jschema-layout",
            filter: {
                "ui:widget": "textarea"
            }

        };
        const onError = (errors) => alert("I have", errors.length, "errors to fix");
        const onSubmit = ({formData}) => {
            const type = formData.type;
            const filter = JSON.parse(formData.filter, (key, value) => {
                if (typeof value === 'string' && value.indexOf('x.text()') > -1) {
                    return (x => x.text());
                }
                return value;
            });
            const domain = formData.domain;
            const name = formData.name;
            const url = formData.filterurl;

            this
                .props
                .setFilter(filter, type, domain, name, url);

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
                                    getItemString={(type, data, itemType, itemString) => (<span></span>)} //{itemType} {itemString} <em className="json-three-italic">{type}</em>
                                    labelRenderer={([raw]) => <span>{raw}</span>}
                                    valueRenderer={raw => <span>{raw}</span>}
                                    shouldExpandNode={this._jsonNodeExpand}
                                    />
                    </pre>
                  </div>

                  <div className="ct-parse-creator">
                    <Form
                        className="ct-parse-json-form"
                        schema={schema}
                        uiSchema={uiSchema}
                        formData={this.props.parseData}
                        onError={onError}
                        onSubmit={onSubmit}
                        onChange={this._jschemaOnUpdate}
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
    parser: PropTypes.object,
    parseData: PropTypes.object.isRequired,
    parseAddDataForm: PropTypes.func.isRequired,
    setFilter: PropTypes.func
};

function mapStateToProps(state) {
    return {
        parser: state.parse.parser,
        parseData: state.parse.parseDataForm || {}
    };
}

export default connect(mapStateToProps, {
    parseUrl: parse.parseURL,
    parseAddDataForm: parse.parseAddDataForm,
    setFilter: parse.setFilter
})(Parse);
