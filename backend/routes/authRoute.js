import express from "express";
import {
  getLoggedInUser,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", verifyToken, getLoggedInUser);

export default router;
