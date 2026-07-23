import { FaQuoteLeft, FaStar } from "react-icons/fa";

function Testimonials() {

  const testimonials = [
    {
      name: "Nimal Perera",
      role: "Happy Customer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      message:
        "The wooden decoration I purchased was beautifully crafted. You can really feel the effort and passion behind the handmade work.",
    },
    {
      name: "Amaya Fernando",
      role: "Customer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      message:
        "I love finding unique products that are different from regular stores. Handmade Market makes supporting local creators easy.",
    },
    {
      name: "Kasun Crafts",
      role: "Local Artisan",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      message:
        "This marketplace helped my small craft business reach customers who truly appreciate handmade products.",
    },
  ];


  return (

    <section className="
      py-24
      bg-white
    ">


      <div className="
        max-w-6xl
        mx-auto
        px-6
      ">


        {/* HEADER */}

        <div className="
          text-center
          mb-16
        ">


          <p className="
            text-orange-500
            uppercase
            tracking-[3px]
            text-sm
            font-semibold
          ">
            Customer Stories
          </p>


          <h2 className="
            mt-4
            text-4xl
            md:text-5xl
            font-bold
            text-gray-900
          ">

            Loved by customers,
            <span className="
              block
              text-orange-500
            ">
              trusted by artisans
            </span>

          </h2>


          <p className="
            mt-5
            max-w-2xl
            mx-auto
            text-gray-600
          ">
            Real experiences from people who buy,
            create, and celebrate handmade products.
          </p>


        </div>





        {/* TESTIMONIALS */}

        <div className="
          grid
          md:grid-cols-3
          gap-10
        ">


          {
            testimonials.map((item,index)=>(

              <div
                key={index}
                className="
                  relative
                  bg-orange-50/60
                  p-8
                  rounded-2xl
                "
              >


                {/* Quote */}

                <FaQuoteLeft
                  className="
                    text-4xl
                    text-orange-300
                    mb-6
                  "
                />


                <p className="
                  text-gray-700
                  leading-8
                  italic
                ">
                  "{item.message}"
                </p>




                {/* Rating */}

                <div className="
                  flex
                  gap-1
                  mt-6
                  text-orange-400
                ">

                  {
                    [...Array(5)].map((_,i)=>(

                      <FaStar key={i}/>

                    ))
                  }

                </div>





                {/* Person */}

                <div className="
                  mt-8
                  flex
                  items-center
                  gap-4
                ">


                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-14
                      h-14
                      rounded-full
                      object-cover
                    "
                  />


                  <div>

                    <h4 className="
                      font-semibold
                      text-gray-900
                    ">
                      {item.name}
                    </h4>


                    <p className="
                      text-sm
                      text-orange-500
                    ">
                      {item.role}
                    </p>


                  </div>


                </div>


              </div>

            ))
          }


        </div>


      </div>


    </section>

  );
}

export default Testimonials;