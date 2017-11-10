import Constant from '../../../../constant';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const thumbSchema = new Schema({
    src: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: 'Thumb'
    },
    type: {
        type: Number,
        default: Constant.IMAGE_CODE,
        required: true
    },
    path: {
        type: String
    },
    w: {
        type: Number,
        default: 0
    },
    h: {
        type: Number,
        default: 0
    },
    desc: {
        type: String,
        default: 'Thumb for News node'
    }
}, {versionKey: false});

thumbSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    delete obj.title;
    return obj;
}; // remove _id, appId in result
thumbSchema.methods.calcWidthHeight = function calcWidthHeight(callback) {}

export default mongoose.model('Thumb', thumbSchema);