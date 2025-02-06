import { useShop } from "@/stores/shopStore";
import { useUser } from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function MyShops() {
  const { fetchMyShops } = useShop();
  const { user } = useUser();
  const { data } = useQuery({
    queryKey: ["my-shops", user?.id],
    queryFn: async () => {
      const data = await fetchMyShops();
      return data;
    },
    staleTime: 120000,
  });

  return (
    <div className="px-10 py-10">
      <h1 className="text-3xl font-bold">My Shops</h1>

      <div className="grid grid-cols-3 mt-7 gap-5">
        {data?.map((shop, index) => {
          const productCount = shop?.products?.length;
          return (
            <div key={index}>
              <div className="card bg-base-100 w-96  border border-base-300">
                <div className="avatar">
                  <div className="w-24 rounded-xl m-5">
                    <img src={shop?.logo} />
                  </div>
                </div>
                <div className="card-body">
                  <h2 className="card-title">{shop?.name || "Shop Name"}</h2>
                  <p>{shop?.description?.slice(0, 100) + "..." || "Shop Description"}</p>
                  <div className="card-actions">
                    <div className="badge badge-outline">
                      {productCount} Products
                    </div>
                  </div>
                  <Link
                    className="btn w-full rounded-md bg-pink-500 text-white mt-4 hover:bg-pink-600"
                    to={`/manage/${shop?.name}`}
                  >
                    Manage Shop
                  </Link>
                  <Link
                    className="btn w-full rounded-md border border-pink-500 text-pink-500 mt-2 hover:bg-pink-100"
                    to={`/shop/${shop?.name}`}
                  >
                    View Shop <SquareArrowOutUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyShops;
