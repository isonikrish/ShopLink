import { BACKEND_URL } from "@/lib/backend_url";
import { Shop, shopStore } from "@/lib/types";
import axios from "axios";
import toast from "react-hot-toast";

import { create } from "zustand";

export const useShop = create<shopStore>((set) => ({
  MyShop: null,
  setMyShop: (shop: Shop) => set({ MyShop: shop }),
  createShop: async (formData) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/shop/create`, formData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Shop Created");
      }
    } catch (error) {
      toast.error("Failed to create shop");
    }
  },
  fetchMyShops: async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/shop/my-shops`, {
        withCredentials: true,
      });
      return res.data || [];
    } catch (error) {
      return [];
    }
  },
  generalUpdateShop: async (id, data) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/shop/general-update/${id}`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        toast.success("Updated Shop");
      }
    } catch (error) {
      toast.error("Error in updating shop");
    }
  },
}));
