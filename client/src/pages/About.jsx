import { Link } from "react-router-dom";
import {
  FaHandsHelping,
  FaLeaf,
  FaStore,
  FaShieldAlt,
  FaShoppingBag,
  FaPalette,
} from "react-icons/fa";
import AnimatedSection from "../components/animations/AnimatedSection";

import { useEffect, useState } from "react";
import api from "../services/api";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

function About() {

  const [stats, setStats] = useState({
  totalProducts: 0,
  totalArtisans: 0,
  totalCustomers: 0,
  totalOrders: 0,
  totalCategories: 0,
  averageRating: 0,
});

useEffect(() => {

  const loadStats = async () => {
    try {
      const res = await api.get("/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  loadStats();

}, []);

const statsData = [
  {
    number: stats.totalProducts,
    title: "Products",
    suffix: "+",
  },
  {
    number: stats.totalArtisans,
    title: "Artisans",
    suffix: "+",
  },
  {
    number: stats.totalCustomers,
    title: "Customers",
    suffix: "+",
  },
  {
    number: stats.totalOrders,
    title: "Orders",
    suffix: "+",
  },
  {
    number: stats.totalCategories,
    title: "Categories",
    suffix: "+",
  },
  {
    number: Number(stats.averageRating),
    title: "Average Rating",
    suffix: "★",
  },
];

const { ref, inView } = useInView({
  triggerOnce: true,
});

  return (
    <section className="bg-gradient-to-br from-amber-50 via-white to-orange-50">

      {/* ================= HERO ================= */}
   
     <section className="
py-20
bg-gradient-to-br
from-orange-50
via-white
to-yellow-50
overflow-hidden
">

<div className="
max-w-7xl
mx-auto
px-6
grid
md:grid-cols-2
gap-12
items-center
">


{/* TEXT CONTENT */}

<div className="text-center md:text-left">


<h1 className="
mt-6
text-5xl
md:text-6xl
font-bold
text-gray-900
leading-tight
">

Connecting

<span className="text-orange-500">
 Creative Artisans
</span>

with People Who Love Handmade Products

</h1>


<p className="
mt-6
text-lg
text-gray-600
max-w-xl
">

Handmade Market is a trusted online marketplace where talented
artisans showcase unique handcrafted products while customers
discover meaningful creations made with passion and care.

</p>


<button
className="
mt-8
bg-orange-500
text-white
px-8
py-4
rounded-xl
font-bold
shadow-lg
hover:bg-orange-600
transition
"
>

Explore Handmade Products

</button>


</div>



{/* HERO IMAGE */}

<div className="
relative
">


<div className="
absolute
- top-10
- right-10
w-72
h-72
bg-orange-200
rounded-full
blur-3xl
opacity-50
">
</div>


<img

src="/images/about.jpg"

alt="Creative artisan making handmade products"

className="
relative
w-full
h-[550px]
object-cover
rounded-3xl
shadow-2xl
"

/>

</div>


</div>

</section>

      {/* ================= OUR STORY ================= */}

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-14 items-center">
<AnimatedSection animation="fadeLeft">
        <img
          src="/images/img1.jpg"
          alt=""
          className="rounded-3xl shadow-2xl object-cover"
        />
</AnimatedSection>
        <div>
<AnimatedSection animation="fadeRight">
          <span className="text-orange-500 font-semibold uppercase tracking-wider">
            Our Story
          </span>

          <h2 className="text-4xl font-bold mt-3 text-gray-900">
            Empowering Handmade Creativity
          </h2>

          <p className="mt-6 text-gray-600 leading-8">
            Every handmade product carries the passion, creativity, and culture
            of its creator. We built Handmade Market to help artisans showcase
            their work without barriers and connect them directly with customers
            who value authentic craftsmanship.
          </p>

          <p className="mt-5 text-gray-600 leading-8">
            Rather than mass-produced goods, we celebrate unique creations that
            preserve traditional skills while encouraging sustainable and
            ethical shopping.
          </p>
</AnimatedSection>
        </div>

      </div>
  

      {/* ================= MISSION ================= */}

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-100 items-center">

        <div>
<AnimatedSection animation="fadeLeft">
          <span className="text-orange-500 font-semibold uppercase tracking-wider">
            Our Mission
          </span>

          <h2 className="text-4xl font-bold mt-3 text-gray-900">
            Supporting Local Artisans
          </h2>

          <p className="mt-6 text-gray-600 leading-8">
            Our mission is to create opportunities for talented artisans,
            promote sustainable handmade products, and build a trusted
            marketplace where creativity thrives.
          </p>

          <p className="mt-5 text-gray-600 leading-8">
            Every purchase supports small businesses, preserves craftsmanship,
            and strengthens local communities.
          </p>
</AnimatedSection>
        </div>
<AnimatedSection animation="fadeRight">
        <img
          src="/images/her.webp"
          alt=""
          className="rounded-3xl object-cover w-100 h-140"
        />
</AnimatedSection>
      </div>

      {/* ================= MARKETPLACE STATISTICS ================= */}

<section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center text-white mb-16">

      <span className="uppercase tracking-widest text-orange-100 font-semibold">
        Marketplace Impact
      </span>

      <h2 className="text-4xl font-bold mt-4">
        Growing Together with Our Community
      </h2>

      <p className="mt-4 text-orange-100 max-w-2xl mx-auto">
        Handmade Market connects talented artisans with customers across Sri Lanka,
        helping small businesses grow while preserving traditional craftsmanship.
      </p>

    </div>

   <div
  ref={ref}
  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
>
  {statsData.map((item, index) => (
    <div
      key={index}
      className="
        bg-white/10
        backdrop-blur-md
        rounded-2xl
        p-8
        text-center
        border
        border-white/20
      "
    >

     <h3 className="text-4xl font-bold text-white">
  {item.number}
  {item.suffix}
</h3>

      <p className="mt-3 text-orange-100 font-medium">
        {item.title}
      </p>

    </div>
  ))}
</div>

  </div>

</section>

{/* ================= OUR ARTISANS ================= */}

<div className="max-w-7xl mx-auto px-6 py-20">

  <div className="text-center mb-16">

    <span className="text-orange-500 font-semibold uppercase tracking-widest">
      Meet Our Makers
    </span>

    <h2 className="text-4xl font-bold mt-4 text-gray-900">
      The Hands Behind Every <span className="text-orange-500">Masterpiece</span>
    </h2>

    <p className="mt-5 max-w-3xl mx-auto text-gray-600 leading-8">
      Every product in Handmade Market tells a story. Our talented artisans
      combine creativity, tradition, and passion to craft unique handmade
      products that celebrate Sri Lankan culture and craftsmanship.
    </p>

  </div>



  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

    {[
      {
        image: "/images/artisans/artisan1.jpg",
        name: "Nimal Perera",
        craft: "Wood Carving",
      },
      {
        image: "/images/artisans/artisan2.jpg",
        name: "Sanduni Silva",
        craft: "Jewelry Designer",
      },
      {
        image: "/images/artisans/artisan3.jpg",
        name: "Kavindu Fernando",
        craft: "Pottery Artist",
      },
      {
        image: "/images/artisans/artisan4.jpg",
        name: "Ayesha Kumari",
        craft: "Handloom Weaver",
      },
    ].map((artisan, index) => (

      <div
        key={index}
        className="
          group
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-lg
          hover:shadow-2xl
          transition-all
          duration-300
          hover:-translate-y-2
        "
      >

        <div className="overflow-hidden">

          <img
            src={artisan.image}
            alt={artisan.name}
            className="
              w-full
              h-72
              object-cover
              group-hover:scale-110
              transition-transform
              duration-500
            "
          />

        </div>

        <div className="p-6 text-center">

          <h3 className="text-xl font-bold text-gray-800">
            {artisan.name}
          </h3>

          <p className="text-orange-500 font-medium mt-2">
            {artisan.craft}
          </p>

          <p className="mt-4 text-sm text-gray-600 leading-6">
            Passionately creating authentic handmade products with traditional
            techniques and modern creativity.
          </p>

        </div>

      </div>

    ))}

  </div>

</div>

       {/* ================= FEATURES ================= */}

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-16">

        

          <h2 className="text-4xl font-bold mt-5 text-gray-900">
            Everything You Need <span className="text-orange-400"> in One Marketplace</span>
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {[
            {
              icon: <FaShoppingBag />,
              title: "For Buyers",
              desc: "Discover beautiful handmade products crafted by talented artisans.",
            },
            {
              icon: <FaStore />,
              title: "For Sellers",
              desc: "Grow your handmade business and reach customers across the country.",
            },
            {
              icon: <FaShieldAlt />,
              title: "Secure Shopping",
              desc: "Safe authentication and reliable transactions for every order.",
            },
            {
              icon: <FaHandsHelping />,
              title: "Community Support",
              desc: "Every purchase directly supports independent artisans.",
            },
            {
              icon: <FaLeaf />,
              title: "Eco Friendly",
              desc: "Promoting sustainable products and responsible craftsmanship.",
            },
            {
              icon: <FaPalette />,
              title: "Unique Designs",
              desc: "Every product is handcrafted and completely unique.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-800">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>

       {/* ================= CTA ================= */}

      <div className="max-w-7xl mx-auto px-6 pb-24">

        <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 text-white py-16 px-10 text-center shadow-2xl">

          <h2 className="text-4xl font-bold">
            Join Our Handmade Community
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-orange-100">
            Whether you're looking for unique handmade products or want to sell
            your own creations, Handmade Market is the perfect place to start.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link
              to="/products"
              className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
            >
              Explore Products
            </Link>

            <Link
              to="/register"
              className="border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition"
            >
              Become a Seller
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;