import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  clapProject,
} from "../controllers/project.controller.js";

import upload from "../utils/cloudinaryUpload.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔐 Admin Protected Routes
// router.post("/",  upload.single("image"), createProject);
router.post("/", protect, upload.single("image"), createProject);
router.put("/:id", protect, upload.single("image"), updateProject);
router.delete("/:id", protect, deleteProject);

// 🌐 Public Routes
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/:id/clap", clapProject);

export default router;
