import { BACKEND_URL } from "@/lib/backend_url";
import { productStore } from "@/lib/types";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useProduct = create<productStore>(() => ({
  addNewProduct: async (id, formData) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/product/new-product/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        toast.success("Product Added");
        return res.data;
      }
    } catch (error) {
      toast.error("Failed to add product");
    }
  },
}));
