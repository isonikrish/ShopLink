import { useShop } from "@/stores/shopStore";
import { useUser } from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function MyShops() {
  const { fetchMyShops } = useShop();
  const { user } = useUser();
  const { data, isLoading } = useQuery({
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
          return (
            <>
            <div className="card bg-base-100 w-96 shadow-xl" key={index}>
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {shop?.name || "Shop Name"} 
                </h2>
                <p>{shop?.description || "Shop Description"}</p>
                <div className="card-actions">
                  <div className="badge badge-outline">50 Products</div>
                </div>
                <Link className="btn w-full rounded-md bg-pink-500 text-white mt-4" to={`/manage/${shop?.name}`}>
                  Manage Shop <SquareArrowOutUpRight size={16}/> 
                </Link>
              </div>
            </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default MyShops;
