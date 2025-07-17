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
}
