import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  FaStar,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaCheckCircle,
} from "react-icons/fa";

import api from "../services/api";

import ProductReviews from "../components/ProductReviews";
import ReviewForm from "../components/ReviewForm";
import { getReviews } from "../services/reviewApi";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);


  // Fetch product
  const fetchProduct = async () => {

    try {

      const res = await api.get(`/products/${id}`);

      setProduct(res.data);

    } catch(error){

      console.log(
        "Product fetch error:",
        error
      );

    }

  };
  const [reviews, setReviews] = useState([]);


const loadReviews = async () => {

  try {

    const {data} = await getReviews(id);

    setReviews(data);

  } catch(error){

    console.log(
      "Review error:",
      error
    );

  }

};



 useEffect(() => {

  fetchProduct();
  loadReviews();

}, [id]);

const [selectedImage, setSelectedImage] = useState(0);

  const addToCart = async () => {

    try {

      await api.post("/cart",{
        product:id,
        quantity:qty
      });


      alert("Added to cart");

      navigate("/cart");


    } catch(error){

      alert(
        error.response?.data?.message ||
        "Failed to add product"
      );

    }

  };



  // IMPORTANT
  if(!product){

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
      ">

        <h2 className="
          text-2xl
          font-bold
          text-gray-600
        ">
          Loading product...
        </h2>


      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-16">

      <div className="max-w-7xl mx-auto px-6">

        <div className="
          grid
          lg:grid-cols-2
          gap-12
          bg-white
          rounded-3xl
          shadow-xl
          p-8
        ">


          {/* IMAGE SECTION */}

          <div className="relative">

        <div className="relative">

  <img
    src={
      product.images?.[selectedImage] ||
      "https://via.placeholder.com/600x600"
    }
    alt={product.title}
    className="
      w-full
      h-[500px]
      object-cover
      rounded-3xl
    "
  />

  <span
    className="
      absolute
      top-5
      left-5
      bg-orange-500
      text-white
      px-4
      py-2
      rounded-full
      text-sm
      font-semibold
    "
  >
    Handmade
  </span>

  {/* Thumbnails */}

  <div className="flex gap-3 mt-4">

    {product.images?.map((img, index) => (

      <img
        key={index}
        src={img}
        alt={`thumb-${index}`}
        onClick={() => setSelectedImage(index)}
        className={`
          w-20
          h-20
          object-cover
          rounded-xl
          cursor-pointer
          border-2
          ${
            selectedImage === index
              ? "border-orange-500"
              : "border-gray-200"
          }
        `}
      />

    ))}

  </div>

</div>


            <span
              className="
                absolute
                top-5
                left-5
                bg-orange-500
                text-white
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
              "
            >
              Handmade
            </span>


          </div>



          {/* DETAILS */}

          <div className="flex flex-col justify-center">


            {/* Category */}

            {product.category && (

              <span className="
                w-fit
                bg-orange-100
                text-orange-600
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
              ">
                {product.category}
              </span>

            )}



            <h1 className="
              text-4xl
              font-bold
              text-gray-900
              mt-5
            ">
              {product.title}
            </h1>



            <p className="
              text-gray-600
              mt-5
              leading-8
            ">
              {product.description}
            </p>



            {/* Rating */}

            <div className="
              flex
              items-center
              gap-2
              mt-6
            ">

              <div className="
                flex
                gap-1
                text-yellow-400
              ">

                {[1,2,3,4,5].map((star)=>(
                  <FaStar key={star}/>
                ))}

              </div>

              <span className="text-gray-600">
                {product.rating || "5.0"}
              </span>

            </div>



            {/* PRICE */}

            <div className="mt-6">

              <p className="text-gray-400">
                Price
              </p>

              <h2 className="
                text-4xl
                font-bold
                text-orange-500
              ">
                Rs.{" "}
                {Number(product.price).toLocaleString(
                  "en-LK",
                  {
                    minimumFractionDigits:2,
                    maximumFractionDigits:2
                  }
                )}
              </h2>

            </div>



            {/* FEATURES */}

            <div className="mt-6 space-y-3">

              <div className="flex gap-3 items-center text-gray-600">
                <FaCheckCircle className="text-orange-500"/>
                Authentic handmade product
              </div>


              <div className="flex gap-3 items-center text-gray-600">
                <FaCheckCircle className="text-orange-500"/>
                Support local artisans
              </div>


              <div className="flex gap-3 items-center text-gray-600">
                <FaCheckCircle className="text-orange-500"/>
                Secure shopping experience
              </div>


            </div>



            {/* QUANTITY */}

            <div className="mt-8">


              <p className="font-semibold mb-3">
                Quantity
              </p>


              <div className="
                flex
                items-center
                gap-5
              ">


                <button
                  onClick={() =>
                    setQty((q)=>Math.max(1,q-1))
                  }
                  className="
                    w-10
                    h-10
                    rounded-full
                    bg-gray-100
                    hover:bg-orange-500
                    hover:text-white
                  "
                >
                  <FaMinus className="mx-auto"/>
                </button>



                <span className="
                  text-xl
                  font-bold
                ">
                  {qty}
                </span>



                <button
                  onClick={() =>
                    setQty(qty+1)
                  }
                  className="
                    w-10
                    h-10
                    rounded-full
                    bg-gray-100
                    hover:bg-orange-500
                    hover:text-white
                  "
                >
                  <FaPlus className="mx-auto"/>
                </button>


              </div>

            </div>



            {/* CART BUTTON */}

            <button
              onClick={addToCart}
              className="
                mt-8
                flex
                items-center
                justify-center
                gap-3
                bg-gradient-to-r
                from-orange-500
                to-amber-500
                text-white
                py-4
                rounded-xl
                font-semibold
                text-lg
                hover:scale-105
                transition
              "
            >

              <FaShoppingCart/>

              Add To Cart

            </button>
<ProductReviews productId={product._id} />

<ReviewForm
    productId={product._id}
    onReviewAdded={loadReviews}
/>

          </div>

        </div>

      </div>



</div>
    

  );
}

export default ProductDetails;