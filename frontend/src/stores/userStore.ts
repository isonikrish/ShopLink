import { BACKEND_URL } from "@/lib/backend_url";
import { LoginInput, SignupInput, userStore } from "@/lib/types";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useUser = create<userStore>((set) => ({
  user: null,
  fetchUser: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/user/me`, {
        withCredentials: true,
      });
      set({ user: response.data });
    } catch (error: any) {
      set({ user: null });
    }
  },
  logout: async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        set({ user: null });
        toast.success("Logout");
      }
    } catch (error) {
      toast.error("Logout Failed");
    }
  },
  signup: async (formData: SignupInput) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/signup`, formData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Signup Successfull");
        set({ user: res.data });
      }
    } catch (error) {
      toast.error("Signup Failed");
    }
  },
  login: async (formData: LoginInput) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/login`, formData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Login Successfull");
        set({ user: res.data });
      }
    } catch (error) {
      toast.error("Login Failed");
    }
  },
}));
