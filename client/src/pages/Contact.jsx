import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";

import FAQ from "../components/FAQ";
import AnimatedSection from "../components/animations/AnimatedSection";


function Contact() {


  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Our Location",
      description:
        "Handmade Lanka, Colombo, Sri Lanka",
    },
    {
      icon: <FaPhoneAlt />,
      title: "Phone Number",
      description:
        "+94 71 234 5678",
    },
    {
      icon: <FaEnvelope />,
      title: "Email Address",
      description:
        "support@handmadelanka.com",
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      description:
        "Mon - Fri : 8.30 AM - 5.30 PM",
    },
  ];



  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-amber-50
      via-white
      to-orange-50
    ">


      {/* CONTACT */}



<section
  className="relative py-15  bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/images/contact.webp')",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/30"></div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">

      <h2 className="text-4xl md:text-5xl font-bold text-white">
        Get In
        <span className="text-orange-400"> Touch</span>
      </h2>

      <p className="mt-5 text-lg text-gray-200 max-w-2xl mx-auto">
        We'd love to hear from you. Whether you have a question about our
        handmade products, artisan community, or your order, we're here to help.
      </p>

    </div>

    <div className="grid lg:grid-cols-2 gap-12">

      {/* LEFT */}
<AnimatedSection animation="fadeLeft">
      <div>

        <h2 className="text-3xl font-bold text-white mb-8">
          Contact Information
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">

          {contactInfo.map((item, index) => (

            <div
              key={index}
              className="
                bg-white/10
                backdrop-blur-md
                rounded-3xl
                p-6
                border
                border-white/20
                shadow-lg
                hover:-translate-y-2
                transition
              "
            >

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-gradient-to-r
                  from-orange-400
                  to-yellow-400
                  flex
                  items-center
                  justify-center
                  text-white
                  text-2xl
                "
              >
                {item.icon}
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-gray-200">
                {item.description}
              </p>

            </div>

          ))}

        </div>

        {/* SOCIAL */}

        <div className="mt-10">

          <h3 className="text-xl font-bold text-white mb-5">
            Follow Us
          </h3>

          <div className="flex gap-4">

            {[
              <FaFacebookF />,
              <FaInstagram />,
              <FaLinkedinIn />
            ].map((icon, index) => (

              <button
                key={index}
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-orange-500
                  text-white
                  flex
                  items-center
                  justify-center
                  text-xl
                  hover:scale-110
                  hover:bg-orange-600
                  transition
                "
              >
                {icon}
              </button>

            ))}

          </div>

        </div>

      </div>
</AnimatedSection>
      {/* FORM */}
<AnimatedSection animation="fadeRight">
      <div
        className="
          bg-white/10
          backdrop-blur-md
          border
          border-white/20
          rounded-3xl
          shadow-xl
          p-8
          md:p-10
        "
      >

        <h2 className="text-3xl font-bold text-white mb-6">
          Send Message
        </h2>

        <form className="space-y-5">

          <input
            type="text"
            placeholder="Your Name"
            className="
              w-full
              bg-white/20
              text-white
              placeholder-gray-300
              border
              border-white/20
              rounded-xl
              px-5
              py-4
              outline-none
              focus:ring-2
              focus:ring-orange-400
            "
          />

          <input
            type="email"
            placeholder="Email Address"
            className="
              w-full
              bg-white/20
              text-white
              placeholder-gray-300
              border
              border-white/20
              rounded-xl
              px-5
              py-4
              outline-none
              focus:ring-2
              focus:ring-orange-400
            "
          />

          <input
            type="text"
            placeholder="Subject"
            className="
              w-full
              bg-white/20
              text-white
              placeholder-gray-300
              border
              border-white/20
              rounded-xl
              px-5
              py-4
              outline-none
              focus:ring-2
              focus:ring-orange-400
            "
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="
              w-full
              bg-white/20
              text-white
              placeholder-gray-300
              border
              border-white/20
              rounded-xl
              px-5
              py-4
              outline-none
              focus:ring-2
              focus:ring-orange-400
            "
          />

          <button
            className="
              w-full
              bg-gradient-to-r
              from-orange-500
              to-amber-500
              text-white
              py-4
              rounded-xl
              font-semibold
              flex
              justify-center
              items-center
              gap-3
              hover:scale-105
              transition
            "
          >
            Send Message
            <FaPaperPlane />
          </button>

        </form>

      </div>
</AnimatedSection>
    </div>

  </div>

</section>




      {/* MAP */}


      <section className="
        max-w-7xl
        mx-auto
        px-6
        pb-20
      ">


        <h2 className="
          text-5xl
          font-bold
          text-center
          mb-8
          py-20
        ">

          Find <span className="text-orange-400"> Us</span>

        </h2>

        


        <div className="
          rounded-3xl
          overflow-hidden
          shadow-xl
        ">


          <iframe

          title="map"

          className="
            w-full
            h-[400px]
          "

          src="https://maps.google.com/maps?q=Colombo%20Sri%20Lanka&t=&z=13&ie=UTF8&iwloc=&output=embed"

          loading="lazy"

          />


        </div>


      </section>






      {/* FAQ */}

<AnimatedSection>
      <section id="faq" className="
        max-w-7xl
        mx-auto
        px-6
        pb-20
      ">

        <FAQ/>

      </section>

</AnimatedSection>




      {/* CTA */}


      <section className="
        py-20
        bg-gradient-to-r
        from-orange-500
        to-amber-500
        text-white
        text-center
        px-6
      ">


        <h2 className="
          text-4xl
          font-bold
        ">

          Ready To Explore Handmade Products?

        </h2>



        <p className="
          mt-5
          text-orange-100
          text-lg
        ">

          Discover unique creations from talented Sri Lankan artisans.

        </p>



      </section>



    </div>


  );

}


export default Contact;