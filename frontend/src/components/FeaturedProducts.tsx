import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import axios from "axios";
import { BACKEND_URL } from "@/lib/backend_url";

function FeaturedProducts() {
  const { data } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/product/featured-products`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          return res.data;
        }
      } catch (error) {
        return [];
      }
    },
  });
  return (
    <div className="p-6 border-t border-base-300">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Featured Products</h2>
      </div>

      <div className="grid grid-cols-3">
        {data?.map((product: any, index: number) => {
          return <ProductCard key={index} product={product}/>;
        })}
      </div>
    </div>
  );
}

export default FeaturedProducts;
