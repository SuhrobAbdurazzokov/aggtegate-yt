import { Router } from "express";
import { SubsController } from "../controllers/index.js";

const subsController = new SubsController();

const subsRouter = Router();

subsRouter
  .post("/", subsController.createSubs)
  .delete("/:id", subsController.deleteSubs);

export default subsRouter;
