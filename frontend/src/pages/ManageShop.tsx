import CustomizeShop from "@/components/CustomizeShop";
import ProductsList from "@/components/ProductsList";
import ShopOrders from "@/components/ShopOrders";
import Sidebar from "@/components/Sidebar";
import { BACKEND_URL } from "@/lib/backend_url";
import { useShop } from "@/stores/shopStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ManageShop() {
  const [menu, setMenu] = useState("customize");
  const { shopname } = useParams();
  const { setMyShop } = useShop();

  const { data } = useQuery({
    queryKey: ["manage-shop", shopname],
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
    setMyShop(data);
  }, [data]);

  return (
    <div className="flex w-full">
      <Sidebar setMenu={setMenu} menu={menu} />
      <div className="w-full">
        {menu === "customize" && <CustomizeShop />}
        {menu === "products" && <ProductsList />}
        {menu === "orders" && <ShopOrders />}
      </div>
    </div>
  );
}

export default ManageShop;
