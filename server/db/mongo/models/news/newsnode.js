import Thumb from "../thumb";
import mongoose from "mongoose";
import Constant from "../../../../../constant";

const Schema = mongoose.Schema;

const newsNodeSchema = new Schema(
  {
    source: String,
    title: {
      type: String,
      default: "News node title !!!"
    },
    type: {
      type: Number,
      default: Constant.ANCHOR_CODE,
      required: true
    },
    domain: String,
    path: {
      type: String
    },
    code: {
      type: String,
      default: "0x00"
    },
    thumbs: [],
    content: {
      type: String
    },
    index: {
      type: Number
    },
    comment: {
      type: String
    }
  },
  { versionKey: false }
);

newsNodeSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj._id;
  delete obj.source;
  return obj;
}; // remove _id, appId in result

export default mongoose.model("NewsNode", newsNodeSchema);
