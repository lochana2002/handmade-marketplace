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
const contactRoutes = require("./routes/contactRoutes");

const aiRoutes = require("./routes/aiRoutes");

const uploadRoutes = require("./routes/uploadRoutes");
const { protect } = require("./middleware/authMiddleware");


const app = express();



/* Middleware */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

console.log("Allowed Origins:", allowedOrigins);


app.use(
cors({
    origin:function(origin,callback){

        if(!origin){
            return callback(null,true);
        }


        if(allowedOrigins.includes(origin)){
            return callback(null,true);
        }


        return callback(
            new Error("Not allowed by CORS")
        );

    },

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


app.use(
"/api/upload",
uploadRoutes
);


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