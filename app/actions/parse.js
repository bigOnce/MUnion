import * as types from '../types';
import {parseService, newsService} from '../services';
import {normalize, schema} from 'normalizr';
import Constants from '../../constant';

export function setParser(parseObject) {
    return {type: types.SET_PARSE_OBJECT, parser: parseObject};
}

export function parseError(message) {
    return {type: types.PARSE_URL_ERROR, message};
}

export function parseSuccess(message) {
    return {type: types.PARSE_URL_SUCCESS, message};
}

export function setParseDataForm(parseDataForm) {
    return {type: types.SET_PARSE_DATA_FORM, parseDataForm};
}

export function parseURL(url) {
    return (dispatch) => {
        if (url.trim().length <= 0) {
            return;
        }

        return parseService()
            .parseUrl({url})
            .then((res) => {
                if (res.status === 200) {
                    dispatch(parseSuccess('Parse success'));
                    dispatch(setParser(res.data));
                }
            })
            .catch(() => {
                dispatch(parseError('Parse error'));
            });
    };
}

export function setFilter(filter, type, domain, name, url) {
    return (dispatch) => {
        if (type && filter && domain) {

            return newsService()
                .setFilter({filter, type, domain, name, url})
                .then((res) => {
                    switch (res.status) {
                        case Constants.RESPONSE_SUCCESS:
                            {alert('summit thanh cong');}
                            break;
                        default:
                            {}
                            break;
                    }
                });
        }
        return;
    }

}

export function parseAddDataForm(obj) {
    return (dispatch) => {
        dispatch(setParseDataForm(obj));
    };
}

export default {
    parseURL,
    parseAddDataForm,
    setFilter
};
