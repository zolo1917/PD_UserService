import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { secretKey } from "../config/config";
import { IUser, User } from "../Model/UserModel";
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
    const user: IUser | null = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json({ message: "Invalid UserId" });
      res.send();
      return;
    } else {
      const isPasswordvalid = await bcrypt.compare(
        password,
        user.hashedPassword
      );
      if (!isPasswordvalid) {
        res.status(401).json({ message: "invalid password" });
        res.send();
        return;
      }
      let key: string = secretKey();
      await User.updateOne(
        { id: user.id },
        { $set: { last_logged_in: new Date(), updated_at: new Date() } },
        { upsert: true }
      );
      const accessToken = jwt.sign({ user: user.id }, key, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign(
        {
          user: user.id,
        },
        key,
        { expiresIn: "7d" }
      );
      res.status(200).json({
        id: user.id,
        accessToken: accessToken,
        refreshToken: refreshToken,
        message: "Login successful",
      });
    }
  } catch {
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
    const existingUser = await User.findOne({ email });
    if (existingUser !== null) {
      res.status(400).json({ message: "This User already exists" });
      res.send();
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userId = await User.create({
      email: email,
      hashedPassword: hashedPassword,
    });
    res
      .status(200)
      .json({ id: userId, message: "User has been created successfully" });
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

export { router as authRouter };
