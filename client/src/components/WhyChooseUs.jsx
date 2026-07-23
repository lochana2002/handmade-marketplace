import {
  FaHandsHelping,
  FaLeaf,
  FaShippingFast,
  FaGem,
  FaShieldAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function WhyChooseUs() {

  const features = [
    {
      icon: <FaHandsHelping />,
      title: "Made by Local Artisans",
      description:
        "Each creation comes from talented Sri Lankan makers who put their skills, stories, and passion into every piece.",
    },
    {
      icon: <FaGem />,
      title: "One-of-a-Kind Creations",
      description:
        "Discover unique handmade products designed with traditional techniques and personal creativity.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Supporting Local Communities",
      description:
        "Every purchase directly helps independent creators grow their craft and businesses.",
    },
    {
      icon: <FaLeaf />,
      title: "Thoughtful & Sustainable",
      description:
        "We promote handmade alternatives that respect traditional craftsmanship and the environment.",
    },
    {
      icon: <FaShippingFast />,
      title: "Carefully Delivered",
      description:
        "Your handmade treasures are packed safely and delivered with care across Sri Lanka.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Trusted Shopping",
      description:
        "Shop confidently with verified sellers and a secure marketplace experience.",
    },
  ];


  return (

    <section className="
      py-24
      bg-orange-50/40
    ">


      <div className="
        max-w-6xl
        mx-auto
        px-6
      ">


        {/* Heading */}

        <div className="
          max-w-3xl
          mb-16
        ">

          <p className="
            text-orange-500
            uppercase
            tracking-[3px]
            text-sm
            font-semibold
          ">
            Why Handmade Market
          </p>


          <h2 className="
            mt-4
            text-4xl
            md:text-5xl
            font-bold
            text-gray-900
            leading-tight
          ">

            More than shopping,
            <span className="
              block
              text-orange-500
            ">
              it's supporting creativity.
            </span>

          </h2>


          <p className="
            mt-6
            text-gray-600
            text-lg
            leading-8
          ">
            We bring together passionate Sri Lankan artisans and customers
            who appreciate authentic handmade work, traditional skills,
            and meaningful products.
          </p>

        </div>





        {/* Features */}

        <div className="
          grid
          md:grid-cols-2
          gap-x-12
          gap-y-10
        ">


          {
            features.map((item,index)=>(

              <div
                key={index}
                className="
                  flex
                  gap-6
                  border-b
                  border-orange-100
                  pb-8
                "
              >


                <div className="
                  flex-shrink-0
                  w-14
                  h-14
                  rounded-full
                  bg-orange-500
                  text-white
                  flex
                  items-center
                  justify-center
                  text-xl
                ">

                  {item.icon}

                </div>



                <div>

                  <h3 className="
                    text-xl
                    font-semibold
                    text-gray-900
                  ">
                    {item.title}
                  </h3>


                  <p className="
                    mt-3
                    text-gray-600
                    leading-7
                  ">
                    {item.description}
                  </p>

                </div>


              </div>


            ))
          }


        </div>


      </div>


    </section>

  );
}

export default WhyChooseUs;