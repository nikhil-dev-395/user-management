import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/", createUser);
router.get("/all", getAllUsers);
router.get("/:_id", getUser);
router.delete("/:_id", deleteUser);
router.put("/:_id", updateUser);
export { router as userRouter };
