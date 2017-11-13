import stringUtil from './string';
var crypto = require('crypto');
var RandExp = require('randexp');

export function getHost(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
    } else {
        return null;
    }
}

export function getHostName(url) {
    var hostName = getHost(url);
    var domain = hostName;

    if (hostName != null) {
        var parts = hostName
            .split('.')
            .reverse();

        if (parts != null && parts.length > 1) {
            domain = parts[1] + '.' + parts[0];

            if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
                domain = parts[2] + '.' + domain;
            }
        }
    }

    return domain;
}

export function isExternal(url) {
    var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
    if (match != null && typeof match[1] === 'string' && match[1].length > 0 && match[1].toLowerCase() !== location.protocol)
        return true;
    if (match != null && typeof match[2] === 'string' && match[2].length > 0 && match[2].replace(new RegExp(
        ':(' + {
            'http:': 80,
            'https:': 443
        }[location.protocol] + ')?$'), '') !== location.host) {
        return true;
    } else {
        return false;
    }
}

export function formatDomain(domain) {
    if (domain !== undefined) {
        if (stringUtil.endWith(domain, '/')) {
            return domain.substr(0, 1);
        }
    }
    return domain;
}

export function urlComplete(url, domain) {

    if (stringUtil.startWith(url, 'http') || stringUtil.startWith(url, 'https')) {
        if (stringUtil.endWith(url, '/')) {
            return url.substr(0, url.length - 1);
        }
        return url;
    }
    var result = null;
    if (stringUtil.endWith(domain, '/')) {
        result = domain.substr(0, 1);
    } else {
        result = domain;
    }

    if (stringUtil.startWith(url, '//')) {
        result += url.substr(0, 1);
    } else if (stringUtil.startWith(url, '/')) {
        result += url;
    } else
        result += '/' + url;

    if (stringUtil.endWith(result, '/')) {
        return result.substr(0, result.length - 1);
    }

    return result;
}

export function generalCodeForUrl(url) {

    var randexp = new RandExp(/(Code|code)[a-f0-9]{28}/);
    randexp.max = 5;

    if (url !== undefined && url.length) {
        return crypto
            .createHash('md5')
            .update(url)
            .digest("hex");
    }
    return randexp.gen();
}


export function httpfactory(str) {
    if (!stringUtil.startWith(str, 'http') && !stringUtil.startWith(str, 'https')) {
        return 'http://' + str;
    }
    return str;
}

export default {
    getHost,
    getHostName,
    formatDomain,
    urlComplete,
    generalCodeForUrl,
    httpfactory
};