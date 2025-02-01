import { Context } from "hono";
import { prismaClient } from "../utils/prismaClient";
import { createShopSchema } from "../utils/zodSchemas";

export async function handleCreateShop(c: Context) {
  const prisma = prismaClient(c);
  const user = c.get("user")
  const data = await c.req.json();
  try {
    const validatedData = createShopSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
          errors: validatedData.error.errors,
        },
        400
      );
    }
    const {name, currency} = validatedData.data;
    const newShop = await prisma.shop.create({
        data: {
            name,
            currency,
            ownerId: user?.id
        }
    });
    if(!newShop){
        return c.json({msg: "Error in creating shop"}, 400)
    }

    return c.json({id: newShop.id, name: newShop.name}, 200)
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}
