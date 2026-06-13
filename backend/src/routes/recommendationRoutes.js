import express from "express";
import { createGemstoneRecommendation, getRecommendationById, getUserRecommendationHistory } from "../controllers/recommendationController.js";
import protect from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post(
  "/createRecommendation",
  protect,
  createGemstoneRecommendation
);

router.get("/history", protect, getUserRecommendationHistory);
router.get("/:recommendationId", protect, getRecommendationById);

export default router;