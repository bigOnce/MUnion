import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const publisherSchema = new Schema({
    code: String,
    name: String,
    title: String,
    type: Number,
    thumb: {
        src: String,
        w: Number,
        h: Number,
    }
}, {versionKey: false});

publisherSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    return obj;
};

export default mongoose.model('Publisher', publisherSchema);
