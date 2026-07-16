const express = require("express");
const router = express.Router();

const {
  checkout,
  getMyOrders,
  getAllOrders,
} = require("../controllers/orderController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const {
  updateOrderStatus,
} = require("../controllers/orderController");

// BUYER - checkout (cart → order)
router.post(
  "/checkout",
  protect,
  authorizeRoles("buyer"),
  checkout
);

// BUYER - my orders
router.get(
  "/my-orders",
  protect,
  authorizeRoles("buyer"),
  getMyOrders
);

// ADMIN - all orders
router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAllOrders
);

router.put(
  "/:orderId/status",
  protect,
  authorizeRoles("seller", "admin"),
  updateOrderStatus
);

module.exports = router;