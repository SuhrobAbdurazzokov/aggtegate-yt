import consola from "consola";
import { connecDB, envConfig } from "./config/index.js";
import app from "./app.js";

const PORT = envConfig.port;

await connecDB();

app.listen(PORT, () => consola.success("Server running on port: ", PORT));

