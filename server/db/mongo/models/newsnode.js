import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const newsNodeSchema = new Schema({
    code: String,
    type: String,
    title: String,
    src: String,
    content: String,
    thumb: {
        src: String,
        w: Number,
        h: Number
    },
}, {versionKey: false});

newsNodeSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    return obj;
};

export default mongoose.model('NewsNode', newsNodeSchema);
