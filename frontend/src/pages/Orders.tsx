import { BACKEND_URL } from "@/lib/backend_url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Orders() {
  const { data, isError, error } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const res = await axios.get(`${BACKEND_URL}/api/user/my-orders`, {
        withCredentials: true,
      });
      return res.data;
    },
    staleTime: 120000,
    retry: false,
  });

  if (isError) {
    return (
      <p className="text-red-500">Error fetching orders: {error.message}</p>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold mb-5">Your Orders</h1>
      {data?.length > 0 ? (
        <div className="space-y-2">
          {data.map((order: any) => (
            <div
              key={order.id}
              className="card bg-base-100 border border-base-300 p-2"
            >
              <div className="card-body">
                <h2 className="card-title text-lg font-bold">
                  Order #{order.id}
                </h2>
                <p className="text-sm text-gray-500">
                  Placed on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  Shipping Address: {order.address}, {order.city}, {order.state}
                  , {order.country}
                </p>
                <p className="text-sm">Phone: {order.phone}</p>
              </div>

              <div>
                <h1 className="text-lg font-extrabold p-4">Order Items</h1>
                <div className="overflow-x-auto">
                  <table className="table w-full table-zebra">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Variants</th>
                        <th>Quantity</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((orderItem: any, index: number) => (
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
                          <td>
                            {orderItem.selectVariants?.length > 0 ? (
                              orderItem.selectVariants.map(
                                (variant: any, i: number) => (
                                  <div
                                    key={i}
                                    className="badge badge-outline mx-1"
                                  >
                                    {variant.type}: {variant.name}
                                  </div>
                                )
                              )
                            ) : (
                              <span className="text-gray-500">No Variants</span>
                            )}
                          </td>
                          <td>{orderItem.quantity}</td>
                          <td>
                            <td className="text-sm font-semibold text-pink-600">
                              {orderItem.status === "placed" && "Placed"}
                              {orderItem.status === "out" && "Out For Delivery"}
                              {orderItem.status === "dispatched" && "Dispatched"}
                              {orderItem.status === "delivered" && "Delivered"}
                            </td>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}
    </div>
  );
}

export default Orders;
