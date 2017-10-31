import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const filterSchema = new Schema({
    domain: {
        type: String,
        required: true
    },
    name: String,
    filter: {
        publisher: {
            url: String,
            filter: Object
        },
        catelogries: [
            {
                fid: String,
                url: String,
                filter: Object
            }
        ],
        contents: [
            {
                fid: String,
                url: String,
                filter: Object
            }
        ],
        containers: {
            catelogries: [
                {
                    url: String,
                    filter: Object
                }
            ]
        }
    },
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
