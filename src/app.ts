import express, { Express, Request, Response } from "express";

import { getLogger, loadConfig } from "./config/config";
import { roleRouter } from "./api/role";
import { authRouter } from "./api/auth";
import { userRouter } from "./api/user";
import https from "https";
import fs from "fs";
import cors from "cors";
import { initializieFirebaseApp } from "./config/firebaseConfig";
// import { initializieFirebaseApp } from "./config/dbconfig";
const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(roleRouter);
const logger = getLogger();
loadConfig();
let serviceAccount = "";
if (process.env.ACCOUNT_DETAILS) {
  serviceAccount = JSON.parse(process.env.ACCOUNT_DETAILS.toString());
}
initializieFirebaseApp(serviceAccount);
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  res.send({ message: "The User/Auth Service is up" });
});
const httpsCredentials = {
  key: fs.readFileSync(__dirname + "/server.key", "utf-8"),
  cert: fs.readFileSync(__dirname + "/server.cert", "utf-8"),
};
const httpsServer = https.createServer(httpsCredentials, app);
const securePort = process.env.SECURE_PORT;
httpsServer.listen(securePort, () => {
  logger.info(`Https server is running on port ${securePort}`);
});
app.listen(port, () => {
  logger.info(`Application is running on Port : ${port}`);
});
