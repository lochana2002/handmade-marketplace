const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Category = require("../models/Category");


// Dashboard Statistics
exports.getAdminStats = async (req, res) => {

    try {

        const totalUsers =
            await User.countDocuments();


        const buyers =
            await User.countDocuments({
                role: "buyer"
            });


        const sellers =
            await User.countDocuments({
                role: "seller"
            });


        const products =
            await Product.countDocuments();


        const orders =
            await Order.countDocuments();


        const revenue =
            await Order.aggregate([
                {
                    $group:{
                        _id:null,
                        total:{
                            $sum:"$total"
                        }
                    }
                }
            ]);



        res.json({

            totalUsers,

            buyers,

            sellers,

            products,

            orders,

            revenue:
            revenue[0]?.total || 0

        });



    } catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};




// GET ALL USERS
exports.getUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password")
            .sort({
                createdAt:-1
            });


        res.json(users);


    } catch(error) {

        res.status(500).json({
            message:error.message
        });

    }

};




// GET ALL SELLERS
exports.getSellers = async (req, res) => {

    try {


        const sellers =
            await User.find({
                role:"seller"
            })
            .select("-password")
            .sort({
                createdAt:-1
            });



        res.json(sellers);



    } catch(error){


        res.status(500).json({
            message:error.message
        });


    }

};




// GET ALL PRODUCTS
exports.getProducts = async (req,res)=>{

    try {


        const products =
            await Product.find()
            .populate(
                "seller",
                "name email"
            )
            .sort({
                createdAt:-1
            });



        res.json(products);



    } catch(error){


        res.status(500).json({
            message:error.message
        });


    }

};



exports.getCategories = async(req,res)=>{

try{


const categories =
await Category.find()
.sort({
createdAt:-1
});


res.json(categories);


}
catch(error){

res.status(500).json({
message:error.message
});

}


};

// GET ALL ORDERS
exports.getOrders = async(req,res)=>{

    try{


        const orders =
            await Order.find()

            .populate(
                "buyer",
                "name email"
            )

            .populate(
                "items.product",
                "title price"
            )

            .sort({
                createdAt:-1
            });



        res.json(orders);



    } catch(error){


        res.status(500).json({
            message:error.message
        });


    }

};