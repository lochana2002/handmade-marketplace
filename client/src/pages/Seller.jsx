import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  Star,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import api from "../services/api";


function Seller(){

const navigate = useNavigate();


const [stats,setStats]=useState({});
const [products,setProducts]=useState([]);



const loadData=async()=>{

try{

const statsRes =
await api.get("/seller/stats");

setStats(statsRes.data);



const productRes =
await api.get("/seller/products");

setProducts(productRes.data);



}catch(err){

console.log(err);

}

};



useEffect(()=>{

loadData();

},[]);




const deleteProduct=async(id)=>{

if(!confirm("Delete product?")) return;


await api.delete(`/products/${id}`);

loadData();

};




return (

<div className="
flex
min-h-screen
bg-gray-100
">


{/* SIDEBAR */}

<aside className="
w-72
bg-gray-900
text-white
p-6
hidden
md:block
">


<h1 className="
text-3xl
font-bold
mb-10
">

ArtisanHub

</h1>



<nav className="space-y-5">


<div className="flex gap-3 items-center">
<LayoutDashboard/>
Dashboard
</div>


<div className="flex gap-3 items-center">
<Package/>
Products
</div>


<div className="flex gap-3 items-center">
<ShoppingCart/>
Orders
</div>


<div className="flex gap-3 items-center">
<Star/>
Reviews
</div>


<div className="flex gap-3 items-center">
<Users/>
Customers
</div>


</nav>


</aside>





{/* MAIN */}

<main className="
flex-1
p-8
">


{/* HEADER */}

<div className="
flex
justify-between
items-center
mb-10
">


<div>

<h1 className="
text-4xl
font-bold
">

Hello... 👋

</h1>


<p className="text-gray-500 mt-2">

Manage your handmade business

</p>

</div>


<button
onClick={()=>navigate("/seller/add-product")}
className="
bg-orange-500
text-white
px-6
py-3
rounded-xl
flex
gap-2
items-center
">

<Plus/>

Add Product

</button>


</div>





{/* STATS */}


<div className="
grid
md:grid-cols-4
gap-6
mb-10
">


<Card
icon={<DollarSign/>}
title="Revenue"
value={`Rs.${stats.totalRevenue || 0}`}
/>


<Card
icon={<ShoppingCart/>}
title="Orders"
value={stats.totalSales || 0}
/>


<Card
icon={<Package/>}
title="Products"
value={products.length}
/>


<Card
icon={<Users/>}
title="Customers"
value="120"
/>



</div>





{/* PRODUCTS */}


<div className="
bg-white
rounded-3xl
shadow
p-6
">


<div className="
flex
justify-between
mb-6
">


<h2 className="
text-2xl
font-bold
">

My Products

</h2>


</div>




<table className="
w-full
">


<thead>

<tr className="
border-b
text-left
">

<th>
Image
</th>

<th>
Product
</th>

<th>
Price
</th>

<th>
Stock
</th>

<th>
Action
</th>

</tr>


</thead>



<tbody>


{
products.map(product=>(

<tr
key={product._id}
className="
border-b
">

<td>

<img
src={product.image}
className="
w-16
h-16
rounded-xl
object-cover
"
/>

</td>


<td>

<p className="font-semibold">
{product.title}
</p>


<span className="text-gray-500">
{product.category}
</span>

</td>



<td>

Rs.{product.price}

</td>



<td>

{product.stock}

</td>



<td>


<div className="flex gap-3">


<button

onClick={()=>
navigate(
`/seller/edit-product/${product._id}`
)
}

className="
bg-blue-500
text-white
p-2
rounded-lg
">

<Edit size={18}/>

</button>



<button

onClick={()=>
deleteProduct(product._id)
}

className="
bg-red-500
text-white
p-2
rounded-lg
">

<Trash2 size={18}/>

</button>


</div>


</td>


</tr>


))

}


</tbody>


</table>


</div>



</main>


</div>


)

}



function Card({icon,title,value}){

return (

<div className="
bg-white
rounded-3xl
shadow
p-6
">


<div className="
bg-orange-100
w-12
h-12
rounded-xl
flex
items-center
justify-center
text-orange-600
">

{icon}

</div>


<p className="
text-gray-500
mt-5
">

{title}

</p>


<h2 className="
text-3xl
font-bold
mt-2
">

{value}

</h2>


</div>

)

}



export default Seller;