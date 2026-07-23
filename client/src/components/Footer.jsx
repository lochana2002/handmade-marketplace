import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import { Link } from "react-router-dom";


function Footer() {

  return (

    <footer className="
      bg-gray-950
      text-white
      pt-16
    ">


      <div className="
        max-w-7xl
        mx-auto
        px-6
        pb-12
        grid
        md:grid-cols-2
        lg:grid-cols-4
        gap-10
      ">



        {/* BRAND */}

        <div>


          <h2 className="
            text-3xl
            font-bold
            text-orange-400
          ">

            Handmade Lanka

          </h2>



          <p className="
            text-gray-400
            mt-5
            leading-7
          ">

            Discover unique handmade creations
            from talented Sri Lankan artisans.
            Support creativity, tradition, and
            local craftsmanship.

          </p>



          <div className="
            flex
            gap-4
            mt-6
          ">


            <a
            href="#"
            className="
              w-11
              h-11
              rounded-full
              bg-gray-800
              flex
              items-center
              justify-center
              hover:bg-orange-500
              transition
            "
            >

              <FaFacebookF/>

            </a>



            <a
            href="#"
            className="
              w-11
              h-11
              rounded-full
              bg-gray-800
              flex
              items-center
              justify-center
              hover:bg-orange-500
              transition
            "
            >

              <FaInstagram/>

            </a>




            <a
            href="#"
            className="
              w-11
              h-11
              rounded-full
              bg-gray-800
              flex
              items-center
              justify-center
              hover:bg-orange-500
              transition
            "
            >

              <FaLinkedinIn/>

            </a>


          </div>


        </div>







        {/* QUICK LINKS */}


        <div>


          <h3 className="
            text-xl
            font-bold
            mb-5
          ">

            Quick Links

          </h3>



          <ul className="
            space-y-3
            text-gray-400
          ">


            <li>

              <Link
              to="/"
              className="
                hover:text-orange-400
                transition
              "
              >
                Home
              </Link>

            </li>



            <li>

              <Link
              to="/products"
              className="
                hover:text-orange-400
                transition
              "
              >
                Products
              </Link>

            </li>




            <li>

              <Link
              to="/about"
              className="
                hover:text-orange-400
                transition
              "
              >
                About Us
              </Link>

            </li>

            <li>

              <Link
              to="/contact"
              className="
                hover:text-orange-400
                transition
              "
              >
                Contact
              </Link>
            </li>
          </ul>

        </div>

        {/* CUSTOMER */}


        <div>
          <h3 className="
            text-xl
            font-bold
            mb-5
          ">

            Customer Support

          </h3>

          <ul className="
            space-y-3
            text-gray-400
          ">


            <li className="hover:text-orange-400">
              <link to="/pages/Contact/#faq"></link>
              FAQ
            </li>


            <li className="hover:text-orange-400">
              Shipping Policy
            </li>


            <li className="hover:text-orange-400">
              Return Policy
            </li>


            <li className="hover:text-orange-400">
              Become a Seller
            </li>


          </ul>


        </div>







        {/* CONTACT */}


        <div>


          <h3 className="
            text-xl
            font-bold
            mb-5
          ">

            Contact Us

          </h3>



          <div className="
            space-y-4
            text-gray-400
          ">


            <p className="
              flex
              gap-3
              items-center
            ">

              <FaMapMarkerAlt className="text-orange-400"/>

              Colombo, Sri Lanka

            </p>




            <p className="
              flex
              gap-3
              items-center
            ">

              <FaPhoneAlt className="text-orange-400"/>

              +94 77 123 4567

            </p>




            <p className="
              flex
              gap-3
              items-center
            ">

              <FaEnvelope className="text-orange-400"/>

              support@handmadelanka.com

            </p>


          </div>


        </div>




      </div>






      {/* BOTTOM */}

      <div className="
        border-t
        border-gray-800
        py-5
        text-center
        text-gray-500
        text-sm
      ">


        © 2026 
        <span className="text-orange-400 font-semibold">
           Handmade Lanka
        </span>
        .  All rights reserved.


      </div>



    </footer>

  );

}


export default Footer;