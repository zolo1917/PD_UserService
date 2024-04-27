import * as jwt from "jsonwebtoken";
import { secretKey } from "../config/config";
function authenticate(req: any, res: any, next: any) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  let key = secretKey() || "";
  jwt.verify(token, key, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({
        error: "Invalid token",
      });
    }
    req.user = user;
    next();
  });
}

export default authenticate;
