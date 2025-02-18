import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const createShopSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
});

export const addProductSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  description: z.string().min(1),
  category: z.string(),
  price: z.string(),
  productImage: z.any(),
  stock:z.string(),
});
