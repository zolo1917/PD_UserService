import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { secretKey } from "../config/config";
import { getFirestoreInstance } from "../config/firebaseConfig";
// import { User } from "../config/dbconfig";
const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  //TODO: Update the login method
  console.log("login Method called");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    res.send();
    return;
  }
  const { email, password } = req.body;
  try {
    const userRef = getFirestoreInstance().collection("Users");
    const userDetails = await userRef
      .where("email", "==", email)
      .get()
      .then((value: any) => {
        const data = value.docs.map((doc: any) => doc.data());
        return data;
      });
    console.log(userDetails);
    if (userDetails.length > 1 || userDetails.length === 0) {
      res.status(401).json({ message: "Invalid UserId" });
      res.send();
      return;
    } else {
      let userData = userDetails[0];
      console.log(userData);
      let user = {
        email: userData.email || "",
        hashedPassword: userData.hashedPassword,
      };
      const isPasswordvalid = await bcrypt.compare(
        password,
        user.hashedPassword
      );
      if (!isPasswordvalid) {
        res.status(401).json({ message: "invalid password" });
        return;
      }
      let key: string = secretKey();

      // await User.updateOne(
      //   { id: "user.id " },
      //   { $set: { last_logged_in: new Date(), updated_at: new Date() } },
      //   { upsert: true }
      // );
      const accessToken = jwt.sign({ user: "user.id" }, key, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign(
        {
          user: "user.id",
        },
        key,
        { expiresIn: "7d" }
      );
      res.status(200).json({
        id: "user.id",
        accessToken: accessToken,
        refreshToken: refreshToken,
        message: "Login successful",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
    res.send();
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    res.send();
  }
  const { email, password } = req.body;
  try {
    const UserRef = getFirestoreInstance().collection("Users");
    const existingUsers = await UserRef.where("email", "==", email)
      .get()
      .then((value: any) => {
        const data = value.docs.map((doc: any) => doc.data());
        return data;
      });
    console.log(existingUsers);
    if (existingUsers.length > 0) {
      res.status(400).json({ message: "This User already exists" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await UserRef.add({
      email: email,
      hashedPassword: hashedPassword,
      created_at: new Date(),
    }).then((resp: any) => {
      console.log(resp.data());
      res
        .status(200)
        .json({ id: email, message: "User has been created successfully" });
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

export { router as authRouter };
