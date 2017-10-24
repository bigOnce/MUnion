export function isEmpty(str) {
    if (str === undefined || str === null) {
        return true;
    }

    if (str.trim() == '' || str.trim().length == 0) {
        return true;
    }

    return false;
}

export function startWith(str, word) {
    return str.indexOf(word) === 0;
}

export function endWith(str, word) {
    return str.indexOf(word) === (str.length - word.length);
}

export function httpfactory(str) {
    if (!this.startWith(str, 'http') && !this.startWith(str, 'https')) {
        return 'http://' + str;
    }
    return str;
}

export function urlComplete(url, domain) {

    if (this.startWith(url, 'http') || this.startWith(url, 'https')) {
        return url;
    }
    var result = '';
    if (this.endWith(domain, '/')) {
        result = domain.substr(0, 1);
    } else 
        result = domain;
    
    if (this.startWith(url, '/')) {
        result += url;
    } else 
        result += '/' + url;
    
    return result;
}

export default {
    isEmpty,
    startWith,
    httpfactory,
    urlComplete
}