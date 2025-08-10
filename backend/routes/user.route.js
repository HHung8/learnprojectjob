import express from "express";
import { login, register, logout, updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update",updateProfile);

export default router;
