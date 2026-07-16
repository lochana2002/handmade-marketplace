const express = require("express");
const router = express.Router();

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const {
  getMyProducts,
  getSellerOrders,
  getSellerStats,
} = require("../controllers/sellerController");

// SELLER PRODUCTS
router.get(
  "/products",
  protect,
  authorizeRoles("seller"),
  getMyProducts
);

// SELLER ORDERS
router.get(
  "/orders",
  protect,
  authorizeRoles("seller"),
  getSellerOrders
);

// SELLER STATS
router.get(
  "/stats",
  protect,
  authorizeRoles("seller"),
  getSellerStats
);

module.exports = router;