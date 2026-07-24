const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

exports.getMarketplaceStats = async (req, res) => {
  try {

    const totalProducts = await Product.countDocuments();

    const totalArtisans = await User.countDocuments({
      role: "seller",
    });

    const totalCustomers = await User.countDocuments({
      role: "buyer",
    });

    const totalOrders = await Order.countDocuments();

    const categories = await Product.distinct("category");

    const avgRating = await Product.aggregate([
      {
        $group: {
          _id: null,
          average: { $avg: "$rating" },
        },
      },
    ]);

    res.json({
      totalProducts,
      totalArtisans,
      totalCustomers,
      totalOrders,
      totalCategories: categories.length,
      averageRating:
        avgRating.length > 0
          ? avgRating[0].average.toFixed(1)
          : "5.0",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};