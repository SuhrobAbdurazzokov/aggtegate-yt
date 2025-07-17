import { Router } from "express";
import { VideoController } from "../controllers/index.js";

const videoController = new VideoController();

const videoRouter = Router();

videoRouter
  .post("/", videoController.crateVideo)
  .get("/", videoController.getAllVideos)
  .get("/:id", videoController.getVideoById);

export default videoRouter;
