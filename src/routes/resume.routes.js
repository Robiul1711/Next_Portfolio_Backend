import express from "express";
import { getResume, updateResume } from "../controllers/resume.controller.js";

const router = express.Router();

router.get("/resume", getResume);
router.put("/resume", updateResume);
router.post("/resume", updateResume);

export default router;
