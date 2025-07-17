import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  video_id: { type: Schema.Types.ObjectId, ref: "Video" },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  likes: { type: Number, required: true },
});

const Comment = model("Comment", commentSchema);

export default Comment;
