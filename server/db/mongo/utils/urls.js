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

export default {
    getHost,
    getHostName
};