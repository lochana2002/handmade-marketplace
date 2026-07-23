import { useEffect, useState } from "react";
import api from "../../services/api";


function Orders() {

  const [orders, setOrders] = useState([]);


  useEffect(() => {

    fetchOrders();

  }, []);



  const fetchOrders = async () => {

    try {

      const res = await api.get("/admin/orders");

      setOrders(res.data);

    } catch(error) {

      console.log(error);

    }

  };



  return (

    <div>


      <div className="mb-8">

        <h1 className="
        text-3xl
        font-bold
        ">

          Orders Management

        </h1>


        <p className="text-gray-500">

          Manage customer orders

        </p>


      </div>





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
                Customer
              </th>


              <th className="p-4 text-left">
                Products
              </th>


              <th className="p-4 text-left">
                Total
              </th>


              <th className="p-4 text-left">
                Payment
              </th>


              <th className="p-4 text-left">
                Status
              </th>


            </tr>


          </thead>



          <tbody>


          {
            orders.map(order => (


              <tr
              key={order._id}
              className="
              border-t
              hover:bg-gray-50
              ">


                {/* Buyer */}

                <td className="p-4">


                  <p className="font-medium">

                    {
                      order.buyer?.name ||
                      "Unknown"
                    }

                  </p>


                  <p className="
                  text-sm
                  text-gray-500
                  ">

                    {
                      order.buyer?.email
                    }

                  </p>


                </td>





                {/* Products */}

                <td className="p-4">


                  {
                    order.items?.map(
                      item => (

                      <p key={item._id}>

                        {item.product?.title}
                        {" x "}
                        {item.quantity}

                      </p>

                    ))

                  }


                </td>





                {/* Total */}

                <td className="
                p-4
                font-semibold
                ">


                  Rs. {order.total}


                </td>





                {/* Payment */}

                <td className="p-4">


                  <span className={`
                  px-3
                  py-1
                  rounded-full
                  text-sm

                  ${
                    order.paymentStatus==="Paid"

                    ?

                    "bg-green-100 text-green-600"

                    :

                    "bg-yellow-100 text-yellow-600"

                  }

                  `}>

                    {order.paymentStatus}

                  </span>


                </td>





                {/* Status */}

                <td className="p-4">


                  <span className="
                  bg-blue-100
                  text-blue-600
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  ">

                    {order.orderStatus}

                  </span>


                </td>



              </tr>


            ))

          }


          </tbody>


        </table>


      </div>


    </div>

  );

}


export default Orders;