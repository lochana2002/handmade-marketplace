import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import api from "../services/api";


function AdminLogin(){


const navigate=useNavigate();

const {login}=useAuth();


const [form,setForm]=useState({

email:"",
password:""

});



const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:
e.target.value

});


};



const handleSubmit=async(e)=>{


e.preventDefault();



try{


const res =
await api.post(
"/auth/login",
form
);



console.log(res.data);



if(res.data.user.role !== "admin"){


alert(
"Admin account required"
);


return;


}



login(res.data);



navigate("/admin");



}catch(error){


console.log(
error.response?.data
);


alert(
error.response?.data?.message ||
"Login failed"
);


}


};




return (

<div className="min-h-screen flex items-center justify-center bg-gray-100">


<form
onSubmit={handleSubmit}
className="bg-white p-10 rounded-3xl shadow-xl w-[400px]"
>


<h1 className="text-3xl font-bold text-center mb-8">
Admin Login
</h1>


<input

name="email"

type="email"

placeholder="Email"

onChange={handleChange}

className="w-full border p-3 rounded-xl mb-4"

/>


<input

name="password"

type="password"

placeholder="Password"

onChange={handleChange}

className="w-full border p-3 rounded-xl mb-6"

/>


<button

className="w-full bg-black text-white py-3 rounded-xl"

>

Login

</button>


</form>


</div>

);


}


export default AdminLogin;