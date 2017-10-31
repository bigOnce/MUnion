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
    var lastWord = str.substr(-1, 1);
    return (lastWord === word);
}

export function httpfactory(str) {
    if (!this.startWith(str, 'http') && !this.startWith(str, 'https')) {
        return 'http://' + str;
    }
    return str;
}

export function urlComplete(url, domain) {

    if (this.startWith(url, 'http') || this.startWith(url, 'https')) {
        if (this.endWith(url, '/')) {
            return url.substr(0, url.length - 1);
        }
        return url;
    }
    var result = null;
    if (this.endWith(domain, '/')) {
        result = domain.substr(0, 1);
    } else {
        result = domain;
    }

    if (this.startWith(url, '//')) {
        result += url.substr(0, 1);
    } else if (this.startWith(url, '/')) {
        result += url;
    } else 
        result += '/' + url;
    
    if (this.endWith(result, '/')) {
        return result.substr(0, result.length - 1);
    }

    return result;
}

export default {
    isEmpty,
    startWith,
    httpfactory,
    urlComplete,
    endWith
}