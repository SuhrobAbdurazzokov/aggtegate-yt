import { Router } from "express";
import { SubsController } from "../controllers/index.js";

const subsController = new SubsController();

const subsRouter = Router();

subsRouter.post("/", subsController.createSubs);

export default subsRouter