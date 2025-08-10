import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { postJob, getAllJobs, getAdminJobs, getJobById } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.get("/get", isAuthenticated, getAllJobs);
router.get("/get/:id", isAuthenticated, getJobById);
router.post("/getadminjob", isAuthenticated, getAdminJobs);


export default router;
