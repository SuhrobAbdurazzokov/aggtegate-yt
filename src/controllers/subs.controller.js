import mongoose, { isValidObjectId } from "mongoose";
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

  async deleteSubs(req, res) {
    try {
      const id = req.params?.id;

      if (!id || !isValidObjectId(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid subscription ID",
        });
      }

      const deletedSubs = await Subs.findByIdAndDelete(id);

      if (!deletedSubs) {
        return res.status(404).json({
          statusCode: 404,
          message: "Subscription not found",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Successfully deleted!",
        data: deletedSubs,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Internal server error",
      });
    }
  }
}
