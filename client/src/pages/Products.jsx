import { useEffect, useState } from "react";
import { useSearchParams, useLocation, useNavigate, } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaBoxOpen,
} from "react-icons/fa";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import AnimatedSection from "../components/animations/AnimatedSection";

function Products() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
  const newCategory = searchParams.get("category") || "";
  setCategory(newCategory);
}, [searchParams]);

  const location = useLocation();

  const initialCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/products?search=${search}&category=${category}`
      );

      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  useEffect(() => {
  if (location.state?.success) {
    alert(location.state.success);

    window.history.replaceState({}, document.title);
  }
}, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 ">
    {/* Hero Section */}
<section className="relative h-165 flex items-center justify-center overflow-hidden">

  {/* Background Video */}
  <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src="/videos/hero2.mp4" type="video/mp4" />
  </video>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>


  {/* Decorative Glow */}
  <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/30 rounded-full blur-3xl"></div>
  <div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl"></div>


  {/* Content */}
  <div className="relative z-10 text-center text-white px-6 max-w-5xl">

    <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-white/20">
      Handmade Marketplace
    </span>

    <h1 className="text-4xl md:text-6xl font-extrabold mt-6 leading-tight">
      Discover Handmade
      <span className="block text-orange-400">
        Treasures
      </span>
    </h1>

 {/* SEARCH */}
        <div className="bg-transparent rounded-3xl shadow-lg p-6 mb-10">

          <div className="flex flex-col lg:flex-row gap-5">

            {/* Search */}

            <div className="relative flex-1">

              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search handmade products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  border
                  text-white
                  font-bold
                  rounded-xl
                  pl-14
                  pr-4
                  py-5
                  outline-none
                  focus:ring-2
                  focus:ring-orange-400
                "
              />

            </div>

            {/* Category */}

            <div className="relative">

              <FaFilter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

              <select
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="
border
rounded-xl
text-white
font-bold
py-5
pl-14
pr-10
outline-none
focus:ring-2
focus:ring-orange-400
"
>


<option 
value=""
className="text-black"
>
All Categories
</option>


<option
value="Jewelry"
className="text-black"
>
Jewelry
</option>


<option
value="Art"
className="text-black"
>
Art
</option>


<option
value="Pottery"
className="text-black"
>
Pottery
</option>


<option
value="Clothing"
className="text-black"
>
Clothing
</option>


<option
value="Home Decor"
className="text-black"
>
Home Decor
</option>


<option
value="Bags"
className="text-black"
>
Bags
</option>


</select>

            </div>

          </div>

        </div>
  </div>

</section>
      <div className="max-w-7xl mx-auto px-6">

       

        {/* Loading */}

        {loading ? (

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {Array.from({ length: 8 }).map((_, index) => (

              <div
                key={index}
                className="bg-white rounded-3xl p-5 shadow-lg animate-pulse"
              >

                <div className="h-56 bg-gray-200 rounded-2xl"></div>

                <div className="h-5 bg-gray-200 rounded mt-5"></div>

                <div className="h-4 bg-gray-200 rounded mt-3"></div>

                <div className="h-4 bg-gray-200 rounded mt-2 w-2/3"></div>

                <div className="h-10 bg-gray-200 rounded-xl mt-6"></div>

              </div>

            ))}

          </div>

        ) : products.length === 0 ? (

          /* EMPTY */

          <div className="bg-white rounded-3xl shadow-lg py-20 text-center">

            <FaBoxOpen className="mx-auto text-7xl text-orange-300" />

            <h2 className="text-3xl font-bold mt-8">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-4">
              Try searching with another keyword or category.
            </p>

          </div>

        ) : (

          <>

            {/* Results */}
<AnimatedSection>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">

              <h2 className="text-3xl font-bold text-gray-900 py-15">
                Products
              </h2>

              <span className="mt-4 md:mt-0 bg-orange-100 text-orange-700 px-5 py-2 rounded-full font-semibold">
                {products.length} Products Found
              </span>

            </div>

            {/* Grid */}

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {products.map((product) => (

                <ProductCard
                  key={product._id}
                  product={product}
                />

              ))}

            </div>
</AnimatedSection>
          </>

        )}

      </div>

    </div>
  );
}

export default Products;