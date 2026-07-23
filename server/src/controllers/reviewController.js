const Review = require("../models/Review");
const Product = require("../models/Product");

// Add Review
exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;

    // Product exists?
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    // One review per buyer
    const alreadyReviewed = await Review.findOne({
      product: productId,
      user: req.user._id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You have already reviewed this product",
      });
    }

    await Review.create({
      product: productId,
      user: req.user._id,
      rating,
      comment,
    });

    // Recalculate rating
    const reviews = await Review.find({
      product: productId,
    });

    const average =
      reviews.reduce((sum, review) => sum + review.rating, 0) /
      reviews.length;

    product.rating = average;
    product.numReviews = reviews.length;

    await product.save();

    res.status(201).json({
      message: "Review added successfully",
    });

    const review = await Review.create({
  product: productId,
  user: req.user._id,
  rating,
  comment,
});

await review.populate("user", "name");

res.status(201).json({
  message: "Review added successfully",
  review,
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).populate("user", "name");

    res.json(reviews);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};