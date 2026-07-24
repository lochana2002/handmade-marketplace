const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const generateToken = (id)=>{

    return jwt.sign(
        {
            id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    );

};



// REGISTER

exports.register = async(req,res)=>{

try{

const {
name,
email,
password,
role
}=req.body;



const existingUser =
await User.findOne({email});


if(existingUser){

return res.status(400).json({

message:"User already exists"

});

}



const hashedPassword =
await bcrypt.hash(password,10);



const user =
await User.create({

name,

email,

password:hashedPassword,

role:role || "buyer"

});



res.status(201).json({

user:{
id:user._id,
name:user.name,
email:user.email,
role:user.role
},

token:
generateToken(user._id)

});



}catch(error){

res.status(500).json({

message:error.message

});

}

};

exports.login = async (req, res) => {

    try {

        console.log("BODY:", req.body);


        const { email, password } = req.body;


        const user = await User.findOne({ email });


        if (!user) {

            console.log("USER NOT FOUND");

            return res.status(401).json({
                message:"User not found"
            });

        }


        console.log("USER:", user.email);
        console.log("ROLE:", user.role);



        const match = await bcrypt.compare(
            password,
            user.password
        );


        console.log(
            "PASSWORD MATCH:",
            match
        );



        if(!match){

            return res.status(401).json({
                message:"Invalid password"
            });

        }



        const token = jwt.sign(
            {
                id:user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        );



        return res.json({

            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            },

            token

        });



    } catch(error){

        console.log(error);

        res.status(500).json({
            message:error.message
        });

    }

};