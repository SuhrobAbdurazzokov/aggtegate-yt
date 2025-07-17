import { connect } from "mongoose";
import consola from "consola";

import { envConfig } from "./env.config.js";

export const connecDB = async () => {
  try {
    await connect(envConfig.mongoURI);
    consola.success("Connected to database");
  } catch (error) {
    consola.error("Error on connecting to database: ", error);
    process.exit(1);
  }
};
