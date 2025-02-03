import { BACKEND_URL } from "@/lib/backend_url";
import { shopStore } from "@/lib/types";
import axios from "axios";
import toast from "react-hot-toast";

import { create } from "zustand";

export const useShop = create<shopStore>((set) => ({
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
  fetchMyShops: async()=>{
    try {
      const res = await axios.get(`${BACKEND_URL}/api/shop/my-shops`, {withCredentials: true});
      return res.data || [];
    } catch (error) {
      return []
    }
  }
}));
