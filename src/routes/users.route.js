import { Router } from "express";
import { UsersController } from "../controllers/index.js";

const usersController = new UsersController();

const usersRouter = Router();

usersRouter
  .post("/", usersController.createUser)
  .get("/", usersController.getAllUsers)
  .get("/:id", usersController.getUserById)
  .patch("/:id", usersController.updateUser)
  .delete("/:id", usersController.deleteUser);

export default usersRouter;
