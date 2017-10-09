import mongoose from 'mongoose';
import constant from '../constant';

const Schema = mongoose.Schema;

const publisherSchema = new Schema({
    appId: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: 'Define name for publisher'
    },
    type: {
        type: Number,
        default: constant.PUBLISHER_CODE,
        required: true
    },
    thumbs: [{
        src: String,
        w: Number,
        h: Number
    }]
}, {versionKey: false});

publisherSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    delete obj.appId;
    return obj;
}; // remove _id, appId in result 

export default mongoose.model('Publishers', publisherSchema);
