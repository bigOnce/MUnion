import mongoose from "mongoose";
import Constant from "../../../../../constant";

const Schema = mongoose.Schema;

const contentSchema = new Schema(
  {
    siteInfo: Object,
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
    nodes: [],
    relatives: []
  },
  { versionKey: false }
);

export default mongoose.model("NewsContent", contentSchema);
