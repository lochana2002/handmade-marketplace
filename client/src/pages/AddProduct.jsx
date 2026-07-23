import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

import {
  FaImage,
  FaPlusCircle,
  FaBoxOpen,
} from "react-icons/fa";


function AddProduct() {

  const navigate = useNavigate();

  const { id } = useParams();

  const isEditMode = Boolean(id);

const [form, setForm] = useState({
  title: "",
  description: "",
  price: "",
  images: ["", "", ""],
  category: "",
  stock: "",
  featured: false,
});

const handleImageChange=(index,value)=>{

const updatedImages=[...form.images];

updatedImages[index]=value;


setForm({
 ...form,
 images:updatedImages
});

};


  const [loading,setLoading] = useState(false);


  const token = localStorage.getItem("token");



  // ===========================
  // FETCH PRODUCT FOR EDIT
  // ===========================

  useEffect(()=>{


    if(isEditMode){


      const fetchProduct = async()=>{


        try{


          const res = await api.get(
            `/products/${id}`
          );


          setForm({
  title: res.data.title || "",
  description: res.data.description || "",
  price: res.data.price || "",
  images: res.data.images || ["", "", ""],
  category: res.data.category || "",
  stock: res.data.stock || "",
  featured: res.data.featured || false,
});


        }catch(err){

          console.log(err);

        }


      };


      fetchProduct();


    }


  },[id,isEditMode]);





  const handleChange=(e)=>{


    setForm({

      ...form,

      [e.target.name]:e.target.value

    });


  };





  const handleSubmit=async(e)=>{


    e.preventDefault();


    try{


      setLoading(true);



      if(isEditMode){


        await api.put(

          `/products/${id}`,

          form,

          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }

        );


        alert(
          "Product updated successfully!"
        );


      }else{


        await api.post(

          "/products",

          form,

          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }

        );

       

      }
      navigate("/products", {
  state: {
    success: "Product added successfully!",
  },
});

    }catch(err){

      console.log(err);


      alert(
        err.response?.data?.message ||
        "Failed to save product"
      );

    }finally{

      setLoading(false);

    }


  };

  return (


    <div className="
      min-h-screen
      bg-gradient-to-br
      from-amber-50
      via-white
      to-orange-50
      py-16
    ">

      <div className="
        max-w-4xl
        mx-auto
        px-6
      ">

        {/* HEADER */}


        <div className="
          mb-10
        ">

          <span className="
            inline-flex
            items-center
            gap-2
            bg-orange-100
            text-orange-600
            px-5
            py-2
            rounded-full
            font-semibold
          ">

            <FaPlusCircle/>

            Seller Panel

          </span>
          <h1 className="
            text-4xl
            font-bold
            mt-5
            text-gray-900
          ">

           {
 isEditMode
 ?
 "Edit Product"
 :
 "Add New Product"
}

          </h1>
          <p className="
            text-gray-600
            mt-3
          ">

            Showcase your handmade creation to thousands of customers.

          </p>


        </div>

        {/* FORM CARD */}


        <form

        onSubmit={handleSubmit}

        className="
          bg-white
          rounded-3xl
          shadow-xl
          p-8
          space-y-6
        "

        >
          {/* TITLE */}


          <div>

            <label className="
              font-semibold
              text-gray-700
            ">

              Product Name

            </label>


            <input

            name="title"

            value={form.title}

            onChange={handleChange}

            placeholder="Ex: Handmade Wooden Decoration"

            className="
              mt-2
              w-full
              border
              rounded-xl
              px-5
              py-3
              outline-none
              focus:ring-2
              focus:ring-orange-400
            "

            required

            />

          </div>

          {/* DESCRIPTION */}


          <div>

            <label className="
              font-semibold
            ">

              Description

            </label>


            <textarea

            name="description"

            value={form.description}

            onChange={handleChange}

            rows="5"

            placeholder="Describe your handmade product..."

            className="
              mt-2
              w-full
              border
              rounded-xl
              px-5
              py-3
              outline-none
              focus:ring-2
              focus:ring-orange-400
            "

            required

            />

          </div>

          <div className="
            grid
            md:grid-cols-2
            gap-6
          ">
            {/* PRICE */}

            <div>
              <label className="
                font-semibold
              ">

                Price (Rs.)

              </label>


              <input

              name="price"

              type="number"

              value={form.price}

              onChange={handleChange}

              placeholder="5000"

              className="
                mt-2
                w-full
                border
                rounded-xl
                px-5
                py-3
                focus:ring-2
                focus:ring-orange-400
              "

              required

              />
            </div>

            {/* STOCK */}


            <div>


              <label className="
                font-semibold
              ">

                Available Stock

              </label>


              <input

              name="stock"

              type="number"

              value={form.stock}

              onChange={handleChange}

              placeholder="10"

              className="
                mt-2
                w-full
                border
                rounded-xl
                px-5
                py-3
                focus:ring-2
                focus:ring-orange-400
              "
              required
              />
            </div>

          </div>

          {/* CATEGORY */}

          <div>
            <label className="
              font-semibold
            ">

              Category

            </label>

            <select

           name="category"

            value={form.category}

            onChange={handleChange}

            className="
              mt-2
              w-full
              border
              rounded-xl
              px-5
              py-3
              bg-white
              focus:ring-2
              focus:ring-orange-400
            "

            required

            >


              <option value="">
                Select Category
              </option>

              <option>
                Jewelry
              </option>

              <option>
                Art
              </option>

              <option>
                Pottery
              </option>

              <option>
                Clothing
              </option>

              <option>
                Home Decor
              </option>

              <option>
                Bags
              </option>


            </select>


          </div>
          <div className="flex items-center gap-3">
  <input
    type="checkbox"
    id="featured"
    checked={form.featured}
    onChange={(e) =>
      setForm({
        ...form,
        featured: e.target.checked,
      })
    }
    className="w-5 h-5 accent-orange-500"
  />

  <label
    htmlFor="featured"
    className="font-semibold text-gray-700"
  >
    Show as Featured Product
  </label>
</div>
{/* IMAGE */}

<div>

<label className="
font-semibold
">
Product Images
</label>

{
form.images.map((img,index)=>(

<div key={index} className="mt-3">

<input

value={img}

onChange={(e)=>
handleImageChange(
index,
e.target.value
)
}

placeholder={`Image ${index+1} URL`}

className="
w-full
border
rounded-xl
px-5
py-3
focus:ring-2
focus:ring-orange-400
"

/>
</div>
))
}

</div>
          {/* IMAGE PREVIEW */}

{
form.images.some(img => img) && (

<div className="
grid
grid-cols-3
gap-4
mt-5
">

{
form.images.map((img,index)=>(

img && (

<img
key={index}
src={img}
alt={`preview-${index}`}
className="
h-40
w-full
object-cover
rounded-xl
border
"

/>

)

))
}

</div>

)
}

          {/* BUTTON */}



          <button

          type="submit"

          disabled={loading}

          className="
            w-full
            bg-gradient-to-r
            from-orange-500
            to-amber-500
            text-white
            py-4
            rounded-xl
            font-bold
            text-lg
            flex
            items-center
            justify-center
            gap-3
            hover:scale-105
            transition
            disabled:opacity-50
          "

          >

            <FaBoxOpen/>


            {
 loading
 ?
 "Saving..."
 :
 isEditMode
 ?
 "Update Product"
 :
 "Create Product"
}


          </button>




        </form>



      </div>


    </div>

  );

}


export default AddProduct;