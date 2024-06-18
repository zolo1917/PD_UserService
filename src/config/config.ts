import { LoggingWinston } from "@google-cloud/logging-winston";
import dotenv from "dotenv";
import { Logger, createLogger, format, transports } from "winston";

let logger: Logger;
export function loadConfig() {
  console.log("loading environment config");
  dotenv.config();
}

export function secretKey(): string {
  return process.env.SECRET_KEY || "";
}

export function setLogger(): any {
  const env = process.env.ENV || "dev";
  const loggingWinston = new LoggingWinston();
  logger = createLogger({
    format: format.combine(format.splat(), format.simple()),
    transports: [
      new transports.Console(),
      ...(process.env.CLOUD_ENV === "gcp" ? [loggingWinston] : []),
    ],
  });
}

export function getLogger() {
  if (logger) {
    return logger;
  } else {
    setLogger();
    return logger;
  }
}
