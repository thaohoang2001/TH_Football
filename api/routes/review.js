import express from "express";
import { verifyToken } from "../ultis/verifyToken.js";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", verifyToken, createReview )
router.get("/:pitchId", getReviews )
router.delete("/:id", deleteReview)

export default router;