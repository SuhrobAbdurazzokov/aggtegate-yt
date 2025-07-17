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

  async getAllUsers(req, res) {
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

        { $unwind: "$commentInfo" },

        {
          $lookup: {
            from: "subs",
            localField: "_id",
            foreignField: "follwer_id",
            as: "subsInfo",
          },
        },

        { $unwind: "$subsInfo" },

        {
          $project: {
            _id: 0,
            name: 1,
            videoInfo: "$videoInfo.title",
            videoInfo: "$videoInfo.category",
            videoInfo: "$videoInfo.views",
            videoInfo: "$videoInfo.likes",
            commentInfo: "$commentInfo.text",
            subsInfo: "$subsInfo.follower_id",
            subsInfo: "$subsInfo.followee_id",
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
}
