import { useEffect, useState } from "react";
import api from "../../services/api";

function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {

    fetchProducts();

  }, []);



  const fetchProducts = async () => {

    try {

      const res = await api.get("/admin/products");

      setProducts(res.data);

    } catch(error) {

      console.log(error);

    }

  };



  const filteredProducts = products.filter((product)=>

    product.title
    .toLowerCase()
    .includes(search.toLowerCase())

  );



  return (

    <div>


      {/* Header */}

      <div className="
      flex
      justify-between
      items-center
      mb-8
      ">


        <div>

          <h1 className="
          text-3xl
          font-bold
          ">

            Products Management

          </h1>


          <p className="text-gray-500">

            Manage marketplace products

          </p>


        </div>



        <input

          type="text"

          placeholder="Search products..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="
          border
          rounded-xl
          px-4
          py-3
          w-72
          focus:ring-2
          focus:ring-orange-500
          outline-none
          "

        />


      </div>





      {/* Table */}

      <div className="
      bg-white
      rounded-2xl
      shadow
      overflow-hidden
      ">


        <table className="w-full">


          <thead className="bg-gray-100">


            <tr>


              <th className="p-4 text-left">
                Product
              </th>


              <th className="p-4 text-left">
                Category
              </th>


              <th className="p-4 text-left">
                Price
              </th>


              <th className="p-4 text-left">
                Stock
              </th>


              <th className="p-4 text-left">
                Seller
              </th>


              <th className="p-4 text-left">
                Action
              </th>


            </tr>


          </thead>





          <tbody>


          {
            filteredProducts.map((product)=>(


              <tr
              key={product._id}
              className="
              border-t
              hover:bg-gray-50
              ">


                {/* Product */}

                <td className="p-4">


                  <div className="
                  flex
                  items-center
                  gap-3
                  ">


                    <img

                    src={product.image}

                    alt={product.title}

                    className="
                    w-14
                    h-14
                    rounded-xl
                    object-cover
                    "

                    />



                    <span className="
                    font-medium
                    ">

                      {product.title}

                    </span>


                  </div>


                </td>





                {/* Category */}

                <td className="p-4">


                  <span className="
                  bg-orange-100
                  text-orange-600
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  ">

                    {product.category}

                  </span>


                </td>





                {/* Price */}

                <td className="p-4 font-semibold">


                  Rs. {product.price}


                </td>





                {/* Stock */}

                <td className="p-4">


                  {

                    product.stock > 0

                    ?

                    <span className="
                    text-green-600
                    ">

                      {product.stock} Available

                    </span>


                    :

                    <span className="
                    text-red-600
                    ">

                      Out of Stock

                    </span>

                  }


                </td>





                {/* Seller */}

                <td className="p-4">


                  {
                    product.seller
                    ?

                    <div>

                      <p className="font-medium">

                        {product.seller.name}

                      </p>

                      <p className="
                      text-sm
                      text-gray-500
                      ">

                        {product.seller.email}

                      </p>


                    </div>


                    :

                    "Unknown"

                  }


                </td>





                {/* Actions */}

                <td className="p-4">


                  <button

                  className="
                  text-blue-600
                  hover:underline
                  mr-3
                  "

                  >

                    View

                  </button>



                  <button

                  className="
                  text-red-600
                  hover:underline
                  "

                  >

                    Delete

                  </button>



                </td>



              </tr>


            ))
          }


          </tbody>


        </table>





        {
          filteredProducts.length === 0 &&

          <p className="
          text-center
          p-8
          text-gray-500
          ">

            No products found

          </p>

        }


      </div>


    </div>

  );

}

export default Products;