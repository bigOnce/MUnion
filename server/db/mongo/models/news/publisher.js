import mongoose from 'mongoose';
import Constant from '../../../../../constant';
import Thumb from '../thumb';

const Schema = mongoose.Schema;

const publisherSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ' '
    },
    type: {
        type: Number,
        default: Constant.PUBLISHER_CODE,
        required: true
    },
    thumbs: [],
    keywords: {
        type: String
    },
    domain: String
}, {versionKey: false});

// methods export to json
publisherSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    return obj;
};

export default mongoose.model('Publisher', publisherSchema);
