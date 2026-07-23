import { useEffect, useState } from "react";
import api from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/orders/${id}`, {
        orderStatus: status,
      });

      loadOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Manage Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h2 className="font-bold">
              {order.buyer.name}
            </h2>

            <p>{order.buyer.email}</p>

            <p className="mt-2">
              Total : Rs. {order.total}
            </p>

            <p>
              Status :
              <span className="font-semibold ml-2">
                {order.orderStatus}
              </span>
            </p>

            <select
              className="border rounded mt-4 p-2"
              value={order.orderStatus}
              onChange={(e) =>
                updateStatus(
                  order._id,
                  e.target.value
                )
              }
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;