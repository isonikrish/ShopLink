import { Context } from "hono";
import { prismaClient } from "./prismaClient";

export async function isOwner(c: Context, next: any) {
  try {
    const id = c.req.param("id");
    const shopId = parseInt(id, 10);
    const user = c.get("user");
    const prisma = prismaClient(c);
    if (isNaN(shopId) || !user) {
      return c.json({ msg: "Invalid request" }, 400);
    }
    const shop = await prisma.shop.findFirst({
      where: { id: shopId },
    });
    if (!shop) {
      return c.json({ msg: "Shop not found" }, 404);
    }
    const isOwner = shop.ownerId === user.id;
    if (!isOwner) {
      return c.json({ msg: "Unauthorized" }, 403);
    }

   return next();
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}
