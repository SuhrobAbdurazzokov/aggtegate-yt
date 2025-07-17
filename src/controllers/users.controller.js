import mongoose, { isValidObjectId } from "mongoose";
import Users from "../models/users.model.js";

export class UsersController {
  async createUser(req, res) {
    try {
      const user = await Users.create(req.body);
      return res.status(201).json({
        statusCode: 201,
        message: "Successfully created!",
        data: user,
        required: true,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error || "Internal server error",
      });
    }
  }

  async getAllUsers(_, res) {
    try {
      const users = await Users.aggregate([
        {
          $lookup: {
            from: "videos",
            localField: "_id",
            foreignField: "uploader_id",
            as: "videoInfo",
          },
        },

        { $unwind: "$videoInfo" },

        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "user_id",
            as: "commentInfo",
          },
        },

        {
          $project: {
            _id: 1,
            name: 1,
            videoInfo: "$videoInfo.title",
            videoInfo: "$videoInfo.category",
            videoInfo: "$videoInfo.views",
            videoInfo: "$videoInfo.likes",
            commentInfo: "$commentInfo.text",
          },
        },
      ]);

      return res.status(201).json({
        statusCode: 201,
        message: "Successfully created!",
        data: users,
        required: true,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error || "Internal server error",
      });
    }
  }

  async getUserById(req, res) {
    try {
      const id = req.params?.id;

      if (!isValidObjectId(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "Bad invalid id",
        });
      }

      if (!id) {
        return res.status(404).json({
          statusCode: 404,
          message: "User not found by id",
        });
      }

      const user = await Users.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },

        {
          $lookup: {
            from: "videos",
            localField: "_id",
            foreignField: "uploader_id",
            as: "videoInfo",
          },
        },

        { $unwind: "$videoInfo" },

        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "user_id",
            as: "commentInfo",
          },
        },

        {
          $project: {
            _id: 1,
            name: 1,
            videoInfo: "$videoInfo.title",
            videoInfo: "$videoInfo.category",
            videoInfo: "$videoInfo.views",
            videoInfo: "$videoInfo.likes",
            commentInfo: "$commentInfo.text",
          },
        },
      ]);

      return res.status(201).json({
        statusCode: 201,
        message: "Successfully created!",
        data: user,
        required: true,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error || "Internal server error",
      });
    }
  }
}
