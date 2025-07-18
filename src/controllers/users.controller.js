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

      return res.status(200).json({
        statusCode: 200,
        message: "Successfully retrieved!",
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

      if (!user || user.length === 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "User not found",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Successfully retrieved!",
        data: user[0],
        required: true,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error || "Internal server error",
      });
    }
  }

  async topBloggersFollowers(req, res) {
    try {
      const topBlogger = Users.aggregate([
        {
          $lookup: {
            from: "subs",
            localField: "_id",
            foreignField: "followee_id",
            as: "followers",
          },
        },

        {
          $addFields: {
            followersCount: { $size: "$followers" },
          },
        },

        { $sort: { $followersCount: -1 } },
        { $limit: 5 },

        {
          $project: {
            name: 1,
            followersCount: 1,
          },
        },
      ]);
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error || "Internal server error",
      });
    }
  }



  




  async updateUser(req, res) {
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

      const updatedUser = await Users.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser) {
        return res.status(404).json({
          statusCode: 404,
          message: "User not found",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Successfully updated!",
        data: updatedUser,
        required: true,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error || "Internal server error",
      });
    }
  }

  async deleteUser(req, res) {
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

      const deletedUser = await Users.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({
          statusCode: 404,
          message: "User not found",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Successfully deleted!",
        data: deletedUser,
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
