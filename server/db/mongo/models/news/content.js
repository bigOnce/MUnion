import mongoose from "mongoose";
import Constant from "../../../../../constant";

const Schema = mongoose.Schema;

const contentSchema = new Schema(
  {
    sourceUrl: {
      type: String,
      required: true
    },
    type: {
      type: Number,
      default: Constant.ARTICLE_CODE,
      required: true
    },
    domain: String,
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    timeCreate: {
      type: Date,
      default: Date.now
    },
    nodes: [],
    relatives: []
  },
  { versionKey: false }
);

export default mongoose.model("NewsContent", contentSchema);
