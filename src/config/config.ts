import dotenv from "dotenv";

export function loadConfig() {
  console.log("loading environment config");
  dotenv.config();
}

export function secretKey(): string {
  return process.env.SECRET_KEY || "";
}
