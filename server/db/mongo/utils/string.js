export function isEmpty(str) {
    if (str === undefined || str === null)
        return true;

    if (str.trim() == "" || str.trim().length == 0) {
           return true;
    }
    
    return false;
}

export function startsWith(str, word) {
    return str.indexOf(word) === 0;
}


export function httpfactory(str) {
    if (!this.startsWith(str, "http") && !this.startsWith(str, "https")) {
        return "http://" + str;
    }
    return str;
}