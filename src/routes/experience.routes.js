import express from "express";
import {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experience.controller.js";

const router = express.Router();

router.get("/experiences", getAllExperiences);
router.post("/experiences", createExperience);
router.put("/experiences/:id", updateExperience);
router.delete("/experiences/:id", deleteExperience);

export default router;
