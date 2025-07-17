import mongoose, { isValidObjectId } from "mongoose";
import Video from "../models/video.model.js";

export class VideoController {
  async crateVideo(req, res) {
    try {
      const video = await Video.create(req.body);
      return res.status(201).json({
        statusCode: 201,
        message: "Successfully created!",
        data: video,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error || "Internal server error",
      });
    }
  }

  async getAllVideos(_, res) {
    try {
      const videos = await Video.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "uploader_id",
            foreignField: "_id",
            as: "usersInfo",
          },
        },

        { $unwind: "$usersInfo" },

        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "video_id",
            as: "commentInfo",
          },
        },

        { $unwind: "$commentInfo" },

        {
          $project: {
            _id: 1,
            title: 1,
            usersName: "$usersInfo.name",
            commentInfo: "$commentInfo.text",
          },
        },
      ]);

      return res.status(200).json({
        statusCode: 200,
        message: "sucess",
        data: videos,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error || "Internal server error",
      });
    }
  }

  async getVideoById(req, res) {
    try {
      const id = req.params?.id;

      if (!id || !isValidObjectId(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid video ID",
        });
      }

      const video = await Video.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "uploader_id",
            foreignField: "_id",
            as: "usersInfo",
          },
        },
        { $unwind: "$usersInfo" },
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "video_id",
            as: "commentInfo",
          },
        },
        {
          $addFields: {
            commentCount: { $size: "$commentInfo" },
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            usersName: "$usersInfo.name",
            comments: "$commentInfo.text",
            commentCount: 1,
          },
        },
      ]);

      if (!video || video.length === 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "Video not found",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Success",
        data: video,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Internal server error",
      });
    }
  }
}
