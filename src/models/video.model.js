import { Schema, model } from "mongoose";

const videoSchema = new Schema(
  {
    title: { type: String },
    uploader_id: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: String, required: true },
    views: { type: Number, required: true },
    likes: { type: Number, required: true },
  },
  { timestamps: true }
);

const Video = model("Video", videoSchema);

export default Video;
