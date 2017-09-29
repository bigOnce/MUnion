import * as types from '../types';
import { combineReducers } from 'redux';


const parser = (state = {}, action) => {
    switch (action.type) {
        case types.SET_PARSE_OBJECT:
            return {
                parser: action.parser,
            };
        default:
            return state;
    }
};

const message = (state = '', action) => {
    switch (action.type) {
        case types.PARSE_URL_SUCCESS:
        case types.PARSE_URL_ERROR:
            return action.message;
        default:
            return state;
    }
};

const parseReducer = combineReducers({parser, message});

export default parseReducer;
