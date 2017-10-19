import mongoose from 'mongoose';
import constant from '../constant';

const Schema = mongoose.Schema;

const publisherSchema = new Schema({
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
        w: {
            type: Number,
            default: 512
        },
        h: {
            type: Number,
            default: 512
        }
    }],
    keywords: {
        type: String,
    },
    domain: String,
    
}, {versionKey: false});

// publisherSchema.methods.toJSON = function () {
//     const obj = this.toObject();
//     return obj;
// }; // remove _id, appId in result 

export default mongoose.model('Publishers', publisherSchema);
