import { Router } from "express";
import { VideoController } from "../controllers/index.js";

const videoController = new VideoController();

const videoRouter = Router();

videoRouter
  .post("/", videoController.crateVideo)
  .get("/", videoController.getAllVideos)
  .get("/popular", videoController.popularCategory)
  .get("/:id", videoController.getVideoById)
  .get("/:id", videoController.avgVideoComment)
  .patch("/:id", videoController.updateVideo)
  .delete("/:id", videoController.deleteVideo);

export default videoRouter;
