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


    




}
