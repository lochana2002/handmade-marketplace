import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingBag,
  FaTruck,
  FaShieldAlt,
  FaCreditCard,
} from "react-icons/fa";


function Checkout() {

  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  // FETCH CART

  const fetchCart = async () => {

    try {

      const res = await api.get("/cart", {
        headers:{
          Authorization:
          `Bearer ${localStorage.getItem("token")}`,
        },
      });


      setCartData(res.data);


    } catch(err){

      console.log(err);

    }

  };



  useEffect(()=>{

    fetchCart();

  },[]);





  // PLACE ORDER
const placeOrder = async () => {
  try {
    setLoading(true);

    await api.post("/orders/checkout");

    alert("Order placed successfully!");

    navigate("/orders");
  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Checkout failed"
    );
  } finally {
    setLoading(false);
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
          Loading checkout...
        </h2>

      </div>

    );

  }




  const {
    cart,
    subtotal,
    shipping,
    tax,
    total
  } = cartData;





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
        max-w-6xl
        mx-auto
        px-6
      ">


        {/* HEADER */}

        <div className="mb-10">


          <span className="
            bg-orange-100
            text-orange-600
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
          ">

            Secure Checkout

          </span>



          <h1 className="
            text-4xl
            font-bold
            text-gray-900
            mt-5
          ">

            Complete Your Order 🛒

          </h1>



          <p className="
            text-gray-600
            mt-3
          ">

            Review your handmade products and place your order securely.

          </p>


        </div>





        <div className="
          grid
          lg:grid-cols-3
          gap-10
        ">



          {/* PRODUCTS */}

          <div className="
            lg:col-span-2
            bg-white
            rounded-3xl
            shadow-lg
            p-8
          ">


            <h2 className="
              text-2xl
              font-bold
              flex
              items-center
              gap-3
            ">

              <FaShoppingBag className="text-orange-500"/>

              Order Summary

            </h2>




            <div className="
              mt-6
              space-y-5
            ">


              {cart?.items?.map((item)=>(


                <div
                key={item.product._id}
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  pb-5
                "
                >


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


                      <h3 className="
                        font-bold
                      ">

                        {item.product.title}

                      </h3>


                      <p className="
                        text-gray-500
                      ">

                        Quantity: {item.quantity}

                      </p>


                    </div>


                  </div>




                  <p className="
                    font-bold
                    text-orange-500
                  ">

                    Rs. {(item.product.price * item.quantity).toFixed(2)}

                  </p>



                </div>


              ))}



            </div>


          </div>






          {/* PAYMENT SUMMARY */}

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

              Payment Details

            </h2>



            <div className="
              mt-6
              space-y-4
              text-gray-600
            ">


              <p className="flex justify-between">

                Subtotal

                <span className="font-semibold">
                  Rs. {subtotal.toFixed(2)}
                </span>

              </p>



              <p className="flex justify-between">

                Shipping

                <span className="font-semibold">
                  Rs. {shipping.toFixed(2)}
                </span>

              </p>




              <p className="flex justify-between">

                Tax

                <span className="font-semibold">
                  Rs. {tax.toFixed(2)}
                </span>

              </p>


            </div>




            <hr className="my-6"/>



            <div className="
              flex
              justify-between
              text-2xl
              font-bold
            ">


              <span>
                Total
              </span>


              <span className="
                text-orange-500
              ">

                Rs. {total.toFixed(2)}

              </span>


            </div>





            <button

              onClick={placeOrder}

              disabled={loading}

              className="
                mt-8
                w-full
                bg-gradient-to-r
                from-orange-500
                to-amber-500
                text-white
                py-4
                rounded-xl
                font-bold
                text-lg
                hover:scale-105
                transition
                disabled:opacity-50
              "

            >

              {loading
              ? "Processing Order..."
              : "Place Order"}

            </button>





            {/* INFO */}

            <div className="
              mt-8
              space-y-4
              text-sm
              text-gray-600
            ">


              <p className="flex gap-3">

                <FaTruck className="text-orange-500 text-lg"/>

                Fast delivery across Sri Lanka

              </p>



              <p className="flex gap-3">

                <FaShieldAlt className="text-orange-500 text-lg"/>

                Secure transaction

              </p>




              <p className="flex gap-3">

                <FaCreditCard className="text-orange-500 text-lg"/>

                Safe payment processing

              </p>



            </div>



          </div>


        </div>


      </div>


    </div>

  );

}


export default Checkout;