import mongoose from 'mongoose';
import constant from '../constant';

const Schema = mongoose.Schema;

const catelogrySchema = new Schema({

    code: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: 'Define name for catelogry'
    },
    type: {
        type: Number,
        default: constant.PUBLISHER_CODE,
        required: true
    },
    domain: String,

}, {versionKey: false});

export default mongoose.model('Catelogry', catelogrySchema);
