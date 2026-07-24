const express = require("express");

const router = express.Router();


const {

getAdminStats,
getUsers,
getProducts,
getOrders,
getCategories,
getSellers

} = require("../controllers/adminController");



const {
protect,
authorizeRoles
} = require("../middleware/authMiddleware");





// Dashboard

router.get(
"/stats",
protect,
authorizeRoles("admin"),
getAdminStats
);




// Users

router.get(
"/users",
protect,
authorizeRoles("admin"),
getUsers
);




// Sellers

router.get(
"/sellers",
protect,
authorizeRoles("admin"),
getSellers
);




// Products

router.get(
"/products",
protect,
authorizeRoles("admin"),
getProducts
);




// Orders

router.get(
"/orders",
protect,
authorizeRoles("admin"),
getOrders
);

// categories
router.get(
"/categories",
protect,
authorizeRoles("admin"),
getCategories
);


module.exports = router;