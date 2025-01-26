import { Context } from "hono";
import { loginSchema, signupSchema } from "../utils/zodSchemas";
import { prismaClient } from "../utils/prismaClient";
import { passwordCompare, passwordHash } from "../utils/passwordHash";
import { generateTokenAndSetCookie } from "../utils/generateToken";
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

    return c.json({ msg: "User Created" }, 200);
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
    const isMatch = await passwordCompare(password, isUserExists.password)

    if (!isUserExists) return c.json({ msg: "User don't exists" }, 400);
    if (!isMatch) return c.json({ msg: "Password is incorrect" }, 400);

    generateTokenAndSetCookie(isUserExists.id, c);

    return c.json({msg: "Logged In"},200)
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};