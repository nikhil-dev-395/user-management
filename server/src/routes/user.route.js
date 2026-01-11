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
router.get("/:_id", getUser);
router.delete("/:_id", deleteUser);
router.put("/:_id", updateUser);
router.get("/all", getAllUsers);
export { router as userRouter };
