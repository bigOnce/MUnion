const { URL } = require('url');

export function getHost(url) {
    if (url.trim().length) {
        const myURL = new URL(url);
        return myURL.host;
    }
    return null;
}

export function getHostName(url) {
    if (url.trim().length) {
        const myURL = new URL(url);
        return myURL.hostname;
    }
    return null;
}

export default {
    getHost,
    getHostName,
};