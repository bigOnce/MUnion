import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    code: Number,
    type: String,
    desc: String,
    timeCreate: {
        type: 'Date',
        default: Date.now
    }
}, {versionKey: false});

typeSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj._id;
    return obj;
}

export default mongoose.model('NodeType', typeSchema);
