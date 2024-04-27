import express, { Request, Response } from "express";
import { User } from "../Model/UserModel";
const router = express.Router();

router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    let userId = req.params.id;
    console.log(userId);
    let userDetails = await User.findOne({ id: userId });
    res.send(userDetails);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/user/:id", async (req: Request, res: Response) => {
  let userId = req.params.id;
  let userDetails = req.body;
  await User.updateOne({ id: userId }, { $set: userDetails }, { upsert: true });
});
router.delete("/user/:id", async (req: Request, res: Response) => {
  let userId = req.params.id;
  await User.deleteOne({ id: userId });
  res.status(200).json({ message: "User Deleted successfully" }).send();
});

export { router as userRouter };
