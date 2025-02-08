import { BACKEND_URL } from "@/lib/backend_url";
import { useShop } from "@/stores/shopStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

function ShopOrders() {
  const { MyShop } = useShop();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const {
    data: orders = [],
  } = useQuery({
    queryKey: ["ordersList", MyShop?.id],
    queryFn: async () => {
      const res = await axios.get(
        `${BACKEND_URL}/api/shop/orders/${MyShop?.id}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
    staleTime: 120000,
    retry: false
  });

  const handleUpdateStatus = async (orderId: any, newStatus: any) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/shop/change-order-status/${orderId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success(`Order ${newStatus}`);
      }
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold">Orders</h2>
      </div>

      {orders?.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Variants</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((orderItem:any, index:any) => (
                <tr key={orderItem.id}>
                  <th>{index + 1}</th>
                  <td className="flex items-center gap-3">
                    <img
                      src={orderItem.product.productImage}
                      alt={orderItem.product.name}
                      className="rounded-lg w-10"
                    />
                    <span>{orderItem.product.name}</span>
                  </td>
                  <td>{orderItem.order.user.name}</td>
                  <td>
                    {new Date(orderItem.order.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    {orderItem.selectVariants.map((variant:any, i:any) => (
                      <div key={i} className="badge badge-outline mx-1">
                        {variant.type}: {variant.name}
                      </div>
                    ))}
                  </td>
                  <td>{orderItem.quantity}</td>
                  <td>
                    <select
                      className="select select-sm select-bordered"
                      defaultValue={orderItem.status}
                      onChange={(e) =>
                        handleUpdateStatus(orderItem.id, e.target.value)
                      }
                    >
                      <option value="placed">Placed</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="out">Out For Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => setSelectedOrder(orderItem)}
                    >
                      View Info
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedOrder && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="text-2xl font-semibold">Order Details</h3>
            <div className="mt-4 space-y-2">
              <p>
                <span className="font-medium">Email:</span>{" "}
                {selectedOrder.order.country}
              </p>
              <p>
                <span className="font-medium">State:</span>{" "}
                {selectedOrder.order.state}
              </p>
              <p>
                <span className="font-medium">City:</span>{" "}
                {selectedOrder.order.city}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {selectedOrder.order.address}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {selectedOrder.order.phone}
              </p>
            </div>
            <div className="modal-action">
              <button
                className="btn bg-pink-500 text-white"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default ShopOrders;
