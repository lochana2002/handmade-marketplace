import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

function FAQ() {

  const [open, setOpen] = useState(null);

  const faqs = [
    {
      question: "How can I place an order?",
      answer:
        "Choose your favorite handmade item, add it to your cart, and complete the checkout process. You will receive an order confirmation after placing your order.",
    },
    {
      question: "Who creates the products?",
      answer:
        "Our products are created by independent local artisans who share their handmade skills and creativity with our community.",
    },
    {
      question: "How can I sell my handmade products?",
      answer:
        "Register as a seller, create your artisan profile, and upload your products. After approval, your items will be available in our marketplace.",
    },
    {
      question: "Do you offer delivery?",
      answer:
        "Yes. We deliver handmade products across Sri Lanka. Delivery time depends on your location and product type.",
    },
    {
      question: "Can I request a return?",
      answer:
        "Returns are accepted for damaged or incorrect items. Please contact us with your order details for assistance.",
    },
  ];


  return (

    <section className="
      py-20
      bg-white
    ">

      <div className="
        max-w-6xl
        mx-auto
        px-6
      ">


        <div className="
          grid
          md:grid-cols-2
          gap-12
          items-start
        ">


          {/* LEFT SIDE */}

          <div>

            <p className="
              text-orange-500
              uppercase
              tracking-widest
              text-sm
              font-semibold
            ">
              Help Center
            </p>


            <h2 className="
              mt-4
              text-5xl
              font-bold
              text-gray-900
              leading-tight
            ">

              Questions about our
              <span className="
                block
                text-orange-500
              ">
                handmade marketplace?
              </span>

            </h2>


            <p className="
              mt-6
              text-gray-600
              leading-7
            ">

              Find answers about ordering,
              selling, payments, and delivery.
              If you need more help, our team
              is always ready to assist you.

            </p>


            <div className="
              mt-8
              border-l-4
              border-orange-400
              pl-5
            ">

              <p className="
                text-gray-700
                italic
              ">
                "Every handmade product has a story."
              </p>

            </div>


          </div>





          {/* RIGHT SIDE */}

          <div className="
            divide-y
            divide-gray-200
            border-t
            border-gray-200
          ">


            {
              faqs.map((faq,index)=>(

                <div
                  key={index}
                  className="
                    py-6
                  "
                >

                  <button

                    onClick={() =>
                      setOpen(
                        open === index
                        ? null
                        : index
                      )
                    }

                    className="
                      w-full
                      flex
                      justify-between
                      items-center
                      text-left
                    "
                  >

                    <span className="
                      text-lg
                      font-medium
                      text-gray-900
                      pr-5
                    ">
                      {faq.question}
                    </span>


                    <span className="
                      text-orange-500
                    ">

                      {
                        open === index
                        ?
                        <FaMinus/>
                        :
                        <FaPlus/>
                      }

                    </span>


                  </button>



                  <div
                    className={`
                      overflow-hidden
                      transition-all
                      duration-300
                      ${
                        open === index
                        ?
                        "max-h-40 mt-4"
                        :
                        "max-h-0"
                      }
                    `}
                  >

                    <p className="
                      text-gray-600
                      leading-7
                      pr-8
                    ">

                      {faq.answer}

                    </p>

                  </div>


                </div>

              ))
            }


          </div>


        </div>


      </div>


    </section>

  );
}

export default FAQ;