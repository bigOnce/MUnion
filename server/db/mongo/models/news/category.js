import mongoose from 'mongoose';
import Constant from '../../../../../constant';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    code: String,
    title: {
        type: String,
        default: ' '
    },
    type: {
        type: Number,
        default: Constant.CATEGORY_CODE,
        required: true
    },
    domain: String,
    source: {
        type: String,
        required: true
    }
}, {versionKey: false});

export default mongoose.model('Category', categorySchema);
