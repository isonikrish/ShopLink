import { BACKEND_URL } from "@/lib/backend_url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react"; // Import Lucide icons
import { FaXTwitter } from "react-icons/fa6";
import ShopProduct from "@/components/ShopProduct";

function Shop() {
  const [shop, setShop] = useState<any | null>(null);
  const { shopname } = useParams();
  const { data } = useQuery({
    queryKey: ["shop", shopname],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/shop/my-shop/${shopname}`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          return res.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    staleTime: 120000,
  });

  useEffect(() => {
    setShop(data);
  }, [data]);

  return (
    <div data-theme={shop?.theme} className="min-h-screen">
      <div className="flex items-center justify-center  py-4 px-4 border-primary border-b">
        <div className="avatar flex items-center gap-3">
          <div className="w-10 rounded-xl">
            <img src={shop?.logo} />
          </div>
          <h1 className="text-2xl font-bold">{shop?.name}</h1>
        </div>
      </div>
      <div className="my-10 grid grid-cols-3 ">
        {shop?.products?.map((product:any)=> {
          return (
            <ShopProduct product={product} currency={shop.currency} shop={shop}/>

          )
        })}
      </div>

      <footer className="footer bg-secondary text-neutral-content p-10 mt-auto">
        <aside>
          <img src={shop?.logo} className="w-14 rounded-lg" />
          <div>
            <span className="text-xl font-bold">{shop?.name}</span>
            <br />
            <ul className="mt-5">
              <li className="text-base">
                <span className="font-semibold">Email: </span>
                {shop?.email || "No email address provided"}
              </li>
              <li className="text-base">
                <span className="font-semibold">Phone: </span>
                {shop?.phone || "No phone number provided"}
              </li>
              <li className="text-base">
                <span className="font-semibold">Address: </span>
                {shop?.address || "No address provided"}
              </li>
            </ul>
          </div>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a
              href={shop?.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <Facebook className="w-6 h-6 text-current" />
            </a>
            <a
              href={shop?.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <Instagram className="w-6 h-6 text-current" />
            </a>
            <a
              href={shop?.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <Youtube className="w-6 h-6 text-current" />
            </a>
            <a
              href={shop?.x_url}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <FaXTwitter className="w-6 h-6 text-current" />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
}

export default Shop;
