import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import AnimatedSection from "../components/animations/AnimatedSection";
import AnimatedCard from "../components/animations/AnimatedCard";



function Home() {

  const [featuredProducts, setFeaturedProducts] = useState([]);
const [loading, setLoading] = useState(true);

const categories = [
  {
    name: "Jewelry",
    image: "/images/Jewelers.jpg",
  },
  {
    name: "Art",
    image: "/images/art.jpg",
  },
  {
    name: "Pottery",
    image: "/images/pot.jpg",
  },
  {
    name: "Clothing",
    image: "/images/cloth.jpg",
  },
  {
    name: "Home Decor",
    image: "/images/deco.jpg",
  },
  {
    name: "Bags",
    image: "/images/bags.jpg",
  },
].map((category) => ({
  ...category,
  count: featuredProducts.filter(
    (p) =>
      p.category?.toLowerCase() ===
      category.name.toLowerCase()
  ).length,
}));


useEffect(() => {

  const fetchFeaturedProducts = async () => {

    try {

      const res = await api.get("/products/featured");

      setFeaturedProducts(res.data);

    } catch(error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  fetchFeaturedProducts();

}, []);

  return (
<div
className="
min-h-screen
relative
overflow-hidden
bg-gradient-to-br
from-yellow-50
via-white
to-orange-50
"
>

{/* Background Glow Effects */}

<div
className="
absolute
top-0
left-0
w-96
h-96
bg-yellow-400/20
rounded-full
blur-3xl
"
></div>


<div
className="
absolute
bottom-0
right-0
w-96
h-96
bg-yellow-800/20
rounded-full
blur-3xl
"
></div>
    <>
     {/* HERO SECTION WITH VIDEO BACKGROUND */}

<section className="
relative
h-[90vh]
overflow-hidden
flex
items-center
">


{/* VIDEO */}

<video
className="
absolute
inset-0
w-full
h-full
object-cover
"
autoPlay
muted
loop
playsInline
>

<source 
src="/videos/hero.mp4" 
type="video/mp4"
/>

</video>

{/* DARK OVERLAY */}

<div className="
absolute
inset-0
">
</div>

{/* GRADIENT OVERLAY */}

<div className="
absolute
inset-0
bg-gradient-to-r
from-black/40
via-black/10
to-transparent
">
</div>


{/* CONTENT */}


<div className="
relative
z-10
max-w-7xl
mx-auto
px-6
w-full
">


<div className="
max-w-3xl
text-white
">





<h1 className="
text-5xl
lg:text-7xl
font-bold
leading-tight
">


Made by Hands




<span className="
block
text-orange-400
">

Loved by Hearts.....

</span>


</h1>





<p className="
mt-6
text-lg
lg:text-xl
text-gray-200
font-medium
max-w-2xl
">

Buy what you love.
Sell what you create.
Celebrate unique handmade products from talented Sri Lankan artisans.

</p>








<div className="
mt-10
flex
flex-wrap
gap-5
">


<Link

to="/products"

className="
bg-gradient-to-r
from-orange-500
to-yellow-500
text-white
px-8
py-4
rounded-xl
font-bold
shadow-lg
hover:scale-105
transition
"

>

🛍️ Shop Now

</Link>






<Link

to="/register"

className="
border-2
border-white
px-8
py-4
rounded-xl
font-bold
hover:bg-white
hover:text-orange-600
transition
"

>

🎨 Become Seller

</Link>


</div>






</div>


</div>


</section>

      {/* Categories */}
<section className="relative py-24 bg-gradient-to-br from-amber-50 via-white to-orange-50 overflow-hidden">

  {/* Background Decorations */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-20"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-200 rounded-full blur-3xl opacity-20"></div>

  <div className="relative max-w-7xl mx-auto px-6">

    {/* Heading */}
    <AnimatedSection>
    <div className="text-center mb-16">
      <h2 className="mt-5 text-4xl md:text-5xl font-bold text-gray-900">
        Shop by
        <span className="text-orange-500"> Category</span>
      </h2>

      <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
        Discover beautiful handmade creations across a wide range of artisan
        categories.
      </p>
    </div>

   {/* Categories */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">

  {categories.map((category, index) => (

    <Link
      key={category.name}
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className={`
        group
        bg-white/80
        backdrop-blur-lg
        border border-white
        rounded-3xl
        p-6
        text-center
        shadow-lg
        hover:shadow-2xl
        hover:-translate-y-4
        transition-all
        duration-500

        ${
          index % 2 === 0
          ? "lg:-translate-y-8"
          : "lg:translate-y-8"
        }
      `}
    >


      {/* Image */}
      <div
        className="
          w-35
          h-35
          mx-auto
          rounded-2xl
          overflow-hidden
          shadow-md
          group-hover:scale-110
          transition
          duration-500
        "
      >

        <img
          src={category.image}
          alt={category.name}
          className="
            w-full
            h-full
            object-cover
          "
        />

      </div>



      {/* Category Name */}
      <h3
        className="
          mt-6
          text-lg
          font-bold
          text-gray-800
          group-hover:text-orange-500
          transition
        "
      >
        {category.name}
      </h3>



      {/* Bottom Line */}
      <div
        className="
          mt-5
          h-1
          w-10
          mx-auto
          rounded-full
          bg-orange-400
          group-hover:w-20
          transition-all
          duration-300
        "
      />

    </Link>

  ))}

</div>
</AnimatedSection>
  </div>

</section>
 {/* FEATURED PRODUCTS */}
<AnimatedSection>
<section className="
  py-20
  bg-gradient-to-br
  from-amber-50
  via-white
  to-orange-50
">

  <div className="
    max-w-7xl
    mx-auto
    px-6
  ">


    {/* HEADER */}
<div className="text-center mb-12">

  <h2 className="
    mt-5
    text-4xl
    md:text-5xl
    font-bold
    text-gray-900
  ">

    Featured
    <span className="text-orange-500">
      {" "}Products
    </span>

  </h2>


  <p className="
    text-gray-600
    mt-3
    max-w-2xl
    mx-auto
  ">

    Explore our most loved handmade creations.

  </p>


  <Link
    to="/products"
    className="
      inline-block
      mt-6
      bg-orange-500
      text-white
      px-6
      py-3
      rounded-xl
      font-semibold
      hover:bg-orange-600
      transition
    "
  >
    View All Products →
  </Link>

</div>


    {/* PRODUCTS */}

    {
      loading ? (

        <div className="
          text-center
          py-20
        ">

          <p className="
            text-xl
            text-gray-500
          ">

            Loading products...

          </p>


        </div>


      ) : featuredProducts.length === 0 ? (


        <div className="
          text-center
          py-20
        ">

          <h3 className="
            text-2xl
            font-bold
          ">

            No Featured Products

          </h3>


          <p className="
            text-gray-500
            mt-3
          ">

            New handmade products will appear here.

          </p>


        </div>



      ) : (


        <div className="
          grid
          sm:grid-cols-2
          lg:grid-cols-4
          gap-8
        ">


          {
            featuredProducts.map((product)=>(

              <ProductCard

                key={product._id}

                product={product}

              />

            ))
          }


        </div>


      )

    }

  </div>

</section>
</AnimatedSection>

{/* HERITAGE / STORY SECTION */}

<section
  className="
    relative
    min-h-[700px]
 
    overflow-hidden
    flex
    items-center
  "
>

  


  {/* Content */}

  <div
    className="
      relative
      z-10
      max-w-7xl
      mx-auto
      px-6
      grid
      md:grid-cols-2
      items-center
      gap-10
    "
  >


    {/* TEXT */}

    <div>


      <p
        className="
          text-orange-400
          uppercase
          tracking-[0.3em]
          font-bold
          text-sm
        "
      >
        Handmade Sri Lanka
      </p>

<AnimatedSection animation="fadeLeft">
      <h2
        className="
          mt-6
          text-5xl
          md:text-7xl
          font-bold
          text-black
          leading-tight
        "
      >

        Heritage is not
        <br />

        behind us.

        <br />

        <span
          className="
            text-yellow-400
            italic
          "
        >
          It's in our hands.
        </span>

      </h2>

</AnimatedSection>


      <p
        className="
          mt-6
          text-gray-500
          text-lg
          max-w-xl
        "
      >
        Every handmade creation carries a story.
        We connect Sri Lankan artisans with people
        who appreciate authentic craftsmanship.
      </p>



      <Link
        to="/products"
        className="
          inline-block
          mt-8
          bg-gradient-to-r
            from-orange-500
            to-amber-500
          text-black
          px-8
          py-4
          font-bold
          rounded-xl
          hover:bg-orange-500
          hover:text-white
          transition
        "
      >
        Explore Collection →
      </Link>


    </div>



    {/* IMAGE / ARTISAN */}

    <div
      className="
        hidden
        md:block
      "
    >
<AnimatedSection animation="fadeRight">
      <img
        src="/images/craft.png"
        alt="Sri Lankan artisan"
        className="
          w-full
          max-h-[650px]
          object-contain
        "
      /></AnimatedSection>

    </div>


  </div>


</section>

<AnimatedSection>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

        

<WhyChooseUs/>
<AnimatedSection>
<Testimonials />
</AnimatedSection>
        </div>
      </section>
      </AnimatedSection>
    </>
    </div>
  )
  ;
}

export default Home;