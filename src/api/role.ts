import express, { Request, Response } from "express";

const router = express.Router();

router.get("/role", (req: Request, res: Response) => {
  //TODO: get all the roles
});
router.post("/role", (req: Request, res: Response) => {
  //enhancement
  //TODO: can be an enhancement no need to implement this now
});
router.put("/role", (req: Request, res: Response) => {
  //enhancement
  //TODO: update role permissions ,
});
router.delete("/role", (req: Request, res: Response) => {
  //enhancement
  //TODO: this should not be done for existing or current users
});

export { router as roleRouter };
