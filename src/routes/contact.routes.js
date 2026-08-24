import express from "express";
import {
  createContactMessage,
  getAllMessages,
  deleteContactMessage,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/contact", createContactMessage);
router.get("/contact", getAllMessages);
router.delete("/contact/:id", deleteContactMessage);

export default router;
