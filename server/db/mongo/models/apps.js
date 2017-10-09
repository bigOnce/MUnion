import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const appsSchema = new Schema({
    appId: {
        type: String,
        required: true,
        default: 'news'
    },
    name: {
        type: String,
        required: true,
        default: 'Define name for App'
    },
    desc: String,
    icons:[{
        src: String,
        w: Number,
        h: Number
    }],
    create: {
        type: Date,
        default: Date.now
    },
    rank: {
        type: Number,
        default: 0
    },
    visible: {
        type: Boolean,
        default: true,
        required: true,        
    }

}, {versionKey: false});

appsSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    return obj;
};

export default mongoose.model('Apps', appsSchema);
