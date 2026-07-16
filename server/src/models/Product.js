const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 1,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    featured: {
  type: Boolean,
  default: false,
},

    rating: {
  type: Number,
  default: 0,
},

numReviews: {
  type: Number,
  default: 0,
},

  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);