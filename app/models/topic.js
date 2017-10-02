/**
 * Define for a "Topic"
 */
export default class TopicNode {

    constructor(code) {
        this._code = code;
    }

    set title(title) {
        this._title = title;
    }

    get title() {
        return this._title;
    }

    set type(t) {
        this._type = t;
    }

    get type() {
        return this._type;
    }

}
