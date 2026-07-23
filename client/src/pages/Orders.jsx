import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import {
  FaBoxOpen,
  FaCreditCard,
  FaCalendarAlt,
  FaShoppingBag,
} from "react-icons/fa";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/my-orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      case "Processing":
        return "bg-purple-100 text-purple-700";

      case "Confirmed":
        return "bg-indigo-100 text-indigo-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-orange-50">
        <h2 className="text-2xl font-semibold text-gray-600">
          Loading Orders...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-14">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            My Orders 📦
          </h1>

          <p className="text-gray-600 mt-3">
            Track your handmade purchases and payment status.
          </p>
        </div>

        {/* Empty */}

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-14 text-center">
            <FaShoppingBag className="mx-auto text-6xl text-orange-300" />

            <h2 className="text-3xl font-bold mt-6">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Discover beautiful handmade products and place your first order.
            </p>

            <Link
              to="/products"
              className="inline-block mt-8 bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between gap-5 bg-orange-50 p-6 border-b">
                  <div>
                    <h2 className="font-bold text-xl">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-600 mt-2">
                      <FaCalendarAlt />

                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <span
                    className={`px-5 py-2 rounded-full font-semibold h-fit ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                {/* Products */}

                <div className="p-6 space-y-5">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row gap-5 items-center border rounded-2xl p-4"
                    >
                      <img
                        src={
                          item.product?.image ||
                          "https://via.placeholder.com/120"
                        }
                        alt={item.product?.title}
                        className="w-28 h-28 rounded-2xl object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold text-lg">
                          {item.product?.title}
                        </h3>

                        <p className="text-gray-500 mt-2">
                          Quantity : {item.quantity}
                        </p>

                        <p className="text-orange-500 font-bold mt-2">
                          Rs.
                          {(item.price * item.quantity).toLocaleString(
                            "en-LK"
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}

                <div className="border-t bg-gray-50 p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Payment */}

                    <div>
                      <h3 className="font-bold flex items-center gap-2 mb-3">
                        <FaCreditCard />

                        Payment
                      </h3>

                      <p>
                        Method :
                        <span className="font-semibold ml-2">
                          {order.paymentMethod || "Demo Card"}
                        </span>
                      </p>

                      <p className="mt-2">
                        Status :
                        <span
                          className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                            order.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </p>
                    </div>

                    {/* Summary */}

                    <div>
                      <h3 className="font-bold flex items-center gap-2 mb-3">
                        <FaBoxOpen />

                        Order Summary
                      </h3>

                      <div className="space-y-2 text-gray-700">
                        <div className="flex justify-between">
                          <span>Subtotal</span>

                          <span>
                            Rs.
                            {Number(order.subtotal).toLocaleString("en-LK")}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Shipping</span>

                          <span>
                            Rs.
                            {Number(order.shipping).toLocaleString("en-LK")}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Tax</span>

                          <span>
                            Rs.
                            {Number(order.tax).toLocaleString("en-LK")}
                          </span>
                        </div>

                        <hr />

                        <div className="flex justify-between text-xl font-bold text-orange-500">
                          <span>Total</span>

                          <span>
                            Rs.
                            {Number(order.total).toLocaleString("en-LK")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}

                  <div className="flex gap-4 mt-8">
                    <button className="px-6 py-3 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition">
                      View Details
                    </button>

                    <Link
                      to="/products"
                      className="px-6 py-3 rounded-xl border border-orange-500 text-orange-500 hover:bg-orange-50 transition"
                    >
                      Buy Again
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;