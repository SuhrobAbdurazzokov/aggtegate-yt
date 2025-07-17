import Subs from "../models/subscriptions.model.js";

export class SubsController {
  async createSubs(req, res) {
    try {
      const subs = await Subs.create(req.body);
      return res.status(201).json({
        statusCode: 201,
        message: "Successfully created!",
        data: subs,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error || "Internal server error",
      });
    }
  }
}
