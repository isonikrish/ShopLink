import { BACKEND_URL } from "@/lib/backend_url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DollarSign, IndianRupee } from "lucide-react";
import { useState } from "react";

function Cart() {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (action: "increment" | "decrement") => {
    if (action === "increment") {
      setQuantity((prev) => prev + 1); // Increment quantity by 1
    } else if (action === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1); // Decrement quantity by 1, ensuring it's at least 1
    }
  };

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
              <p className="card-title text-lg font-medium">
                Price:{" "}
                <span>
                  {item?.product.shop.currency === "inr" ? (
                    <IndianRupee size={14} />
                  ) : (
                    <DollarSign size={14} />
                  )}
                </span>{" "}
                {item?.product.price}
              </p>

              <div className="flex items-center space-x-4 mt-2">
                <button
                  className="btn btn-sm"
                  onClick={() => handleQuantityChange("decrement")}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  className="btn btn-sm"
                  onClick={() => handleQuantityChange("increment")}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cart;
