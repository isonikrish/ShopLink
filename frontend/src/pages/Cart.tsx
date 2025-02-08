import { BACKEND_URL } from "@/lib/backend_url";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/user/get-cart`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          return res.data;
        }
      } catch (error) {
        return [];
      }
    },
  });

  const handleQuantityIncrement = async (id: number) => {
    const res = await axios.put(
      `${BACKEND_URL}/api/user/quantity-increment/${id}`,
      {},
      { withCredentials: true }
    );
    if (res.status === 200) {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  };
  const handleQuantityDecrement = async (id: number) => {
    const res = await axios.put(
      `${BACKEND_URL}/api/user/quantity-decrement/${id}`,
      {},
      { withCredentials: true }
    );
    if (res.status === 200) {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  };
  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">My Cart</h2>
      </div>
      {data?.map((item: any, index: number) => {
        return (
          <div
            className="card border border-base-300 w-full rounded-md p-4 flex flex-row gap-3"
            key={index}
          >
            <div className="avatar">
              <div className="w-24 rounded">
                <img src={item?.product.productImage} alt="Product" />
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <h2 className="card-title text-xl font-bold">
                {item?.product.name}
              </h2>
              <p className="flex gap-2">
                Price:{" "}
                <span className="flex items-center">
                  <IndianRupee size={14} />
                  {item?.product.price.toLocaleString("en-IN")}
                </span>{" "}
              </p>

              <div className="flex items-center space-x-4 mt-2">
                {item.quantity === 1 ? (
                  <button className="btn btn-sm" disabled>
                    -
                  </button>
                ) : (
                  <button
                    className="btn btn-sm"
                    onClick={() => handleQuantityDecrement(item.id)}
                  >
                    -
                  </button>
                )}

                <span className="text-lg font-semibold">{item?.quantity}</span>
                <button
                  className="btn btn-sm"
                  onClick={() => handleQuantityIncrement(item.id)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <button
        className="btn mt-3 bg-pink-500 text-white text-lg font-semibold rounded-md hover:bg-pink-600 transition px-4"
        onClick={() => navigate("/cart/checkout")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;
