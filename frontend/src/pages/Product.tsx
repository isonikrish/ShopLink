import { useProduct } from "@/stores/productStore";
import { useQuery } from "@tanstack/react-query";
import { IndianRupee } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useUser } from "@/stores/userStore";

function Product() {
  const { id }: any = useParams();
  const parsedId = parseInt(id);
  const { getProduct } = useProduct();
  const { addToCart, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (parsedId) {
        return getProduct(parsedId);
      }
    },
    staleTime: 120000,
  });

  const groupedVariants: Record<string, string[]> =
    data?.variants?.reduce((acc: Record<string, string[]>, variant: any) => {
      if (!acc[variant.variantType]) {
        acc[variant.variantType] = [];
      }
      acc[variant.variantType].push(variant.variantName);
      return acc;
    }, {}) || {};

  const [selectedProduct, setSelectedProduct] = useState({
    productId: parsedId,
    selectedVariants: [] as { type: string; name: string }[],
  });

  const handleVariantChange = (variantType: string, variantName: string) => {
    setSelectedProduct((prev) => {
      const filteredVariants = prev.selectedVariants.filter(
        (v) => v.type !== variantType
      );

      return {
        ...prev,
        selectedVariants: [
          ...filteredVariants,
          { type: variantType, name: variantName },
        ],
      };
    });
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    await addToCart(selectedProduct);
    setIsLoading(false);
  };
  const addedInCart = data?.cart.some((item: any) => item.userId === user?.id);
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border p-10 border-base-300 rounded-lg">
        <div className="flex justify-center items-center rounded-lg overflow-hidden">
          <img
            src={data?.productImage}
            alt="Product"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800">{data?.name}</h1>

          <p className="text-2xl font-bold text-gray-900 flex items-center">
            <span>
              <IndianRupee size={16} />
            </span>
            {data?.price.toLocaleString("en-IN")}
          </p>

          <p className="text-lg">
            <span className="font-semibold">Category: </span>
            {data?.category}
          </p>

          <div className="mt-4">
            {Object.entries(groupedVariants).map(([variantType, options]) => (
              <div key={variantType} className="mb-4">
                <label
                  htmlFor={variantType}
                  className="text-lg font-medium text-gray-700"
                >
                  Select a {variantType}
                </label>
                <select
                  id={variantType}
                  className="select select-bordered w-full mt-2 text-lg py-2 px-3 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={
                    selectedProduct.selectedVariants.find(
                      (v) => v.type === variantType
                    )?.name || ""
                  }
                  onChange={(e) =>
                    handleVariantChange(variantType, e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select {variantType}
                  </option>
                  {options.map((variantName) => (
                    <option key={variantName} value={variantName}>
                      {variantName}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center space-x-4">
            {addedInCart ? (
              <button className="btn bg-pink-500 text-white w-full py-3 text-xl rounded-lg">
                Remove from cart
              </button>
            ) : (
              <button
                className="btn bg-pink-500 text-white w-full py-3 text-xl rounded-lg"
                onClick={handleAddToCart}
              >
                {isLoading ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : (
                  "Add to cart"
                )}
              </button>
            )}
          </div>

          <div className="mt-8 bg-base-200 border p-6 rounded-lg border-base-300">
            <h2 className="text-2xl font-semibold text-gray-800">
              Description
            </h2>
            <p className="text-lg text-gray-600 mt-2">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
