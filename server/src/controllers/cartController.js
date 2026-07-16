const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ==========================
// ADD TO CART
// ==========================
exports.addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    // Validate quantity
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    // Check product exists
    const productData = await Product.findById(product);

    if (!productData) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Check stock
    if (quantity > productData.stock) {
      return res.status(400).json({
        message: "Not enough stock available",
      });
    }

    let cart = await Cart.findOne({ buyer: req.user._id });

    if (!cart) {
      cart = new Cart({
        buyer: req.user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === product
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > productData.stock) {
        return res.status(400).json({
          message: "Quantity exceeds available stock",
        });
      }

      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({
        product,
        quantity,
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
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
    const cart = await Cart.findOne({
      buyer: req.user._id,
    }).populate("items.product");

    if (!cart) {
      return res.json({
        items: [],
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
      });
    }

    const subtotal = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

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

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

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
        message: "Item not found in cart",
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
        message: "Not enough stock available",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.json({
      message: "Cart updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// REMOVE FROM CART
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
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();

    res.json({
      message: "Product removed",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};