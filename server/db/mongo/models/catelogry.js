import mongoose from 'mongoose';
import constant from '../constant';

const Schema = mongoose.Schema;

const catelogrySchema = new Schema({

    code: String,
    title: {
        type: String,
        default: 'Define name for catelogry'
    },
    type: {
        type: Number,
        default: constant.CATEGORY_CODE,
        required: true
    },
    domain: String,
    source: {
        type: String,
        required: true
    }

}, {versionKey: false});

export default mongoose.model('Catelogry', catelogrySchema);
