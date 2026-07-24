const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const cloudinary = require("../config/cloudinary");


router.post(
"/image",
upload.single("image"),
async(req,res)=>{


try{


if(!req.file){

return res.status(400).json({
message:"No image selected"
});

}


const result = await cloudinary.uploader.upload(

`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,

{
folder:"handmade-products"
}

);


res.json({

url: result.secure_url

});


}
catch(error){

console.log(error);


res.status(500).json({

message:error.message

});


}


});


module.exports = router;