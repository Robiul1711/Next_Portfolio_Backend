import express from "express";
import { trackPageView, getAnalyticsStats } from "../controllers/analytics.controller.js";

const router = express.Router();

router.post("/analytics/track", trackPageView);
router.get("/analytics/stats", getAnalyticsStats);

export default router;
