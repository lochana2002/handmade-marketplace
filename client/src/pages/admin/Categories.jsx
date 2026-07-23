import { useEffect, useState } from "react";
import api from "../../services/api";


function Categories(){

const [categories,setCategories] = useState([]);



useEffect(()=>{

    loadCategories();

},[]);



const loadCategories = async()=>{

    try{

        const res = await api.get("/admin/categories");

        console.log(res.data);

        setCategories(res.data);


    }catch(error){

        console.log(error);

    }

};



return (

<div>


<h1 className="
text-3xl
font-bold
mb-8
">

Categories Management

</h1>



<div className="
grid
grid-cols-3
gap-6
">


{
categories.map((category)=>(


<div
key={category._id}
className="
bg-white
rounded-2xl
shadow
p-5
">


<img

src={
category.image ||
"https://via.placeholder.com/300"
}

alt={category.name}

className="
w-full
h-40
object-cover
rounded-xl
"

/>



<h2 className="
text-xl
font-bold
mt-4
">

{category.name}

</h2>



<button

className="
mt-4
text-red-600
hover:underline
"

>

Delete

</button>



</div>


))
}



</div>



{
categories.length===0 &&

<p className="
text-gray-500
mt-5
">

No categories found

</p>

}


</div>

);

}


export default Categories;