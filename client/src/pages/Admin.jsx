import {useEffect,useState} from "react";
import api from "../services/api";


function Admin(){


const [stats,setStats]=useState({});


useEffect(()=>{

loadStats();

},[]);



const loadStats=async()=>{

try{

const res =
await api.get("/admin/stats");


setStats(res.data);


}catch(error){

console.log(error);

}

};



return(

<div>


<h1 className="text-3xl font-bold mb-8">
Admin Dashboard
</h1>



<div className="grid grid-cols-3 gap-6">


<Card 
title="Total Users"
value={stats.totalUsers}
/>


<Card
title="Buyers"
value={stats.buyers}
/>


<Card
title="Sellers"
value={stats.sellers}
/>


<Card
title="Products"
value={stats.products}
/>


<Card
title="Orders"
value={stats.orders}
/>


<Card
title="Revenue"
value={`Rs.${stats.revenue}`}
/>



</div>


</div>

);

}



function Card({title,value}){

return(

<div className="
bg-white
p-6
rounded-2xl
shadow
">

<h3 className="text-gray-500">
{title}
</h3>

<p className="text-3xl font-bold">
{value || 0}
</p>


</div>

)

}


export default Admin;