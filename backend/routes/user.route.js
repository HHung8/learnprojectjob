import express from "express";
import upload from "../config/multer.js";
import { login, register, logout, updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", upload.single("file"), register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update",updateProfile);

export default router;
