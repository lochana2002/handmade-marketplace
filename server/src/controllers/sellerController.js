const Product = require("../models/Product");
const Order = require("../models/Order");

// GET SELLER PRODUCTS
exports.getMyProducts = async (req, res) => {
  try {
    console.log("Logged in user ID:", req.user._id);

    const products = await Product.find({
      seller: req.user._id,
    });

    console.log("Products found:", products.length);
    console.log(products);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SELLER ORDERS
exports.getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product")
      .populate("buyer", "name email");

    const sellerOrders = orders.filter((order) =>
      order.items.some(
        (item) =>
          item.product.seller.toString() === req.user._id.toString()
      )
    );

    res.json(sellerOrders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getSellerStats = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.product");

    let totalRevenue = 0;
    let totalSales = 0;

    orders.forEach((order) => {
      order.items.forEach((item) => {

        if (
          item.product &&
          item.product.seller &&
          item.product.seller.toString() === req.user._id.toString()
        ) {
          totalRevenue += item.price * item.quantity;
          totalSales += item.quantity;
        }

      });
    });

    res.json({
      totalRevenue,
      totalSales,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};