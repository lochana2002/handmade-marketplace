const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  getFeaturedProducts,
  updateProduct,
} = require("../controllers/productController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Public routes
router.get("/featured", getFeaturedProducts);
router.get("/", getProducts);
router.get("/:id", getProduct);

// Seller/Admin routes
router.post(
  "/",
  protect,
  authorizeRoles("seller", "admin"),
  createProduct
);

router.get(
  "/featured",
  getFeaturedProducts
);

// UPDATE PRODUCT
router.put(
  "/:id",
  protect,
  authorizeRoles("seller", "admin"),
  updateProduct
);

// Delete product (owner or admin)
router.delete("/:id", protect, deleteProduct);

module.exports = router;