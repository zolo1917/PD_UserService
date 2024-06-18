import express, { Request, Response } from "express";
// import { User, updateProcessedData } from "../config/dbconfig";
import { getFirestoreInstance, updateDataInDB } from "../config/firebaseConfig";
import { getLogger } from "../config/config";
const router = express.Router();
const logger = getLogger();
router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    let userId = req.params.id;
    const userRef = getFirestoreInstance().collection("Users");
    await userRef
      .doc(userId)
      .get()
      .then((value: any) => {
        const data = value.doc();
        res.status(200).send({ data });
      });
    logger.info(userId);
    return;
  } catch (err) {
    logger.info(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req: Request, resp: Response) => {
  const userRef = getFirestoreInstance().collection("Users");
  await userRef.get().then((value: any) => {
    const data = value.docs.map((doc: any) => doc.data());
    resp.status(200).send(data);
  });
});

router.post("/user", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    logger.info(data);
    // await User.add(data);
    // await val();
    // await updateProcessedData();
    await updateDataInDB();
    res.send({ msg: "User Created" });
  } catch (err) {
    logger.info(err);
    res.status(500).json("internal server error");
  }
});

router.put("/user/:id", async (req: Request, res: Response) => {
  let userId = req.params.id;
  delete req.body.id;
  let userDetails = req.body;
  // User.doc(userId)
  //   .update(userDetails)
  //   .then(() => {
  //     logger.info("entry succcess");
  //   });
  // await User.updateOne({ id: userId }, { $set: userDetails }, { upsert: true });
});
router.delete("/user/:id", async (req: Request, res: Response) => {
  let userId = req.params.id;
  // await User.doc(userId).delete();
  res.status(200).json({ message: "User Deleted successfully" }).send();
});

export { router as userRouter };
