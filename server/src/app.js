const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");


const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const adminRoutes = require("./routes/adminRoutes");
const statsRoutes = require("./routes/statsRoutes")
const contactRoutes = require("./routes/contactRoutes");;

const aiRoutes = require("./routes/aiRoutes");


const { protect } = require("./middleware/authMiddleware");


const app = express();



/* Middleware */

app.use(
cors({
origin:"http://localhost:5173",
credentials:true
})
);


app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));





/* Routes */


app.use(
"/api/auth",
authRoutes
);



app.use(
"/api/products",
productRoutes
);



app.use(
"/api/orders",
orderRoutes
);



app.use(
"/api/cart",
cartRoutes
);



app.use(
"/api/seller",
sellerRoutes
);



app.use(
"/api/reviews",
reviewRoutes
);



app.use(
"/api/admin",
adminRoutes
);



app.use(
"/api/stats",
statsRoutes
);



app.use(
"/api/ai",
aiRoutes
);

app.use("/api/contact", contactRoutes);





app.get(
"/api/protected",
protect,
(req,res)=>{

res.json({

message:"Protected data",

user:req.user

});

});





app.get(
"/",
(req,res)=>{

res.json({

message:"Handmade Marketplace API Running"

});

});



module.exports = app;