import express from "express";
import {
  commentRouter,
  subsRouter,
  usersRouter,
  videoRouter,
} from "./routes/index.js";

const app = express();

app.use(express.json());

app
  .use("/users", usersRouter)
  .use("/video", videoRouter)
  .use("/comment", commentRouter)
  .use("/subs", subsRouter);

export default app;
