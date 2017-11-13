
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



export default {
    isEmpty,
    startWith,
    endWith,
}