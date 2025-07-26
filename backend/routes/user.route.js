import express from "express";
import { login,register,logout, updateProfile } from "../controllers/user.controller.js";

const router = express.Router();
router.route("/register").post(register);

export default router;