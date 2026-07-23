import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  FaUserCircle,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaStore,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";


function Navbar() {


  const { user, logout } = useAuth();


  const [open,setOpen] = useState(false);
  const [mobile,setMobile] = useState(false);

  const [productsOpen, setProductsOpen] = useState(false);

const categories = [
  "Jewelry",
  "Art",
  "Pottery",
  "Clothing",
  "Home Decor",
  "Bags",
];

  return (

    <nav className="
      sticky
      top-0
      z-50
      bg-white/80
      backdrop-blur-xl
      shadow-sm
      border-b
    ">


      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-2
        flex
        items-center
        justify-between
      ">



        {/* LOGO */}


        <Link
        to="/"
        className="
          flex
          items-center
          gap-3
        "
        >
 <img
    src="/images/Handmade Lanka.png"
    alt="Handmade Market Logo"
    className="h-15 w-15 object-contain shadow-md rounded-full"
  />



          <div>

            <h1 className="
              text-2xl
              font-bold
              text-gray-900
            ">

              Handmade
              <span className="text-orange-500">
                 Lanka
              </span>

            </h1>


          </div>


        </Link>







        {/* DESKTOP LINKS */}


        <div className="
          hidden
          md:flex
          items-center
          gap-7
        ">


          <Link
          to="/"
          className="
            text-gray-700
            hover:text-orange-500
            transition
          "
          >

            Home

          </Link>

<div className="relative group">

  <button
    className="
      flex
      items-center
      gap-2
      text-gray-700
      hover:text-orange-500
      transition
    "
  >
    Products
    <FaChevronDown className="text-xs" />
  </button>

  <div
    className="
      absolute
      left-0
      mt-2
      w-56
      bg-white
      rounded-2xl
      shadow-xl
      border
      opacity-0
      invisible
      group-hover:opacity-100
      group-hover:visible
      transition
      duration-200
      z-50
    "
  >

    <Link
      to="/products"
      className="block px-5 py-3 hover:bg-orange-50 font-semibold"
    >
      All Products
    </Link>

    <hr />

    {categories.map((category) => (

      <Link
        key={category}
        to={`/products?category=${encodeURIComponent(category)}`}
        className="block px-5 py-3 hover:bg-orange-50"
      >
        {category}
      </Link>

    ))}

  </div>

</div>




          <Link
          to="/about"
          className="
            text-gray-700
            hover:text-orange-500
            transition
          "
          >

            About

          </Link>




          <Link
          to="/contact"
          className="
            text-gray-700
            hover:text-orange-500
            transition
          "
          >

            Contact

          </Link>






          {/* BUYER */}


          {user?.role === "buyer" && (

            <>


            <Link

            to="/cart"

            className="
              flex
              items-center
              gap-2
              text-gray-700
              hover:text-orange-500
            "

            >

              <FaShoppingCart/>

              Cart

            </Link>




            <Link

            to="/orders"

            className="
              text-gray-700
              hover:text-orange-500
            "

            >

              Orders

            </Link>


            </>

          )}







          {/* SELLER */}


          {user?.role === "seller" && (

            <>


              <Link
              to="/seller/dashboard"
              className="
                hover:text-orange-500
              "
              >

                Dashboard

              </Link>



              <Link
              to="/seller/orders"
              className="
                hover:text-orange-500
              "
              >

                Orders

              </Link>


            </>

          )}






          {/* ADMIN */}


          {user?.role === "admin" && (

            <Link

            to="/admin"

            className="
              hover:text-orange-500
            "

            >

              Admin

            </Link>

          )}



        </div>

        {/* AUTH */}



        <div className="
          hidden
          md:flex
          items-center
          gap-3
        ">


        {!user ? (

          <>


          <Link

          to="/login"

          className="
            px-5
            py-2
            rounded-xl
            border
            border-orange-500
            text-orange-500
            hover:bg-orange-500
            hover:text-white
            transition
          "

          >

            Login

          </Link>


          <Link

          to="/register"

          className="
            px-5
            py-2
            rounded-xl
            bg-gradient-to-r
            from-orange-500
            to-amber-500
            text-white
            hover:scale-105
            transition
          "

          >

            Register

          </Link>


          </>


        ):(


          <div className="relative">


            <button

            onClick={()=>setOpen(!open)}

            className="
              flex
              items-center
              gap-3
              bg-orange-50
              px-4
              py-2
              rounded-full
            "

            >


              <FaUserCircle
              className="
                text-3xl
                text-orange-500
              "
              />


              <span className="
                font-semibold
              ">

                {user.name}

              </span>


            </button>

            {open && (


              <div className="
                absolute
                right-0
                mt-3
                w-56
                bg-white
                rounded-2xl
                shadow-xl
                border
                overflow-hidden
              ">


                <div className="
                  p-4
                  bg-orange-50
                ">


                  <p className="
                    font-bold
                  ">

                    {user.name}

                  </p>


                  <p className="
                    text-sm
                    text-gray-500
                    capitalize
                  ">

                    {user.role}

                  </p>


                </div>





                <Link

                to="/profile"

                className="
                  block
                  px-5
                  py-3
                  hover:bg-gray-100
                "

                >

                  Profile

                </Link>




                <Link

                to="/settings"

                className="
                  block
                  px-5
                  py-3
                  hover:bg-gray-100
                "

                >

                  Settings

                </Link>





                <button

                onClick={()=>{
                  logout();
                  setOpen(false);
                }}

                className="
                  w-full
                  text-left
                  px-5
                  py-3
                  text-red-500
                  hover:bg-red-50
                "

                >

                  Logout

                </button>


              </div>


            )}


          </div>


        )}


        </div>







        {/* MOBILE BUTTON */}


        <button

        onClick={()=>setMobile(!mobile)}

        className="
          md:hidden
          text-2xl
        "

        >

          {
            mobile
            ?
            <FaTimes/>
            :
            <FaBars/>
          }


        </button>



      </div>

{
mobile && (

<div className="md:hidden bg-white border-t">

  <div className="flex flex-col">

    <Link
      to="/"
      onClick={()=>setMobile(false)}
      className="px-6 py-4 hover:bg-gray-100"
    >
      Home
    </Link>

    {/* PRODUCTS */}

    <button
      onClick={()=>setProductsOpen(!productsOpen)}
      className="
        flex
        justify-between
        items-center
        px-6
        py-4
        hover:bg-gray-100
      "
    >

      Products

      {
        productsOpen
        ?
        <FaChevronUp/>
        :
        <FaChevronDown/>
      }

    </button>

    {
      productsOpen && (

      <div className="bg-orange-50">

        <Link
          to="/products"
          onClick={()=>setMobile(false)}
          className="block px-10 py-3"
        >
          All Products
        </Link>

        {categories.map((category)=>(

          <Link
            key={category}
            to={`/products?category=${encodeURIComponent(category)}`}
            onClick={()=>setMobile(false)}
            className="block px-10 py-3 hover:bg-orange-100"
          >
            {category}
          </Link>

        ))}

      </div>

      )
    }

    <Link
      to="/about"
      onClick={()=>setMobile(false)}
      className="px-6 py-4 hover:bg-gray-100"
    >
      About
    </Link>

    <Link
      to="/contact"
      onClick={()=>setMobile(false)}
      className="px-6 py-4 hover:bg-gray-100"
    >
      Contact
    </Link>

    {/* Buyer */}

    {user?.role==="buyer" && (

      <>
        <Link
          to="/cart"
          onClick={()=>setMobile(false)}
          className="px-6 py-4 hover:bg-gray-100"
        >
          Cart
        </Link>

        <Link
          to="/orders"
          onClick={()=>setMobile(false)}
          className="px-6 py-4 hover:bg-gray-100"
        >
          Orders
        </Link>
      </>

    )}

    {/* Seller */}

    {user?.role==="seller" && (

      <>
        <Link
          to="/seller/dashboard"
          onClick={()=>setMobile(false)}
          className="px-6 py-4 hover:bg-gray-100"
        >
          Dashboard
        </Link>

        <Link
          to="/seller/orders"
          onClick={()=>setMobile(false)}
          className="px-6 py-4 hover:bg-gray-100"
        >
          Seller Orders
        </Link>
      </>

    )}

    {/* Admin */}

    {user?.role==="admin" && (

      <Link
        to="/admin"
        onClick={()=>setMobile(false)}
        className="px-6 py-4 hover:bg-gray-100"
      >
        Admin
      </Link>

    )}

    {!user ? (

      <>
        <Link
          to="/login"
          onClick={()=>setMobile(false)}
          className="px-6 py-4 hover:bg-gray-100"
        >
          Login
        </Link>

        <Link
          to="/register"
          onClick={()=>setMobile(false)}
          className="px-6 py-4 hover:bg-gray-100"
        >
          Register
        </Link>
      </>

    ) : (

      <button
        onClick={()=>{
          logout();
          setMobile(false);
        }}
        className="text-left px-6 py-4 text-red-500 hover:bg-red-50"
      >
        Logout
      </button>

    )}

  </div>

</div>

)}



    </nav>

  );

}


export default Navbar;