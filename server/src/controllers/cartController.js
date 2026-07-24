const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ==========================
// ADD TO CART
// ==========================
exports.addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    if (!product) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    const qty = Number(quantity);

    if (qty < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const productData = await Product.findById(product);

    if (!productData) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (qty > productData.stock) {
      return res.status(400).json({
        message: "Not enough stock available",
      });
    }

    let cart = await Cart.findOne({
      buyer: req.user._id,
    });

    if (!cart) {
      cart = new Cart({
        buyer: req.user._id,
        items: [],
      });
    }

    const existing = cart.items.find(
      (item) => item.product.toString() === product
    );

    if (existing) {
      existing.quantity += qty;

      if (existing.quantity > productData.stock) {
        existing.quantity = productData.stock;
      }
    } else {
      cart.items.push({
        product,
        quantity: qty,
      });
    }

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate(
      "items.product"
    );

    res.json({
      message: "Added to cart",
      cart: populatedCart,
    });
  } catch (error) {
    console.error("ADD CART ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// GET CART
// ==========================
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      buyer: req.user._id,
    }).populate("items.product");

    if (!cart) {
      return res.json({
        cart: {
          items: [],
        },
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
      });
    }

    // Remove deleted products
    cart.items = cart.items.filter((item) => item.product);

    await cart.save();

    let subtotal = 0;

    cart.items.forEach((item) => {
      subtotal += item.product.price * item.quantity;
    });

    const shipping = subtotal >= 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    res.json({
      cart,
      subtotal,
      shipping,
      tax,
      total,
    });
  } catch (error) {
    console.error("GET CART ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// UPDATE QUANTITY
// ==========================
exports.updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne({
      buyer: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (i) => i.product.toString() === req.params.productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        message: "Not enough stock",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.json({
      message: "Cart updated",
    });
  } catch (error) {
    console.error("UPDATE CART ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// REMOVE ITEM
// ==========================
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      buyer: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        item.product.toString() !== req.params.productId
    );

    await cart.save();

    res.json({
      message: "Removed successfully",
    });
  } catch (error) {
    console.error("REMOVE CART ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};