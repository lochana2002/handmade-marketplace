const Product=require("../models/Product");

const {
askAI
}=require("../services/aiService");



exports.chat=async(req,res)=>{


try{


const {
message
}=req.body;



if(!message){

return res.status(400).json({

message:"Message required"

});

}



const products =
await Product.find()
.limit(50);



const reply =
await askAI(
message,
products
);



res.json({

reply

});



}
catch (error) {
  console.error("===== AI Controller Error =====");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}


};