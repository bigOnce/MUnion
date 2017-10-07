import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const filterSchema = new Schema({
    name: String,
    filterId: String,
    filter: Object,
    type: Number,
    timeCreate: {
        type: 'Date',
        default: Date.now
    }
}, {versionKey: false});

filterSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    return obj;
};

export default mongoose.model('Filters', filterSchema);
