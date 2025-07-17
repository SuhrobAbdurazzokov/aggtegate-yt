import { Schema, model } from "mongoose";

const SubsSchema = new Schema({
  follower_id: { type: Schema.Types.ObjectId, ref: "User" },
  followee_id: { type: Schema.Types.ObjectId, ref: "User" },
});

const Subs = model("Subs", SubsSchema);

export default Subs;
