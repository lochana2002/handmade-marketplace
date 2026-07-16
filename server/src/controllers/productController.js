const Product = require("../models/Product");

// ===============================
// CREATE PRODUCT (Seller)
// ===============================
exports.createProduct = async (req, res) => {
  try {
    const {
title,
description,
price,
image,
category,
stock,
featured
}=req.body;

    if (!title || !description || !price || !category) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    const product = await Product.create({

title,
description,
price:Number(price),
image,
category,
stock:Number(stock)||1,

featured: featured || false,

seller:req.user._id

});

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET FEATURED PRODUCTS
exports.getFeaturedProducts = async (req, res) => {
  try {

    const products = await Product.find({
      featured: true
    }).limit(8);

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// ===============================
// GET ALL PRODUCTS
// ===============================
exports.getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      seller,
      minPrice,
      maxPrice,
      minRating,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Search
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Category
    if (category) {
      query.category = {
        $regex: `^${category}$`,
        $options: "i",
      };
    }

    // Seller
    if (seller) {
      query.seller = seller;
    }

    // Price
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Rating
    if (minRating) {
      query.rating = {
        $gte: Number(minRating),
      };
    }

    // Sorting
    let sortOption = {};

    switch (sort) {
      case "price":
        sortOption.price = 1;
        break;

      case "-price":
        sortOption.price = -1;
        break;

      case "rating":
        sortOption.rating = -1;
        break;

      case "oldest":
        sortOption.createdAt = 1;
        break;

      default:
        sortOption.createdAt = -1;
    }

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query)
      .populate("seller", "name email")
      .sort(sortOption)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    res.json({
      totalProducts,
      totalPages: Math.ceil(totalProducts / pageSize),
      currentPage: pageNumber,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// GET SINGLE PRODUCT
// ===============================
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("seller", "name email");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// DELETE PRODUCT
// ===============================
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (
      product.seller.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// UPDATE PRODUCT
// ===============================
exports.updateProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);


    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }



    // only owner or admin can update
    if (
      product.seller.toString() !== req.user._id.toString()
      &&
      req.user.role !== "admin"
    ) {

      return res.status(403).json({
        message: "Not authorized",
      });

    }



    product.title = req.body.title;
    product.description = req.body.description;
    product.price = Number(req.body.price);
    product.image = req.body.image;
    product.category = req.body.category;
    product.stock = Number(req.body.stock);



    await product.save();



    res.json({

      message: "Product updated successfully",

      product

    });



  } catch(error) {

    console.error(error);

    res.status(500).json({

      message:error.message

    });

  }

};