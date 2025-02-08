import { Context } from "hono";
import {
  loginSchema,
  placeOrderSchema,
  signupSchema,
} from "../utils/zodSchemas";
import { prismaClient } from "../utils/prismaClient";
import { passwordCompare, passwordHash } from "../utils/passwordHash";
import { generateTokenAndSetCookie } from "../utils/generateToken";
import { setCookie } from "hono/cookie";
export async function handleSignup(c: Context) {
  const prisma = prismaClient(c);
  try {
    const data = await c.req.json();
    const validatedData = signupSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
          errors: validatedData.error.errors,
        },
        400
      );
    }
    const { name, email, password } = validatedData.data;
    const isUserExists = await prisma.user.findFirst({
      where: { email: email },
    });
    if (isUserExists) return c.json({ msg: "User already exists" }, 400);
    const hashedPassword = await passwordHash(password);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    if (!newUser) {
      return c.json({ msg: "Error in creating a user" }, 400);
    }
    generateTokenAndSetCookie(newUser.id, c);

    return c.json(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      { status: 200 }
    );
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}
export const handleLogin = async (c: Context) => {
  const prisma = prismaClient(c);
  try {
    const data = await c.req.json();
    const validatedData = loginSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
          errors: validatedData.error.errors,
        },
        400
      );
    }
    const { email, password } = validatedData.data;
    const isUserExists = await prisma.user.findFirst({
      where: { email: email },
    });
    const isMatch = await passwordCompare(password, isUserExists.password);

    if (!isUserExists) return c.json({ msg: "User don't exists" }, 400);
    if (!isMatch) return c.json({ msg: "Password is incorrect" }, 400);

    generateTokenAndSetCookie(isUserExists.id, c);

    return c.json(
      {
        id: isUserExists.id,
        email: isUserExists.email,
        name: isUserExists.name,
      },
      { status: 200 }
    );
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};
export const handleLogout = async (c: Context) => {
  try {
    setCookie(c, "token", "", {
      httpOnly: true,
      secure: true,
      maxAge: 0,
      path: "/",
      sameSite: "Lax",
    });
    return c.json({ msg: "Logout successful." }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};
export const handleGetMe = async (c: Context) => {
  const prisma = prismaClient(c);
  try {
    const { id } = c.get("user");
    const user = await prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        cart: true,
      },
    });
    if (!user) return c.json({ msg: "User doen't exists" }, 400);
    return c.json(user, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};

export async function handleAddToCart(c: Context) {
  const prisma = prismaClient(c);
  const user = c.get("user");
  try {
    const data = await c.req.json();
    const { productId, selectedVariants } = data;
    if (!productId || !selectedVariants) {
      return c.json({ msg: "No Data provided" }, 400);
    }
    const newCartItem = await prisma.cartItem.create({
      data: {
        userId: parseInt(user.id),
        productId: parseInt(productId),
        selectedVariants,
      },
    });
    if (!newCartItem) return c.json({ msg: "Item not added in cart" }, 400);
    return c.json({ msg: "Added to cart" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}
export async function handleGetCart(c: Context) {
  const prisma = prismaClient(c);
  const user = c.get("user");
  try {
    const cart = await prisma.cartItem.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: {
          include: {
            shop: true,
          },
        },
      },
    });
    if (cart.length === 0) return c.json({ msg: "No item found in cart" }, 400);
    return c.json(cart, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}

export async function handleQuantityIncrement(c: Context) {
  const prisma = prismaClient(c);

  const id = parseInt(c.req.param("id"));

  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
    });
    if (!cartItem) {
      return c.json({ msg: "Cart item not found" }, 404);
    }

    const updateCartItem = await prisma.cartItem.update({
      where: { id },
      data: {
        quantity: cartItem.quantity + 1,
      },
    });
    return c.json({ msg: "Updated" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}
export async function handleQuantityDecrement(c: Context) {
  const prisma = prismaClient(c);

  const id = parseInt(c.req.param("id"));

  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
    });
    if (!cartItem) {
      return c.json({ msg: "Cart item not found" }, 404);
    }

    const updateCartItem = await prisma.cartItem.update({
      where: { id },
      data: {
        quantity: cartItem.quantity - 1,
      },
    });
    return c.json({ msg: "Updated" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}

export async function handlePlaceOrder(c: Context) {
  const prisma = prismaClient(c);
  const user = c.get("user");
  const data = await c.req.json();
  try {
    const validatedData = placeOrderSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
          errors: validatedData.error.errors,
        },
        400
      );
    }
    const { phone, country, state, city, address } = validatedData.data;

    const newOrder = await prisma.order.create({
      data: {
        userId: user.id,
        phone,
        country,
        state,
        city,
        address,
      },
    });
    if (!newOrder) return c.json({ msg: "Failed to order" }, 400);
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: user.id,
        orderId: null,
      },
    });
    if (cartItems.length === 0) {
      return c.json({ msg: "No items in cart" }, 400);
    }
    await prisma.cartItem.updateMany({
      where: {
        id: {
          in: cartItems.map((item: any) => item.id), // Get the cart item IDs
        },
      },
      data: {
        orderId: newOrder.id,
      },
    });
    return c.json({ msg: "Order placed" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}
