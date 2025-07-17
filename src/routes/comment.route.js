import { Router } from "express";
import { CommentController } from "../controllers/index.js";

const commentComtroller = new CommentController();

const commentRouter = Router();

commentRouter
  .post("/", commentComtroller.createComment)
  .get("/", commentComtroller.getAllComments)
  .get("/:id", commentComtroller.getCommentById);

export default commentRouter;
