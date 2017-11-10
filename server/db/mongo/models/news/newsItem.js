import mongoose from 'mongoose';
import Constant from '../../../../../constant';

const Schema = mongoose.Schema;

const newsItemSchema = new Schema({
    source: String,
    title: {
        type: String,
        default: ' '
    },
    type: {
        type: Number,
        default: Constant.ANCHOR_CODE,
        required: true
    },
    domain: String,
    path: {
        type: String
    },
    code: {
        type: String,
        default: '0x00'
    },
    thumb: {
        type: Object
    },
    content: {
        type: String
    },
    comment: {
        type: String
    },
    domain: {
        type: String,
        required: true
    }
}, {versionKey: false});

newsItemSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    delete obj.source;
    delete obj.domain;
    return obj;
}; // remove _id, appId in result

export default mongoose.model('NewsItem', newsItemSchema);