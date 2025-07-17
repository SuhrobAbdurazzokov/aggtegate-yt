import { Schema, model } from "mongoose";

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Users = model("User", usersSchema);

export default Users;
