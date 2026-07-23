function DashboardCards({stats}){


const cards=[

{
title:"Total Users",
value:stats.users
},

{
title:"Total Products",
value:stats.products
},

{
title:"Total Orders",
value:stats.orders
},

{
title:"Revenue",
value:`$ ${stats.revenue}`
}

];



return (

<div className="
grid
grid-cols-1
md:grid-cols-4
gap-6
">


{

cards.map((card,index)=>(


<div

key={index}

className="
bg-white
rounded-xl
shadow
p-6
"

>


<h3 className="text-gray-500">
{card.title}
</h3>


<h2 className="
text-3xl
font-bold
mt-3
">

{card.value}

</h2>


</div>


))


}


</div>

);


}


export default DashboardCards;