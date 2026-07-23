import { Link } from "react-router-dom";
import {
  FaStar,
  FaHeart,
  FaShoppingBag,
} from "react-icons/fa";
import { useEffect, useState } from "react";

import api from "../services/api";

function ProductCard({ product }) {


  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];


  const [current,setCurrent] = useState(0);



  useEffect(()=>{


    if(images.length <= 1) return;


    const interval = setInterval(()=>{


      setCurrent((prev)=>
        (prev + 1) % images.length
      );


    },3000);



    return ()=>clearInterval(interval);


  },[images.length]);

const addToCart = async () => {
  try {
    await api.post("/cart", {
      product: product._id,
      quantity: 1,
    });

    alert("Added to cart!");
  } catch (err) {
    alert(err.response?.data?.message || "Failed");
  }
};

return (

<div
className="
group
bg-white
rounded-3xl
shadow-lg
overflow-hidden
hover:-translate-y-2
transition
duration-300
"
>

 {/* IMAGE SECTION */}

      <div className="
        relative
        overflow-hidden
        group
      ">


        <img
          src={images[current]}
          alt={product.title}
          className="
            w-full
            h-64
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />


        {/* HOVER VIEW DETAILS */}

        <div
          className="
            absolute
            inset-0
            bg-black/40
            flex
            items-center
            justify-center
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-300
          "
        >

          
{/* BUTTON */}

<Link

to={`/products/${product._id}`}

className="
mt-6
flex
items-center
justify-center
w-50
relative
overflow-hidden
bg-orange-500
text-white
py-3
rounded-xl
font-semibold
shadow-lg
transition-all
duration-300
hover:bg-orange-400
hover:-translate-y-1
hover:shadow-orange-300/50
hover:shadow-xl
"

>

<FaShoppingBag/>

View Details

</Link>

        </div>



        {/* NEW BADGE */}

        <span
          className="
            absolute
            top-4
            left-4
            bg-orange-500
            text-white
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
          "
        >
          NEW
        </span>



        {/* WISHLIST */}

        <button
          className="
            absolute
            top-4
            right-4
            w-10
            h-10
            rounded-full
            bg-white/90
            flex
            items-center
            justify-center
            shadow-md
            hover:bg-red-500
            hover:text-white
            transition
          "
        >


<FaHeart/>

</button>




{/* IMAGE DOTS */}

{
images.length > 1 && (

<div
className="
absolute
bottom-4
left-0
right-0
flex
justify-center
gap-2
"
>


{
images.map((_,index)=>(


<button

key={index}

onClick={()=>setCurrent(index)}

className={`
w-3
h-3
rounded-full

${
current===index
?
"bg-orange-500"
:
"bg-white"
}

`}


/>


))
}


</div>

)

}



</div>






{/* CONTENT */}

<div className="p-6">



{/* CATEGORY */}

{
product.category && (

<span
className="
inline-block
text-xs
font-medium
text-orange-600
bg-orange-100
px-3
py-1
rounded-full
mb-3
"
>

{product.category}

</span>

)

}




{/* TITLE */}

<h2
className="
text-xl
font-bold
text-gray-800
line-clamp-1
"
>

{product.title}

</h2>




{/* DESCRIPTION */}

<p
className="
text-gray-500
mt-3
line-clamp-2
leading-6
"
>

{product.description}

</p>





{/* RATING */}

<div
className="
flex
items-center
mt-5
"
>

<div
className="
flex
items-center
gap-1
text-yellow-400
"
>


{
[1,2,3,4,5].map((star)=>(

<FaStar key={star}/>

))

}


<span
className="
ml-2
text-gray-600
text-sm
"
>

{product.rating || "5.0"}

</span>


</div>


</div>






{/* PRICE */}

<div className="mt-6">

<h3
className="
text-3xl
font-bold
text-orange-500
"
>

Rs. {product.price}

</h3>
</div>


<button
  onClick={addToCart}
 className="
mt-3
flex
items-center
justify-center
gap-2
w-full
relative
overflow-hidden
bg-orange-500
text-white
py-3
rounded-xl
font-semibold
shadow-lg
transition-all
duration-300
hover:bg-orange-600
hover:-translate-y-1
hover:shadow-orange-300/50
hover:shadow-xl
"
>
  Add to Cart
</button>

</div>


</div>

);

}


export default ProductCard;