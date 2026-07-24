const mongoose = require("mongoose");
require("dotenv").config();


const app = require("./app");



mongoose.connect(
process.env.MONGO_URI
)
.then(()=>{

console.log(
"MongoDB Connected"
);


app.listen(
5001,
()=>{

console.log(
"Server running on port 5001"
);

});

})
.catch(error=>{

console.log(
"Database Error:",
error
);

});