const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getAdminStats = async (req, res) => {
  try {
    const users = await User.countDocuments();

    const products = await Product.countDocuments();

    const orders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]);

    const revenue =
      revenueData.length > 0
        ? revenueData[0].total
        : 0;

    res.json({
      users,
      products,
      orders,
      revenue,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

const Order = require("../models/Order");

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("buyer", "name email")
      .populate("items.product", "title image price");

    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};