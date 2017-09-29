import * as types from '../types';
import {parseService} from '../services';

export function setParser(parseObject) {
    return {type: types.SET_PARSE_OBJECT, parser: parseObject};
}

export function parseError(message) {
    return {type: types.PARSE_URL_ERROR, message};
}

export function parseSuccess(message) {
    return {type: types.PARSE_URL_SUCCESS, message};
}

export function parseURL(url) {
    return (dispatch) => {
        if (url.trim().length <= 0) 
            return;
        
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

export default {
    parseURL
};
