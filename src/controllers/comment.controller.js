import mongoose, { isValidObjectId } from "mongoose";
import Comment from "../models/comment.model.js";

export class CommentController {
  async createComment(req, res) {
    try {
      const comment = await Comment.create(req.body);
      return res.status(201).json({
        statusCode: 201,
        message: "Successfully created!",
        data: comment,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error || "Internal server error",
      });
    }
  }

  async getAllComments(_, res) {
    try {
      const comments = await Comment.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "usersInfo",
          },
        },

        { $unwind: "$usersInfo" },

        {
          $lookup: {
            from: "videos",
            localField: "video_id",
            foreignField: "_id",
            as: "videoInfo",
          },
        },

        { $unwind: "$videoInfo" },

        {
          $project: {
            _id: 1,
            text: 1,
            likes: 1,
            usersName: "$usersInfo.name",
            videoInfo: "$videoInfo.title",
          },
        },
      ]);

      return res.status(200).json({
        statusCode: 200,
        message: "Successfully retrieved!",
        data: comments,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error || "Internal server error",
      });
    }
  }

  async getCommentById(req, res) {
    try {
      const id = req.params?.id;

      if (!id || !isValidObjectId(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid comment ID",
        });
      }

      const comment = await Comment.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "usersInfo",
          },
        },
        {
          $unwind: {
            path: "$usersInfo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "videos",
            localField: "video_id",
            foreignField: "_id",
            as: "videoInfo",
          },
        },
        {
          $unwind: {
            path: "$videoInfo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            text: 1,
            likes: 1,
            usersName: { $ifNull: ["$usersInfo.name", "Unknown User"] },
            videoTitle: { $ifNull: ["$videoInfo.title", "Unknown Video"] },
          },
        },
      ]);

      if (!comment || comment.length === 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "Comment not found",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Successfully retrieved!",
        data: comment[0],
      });
    } catch (error) {
      console.error("Error in getCommentById:", error);
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Internal server error",
      });
    }
  }

  async updateComment(req, res) {
    try {
      const id = req.params?.id;

      if (!id || !isValidObjectId(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid comment ID",
        });
      }

      const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedComment) {
        return res.status(404).json({
          statusCode: 404,
          message: "Comment not found",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Successfully updated!",
        data: updatedComment,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Internal server error",
      });
    }
  }

  async deleteComment(req, res) {
    try {
      const id = req.params?.id;

      if (!id || !isValidObjectId(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid comment ID",
        });
      }

      const deletedComment = await Comment.findByIdAndDelete(id);

      if (!deletedComment) {
        return res.status(404).json({
          statusCode: 404,
          message: "Comment not found",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Successfully deleted!",
        data: deletedComment,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Internal server error",
      });
    }
  }
}
