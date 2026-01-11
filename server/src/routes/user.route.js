import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/", createUser);
router.get("/:email", getUser);
router.delete("/:email", deleteUser);
router.put("/:_id", updateUser);

export { router as userRouter };
