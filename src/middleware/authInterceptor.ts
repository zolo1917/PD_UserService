import { secretKey } from "../config/config";
import * as jwt from "jsonwebtoken";
function interceptor(req: any, res: any, next: any) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (token) {
    let key = secretKey() || "";
    jwt.verify(token, key, (err: any, user: any) => {
      if (!err) {
        req.user = user;
      }
      next();
    });
  } else {
    next();
  }
}
export default interceptor;
