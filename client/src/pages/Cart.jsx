import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaShoppingBag,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";


function Cart() {

  const [cartData, setCartData] = useState(null);

  const navigate = useNavigate();


  // LOAD CART

  const fetchCart = async () => {

    try {

      const res = await api.get("/cart");

      setCartData(res.data);

    } catch(err){

      console.log(err);

    }

  };


  useEffect(()=>{

    fetchCart();

  },[]);



  // UPDATE QUANTITY

  const updateQty = async(productId, qty)=>{

    try{

      await api.put(`/cart/${productId}`,{
        quantity:qty,
      });


      fetchCart();


    }catch(err){

      alert(
        err.response?.data?.message ||
        "Update failed"
      );

    }

  };



  // REMOVE ITEM

  const removeItem = async(productId)=>{

    try{

      await api.delete(`/cart/${productId}`);

      fetchCart();


    }catch(err){

      alert("Remove failed");

    }

  };



  // CHECKOUT

  const checkout = async()=>{

    try{

      await api.post("/orders/checkout");


      alert(
        "Order placed successfully!"
      );


      setCartData(null);

      navigate("/orders");


    }catch(err){

      alert(
        err.response?.data?.message ||
        "Checkout failed"
      );

    }

  };



  if(!cartData){

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-amber-50
      ">

        <h2 className="
          text-2xl
          font-semibold
          text-gray-600
        ">
          Loading cart...
        </h2>

      </div>

    );

  }



  const items = cartData.cart.items;



  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-amber-50
      via-white
      to-orange-50
      py-16
    ">


      <div className="
        max-w-7xl
        mx-auto
        px-6
      ">


        {/* HEADER */}

        <div className="mb-10">

          <h1 className="
            text-4xl
            font-bold
            text-gray-900
          ">

            My Shopping Cart 🛒

          </h1>


          <p className="
            text-gray-600
            mt-3
          ">

            Review your handmade products before checkout.

          </p>

        </div>





        {items.length === 0 ? (

          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            text-center
            py-20
          ">


            <FaShoppingBag
              className="
                mx-auto
                text-6xl
                text-orange-300
              "
            />


            <h2 className="
              text-3xl
              font-bold
              mt-6
            ">

              Your Cart is Empty

            </h2>


            <button

              onClick={()=>navigate("/products")}

              className="
                mt-6
                bg-orange-500
                text-white
                px-8
                py-3
                rounded-xl
              "
            >

              Continue Shopping

            </button>


          </div>


        ) : (


          <div className="
            grid
            lg:grid-cols-3
            gap-10
          ">


            {/* ITEMS */}


            <div className="
              lg:col-span-2
              space-y-6
            ">


              {items.map((item)=>(


                <div

                key={item.product._id}

                className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  p-6
                  flex
                  flex-col
                  md:flex-row
                  items-center
                  justify-between
                  gap-6
                "

                >


                  {/* PRODUCT */}

                  <div className="
                    flex
                    items-center
                    gap-5
                  ">


                    <img
  src={item.product.images?.[0]}
  alt={item.product.title}
  className="w-20 h-20 rounded-xl object-cover"
/>


                    <div>


                      <h2 className="
                        text-xl
                        font-bold
                      ">

                        {item.product.title}

                      </h2>


                      <p className="
                        text-orange-500
                        font-bold
                        mt-2
                      ">

                        Rs. {Number(item.product.price).toFixed(2)}

                      </p>


                    </div>


                  </div>





                  {/* QUANTITY */}


                  <div className="
                    flex
                    items-center
                    gap-4
                  ">


                    <button

                    onClick={()=>updateQty(
                      item.product._id,
                      Math.max(1,item.quantity-1)
                    )}

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
                      font-bold
                      text-xl
                    ">

                      {item.quantity}

                    </span>



                    <button

                    onClick={()=>updateQty(
                      item.product._id,
                      item.quantity+1
                    )}

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





                  {/* REMOVE */}

                  <button

                  onClick={()=>removeItem(item.product._id)}

                  className="
                    text-red-500
                    hover:text-red-700
                    flex
                    gap-2
                    items-center
                  "
                  >

                    <FaTrash/>

                    Remove

                  </button>



                </div>


              ))}


            </div>





            {/* SUMMARY */}


            <div className="
              bg-white
              rounded-3xl
              shadow-xl
              p-8
              h-fit
            ">


              <h2 className="
                text-2xl
                font-bold
              ">

                Order Summary

              </h2>



              <div className="
                mt-6
                space-y-4
                text-gray-600
              ">


                <p>
                  Subtotal:
                  <span className="float-right font-semibold">
                    Rs. {cartData.subtotal}
                  </span>
                </p>


                <p>
                  Shipping:
                  <span className="float-right font-semibold">
                    Rs. {cartData.shipping}
                  </span>
                </p>


                <p>
                  Tax:
                  <span className="float-right font-semibold">
                    Rs. {cartData.tax}
                  </span>
                </p>


              </div>



              <hr className="my-6"/>



              <h3 className="
                text-3xl
                font-bold
                text-orange-500
              ">

                Rs. {cartData.total}

              </h3>




              <button

              onClick={checkout}

              className="
                mt-8
                w-full
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

                Checkout

              </button>





              <div className="
                mt-8
                space-y-3
                text-sm
                text-gray-600
              ">


                <p className="flex gap-3">
                  <FaTruck className="text-orange-500"/>
                  Fast delivery across Sri Lanka
                </p>


                <p className="flex gap-3">
                  <FaShieldAlt className="text-orange-500"/>
                  Secure checkout
                </p>


              </div>


            </div>


          </div>


        )}



      </div>


    </div>

  );

}


export default Cart;