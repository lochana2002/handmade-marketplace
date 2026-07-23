const express = require("express");
const router = express.Router();

const {
  createReview,
  getProductReviews,
} = require("../controllers/reviewController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Buyer adds review
router.post(
  "/:productId",
  protect,
  authorizeRoles("buyer"),
  createReview
);

// Anyone can view reviews
router.get(
  "/:productId",
  getProductReviews
);

module.exports = router;