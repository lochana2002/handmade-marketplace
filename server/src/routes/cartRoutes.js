const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
} = require("../controllers/cartController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.post(
  "/",
  protect,
  authorizeRoles("buyer"),
  addToCart
);

router.get(
  "/",
  protect,
  authorizeRoles("buyer"),
  getCart
);

router.put(
  "/:productId",
  protect,
  authorizeRoles("buyer"),
  updateCartQuantity
);

router.delete(
  "/:productId",
  protect,
  authorizeRoles("buyer"),
  removeFromCart
);

module.exports = router;