import { Context } from "hono";
import { prismaClient } from "../utils/prismaClient";
import { createShopSchema } from "../utils/zodSchemas";

export async function handleCreateShop(c: Context) {
  const prisma = prismaClient(c);
  const user = c.get("user");
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
    const { name, currency } = validatedData.data;
    const newShop = await prisma.shop.create({
      data: {
        name,
        currency,
        ownerId: user?.id,
      },
    });
    if (!newShop) {
      return c.json({ msg: "Error in creating shop" }, 400);
    }

    return c.json({ id: newShop.id, name: newShop.name }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}
export async function handleGetMyShops(c: Context) {
  const prisma = prismaClient(c);
  const user = c.get("user");
  try {
    const myShops = await prisma.shop.findMany({
      where: { ownerId: user.id },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },

      },
    });
    if (myShops.length === 0) {
      return c.json({ msg: "No Shops Created" }, 404);
    }

    return c.json(myShops, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}

export async function handleGetMyShop(c: Context) {
  const prisma = prismaClient(c);
  const user = c.get("user");
  try {
    const myShop = await prisma.shop.findFirst({
      where: { ownerId: user.id },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        products: true,
        variants: true
      },
    });
    if (!myShop) {
      return c.json({ msg: "Shop not found" }, 404);
    }

    return c.json(myShop, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}

export async function handleGeneralUpdate(c: Context) {
  const prisma = prismaClient(c);
  const id = c.req.param("id");
  const formData = await c.req.parseBody();
  const user = c.get("user");
  const shopId = parseInt(id, 10);
  if (isNaN(shopId)) {
    return c.json({ msg: "Invalid course ID" }, 400);
  }
  try {
    const shop = await prisma.shop.findFirst({
      where: { id: shopId, ownerId: user?.id },
    });
    if (!shop) {
      return c.json({ msg: "You don't have access to edit this shop" }, 403);
    }
    const { logo, name, description, currency } = formData;
    if (logo) {
      // Delete old logo from r2
      const oldfileUrl = shop?.logo;
      if (oldfileUrl) {
        const bucketUrl = c.env.bucket_url;
        const oldFileKey = oldfileUrl
          .replace(`${bucketUrl}/`, "")
          .split("?")[0];
        if (oldFileKey) {
          const bucket = c.env.HONO_R2_UPLOAD;
          try {
            await bucket.delete(oldFileKey);
          } catch (deleteError) {
            return c.json({ msg: "Failed to delete old file from R2" }, 500);
          }
        }
      }
      const bucket = c.env.HONO_R2_UPLOAD;

      const fileKey = `logo/${shopId}-${Date.now()}`;
      const uploadResult = await bucket.put(fileKey, logo);

      if (!uploadResult) {
        return c.json({ msg: "Failed to upload file to R2" }, 500);
      }

      const fileUrl = `${c.env.bucket_url}/${fileKey}`;
      await prisma.shop.update({
        where: { id: shop.id },
        data: {
          name,
          description,
          currency,
          logo: fileUrl,
        },
      });
    } else {
      await prisma.shop.update({
        where: { id: shop.id },
        data: {
          name,
          description,
          currency,
        },
      });
    }
    return c.json({ msg: "Shop Updated" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}

export async function handleChangeApperance(c: Context) {
  const prisma = prismaClient(c);
  const id = c.req.param("id");
  const shopId = parseInt(id, 10);
  const user = c.get("user");
  if (isNaN(shopId) || !user) {
    return c.json({ msg: "Invalid request" }, 400);
  }
  const data = await c.req.json();
  try {
    const { theme } = data;
    if (!theme) {
      return c.json({ msg: "Invalid inputs" }, 400);
    }
    await prisma.shop.update({
      where: { id: shopId },
      data: {
        theme,
      },
    });

    return c.json({ msg: "Theme Updated" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}

export async function handleContactUpdate(c: Context) {
  const prisma = prismaClient(c);
  const id = c.req.param("id");
  const shopId = parseInt(id, 10);
  const user = c.get("user");
  if (isNaN(shopId) || !user) {
    return c.json({ msg: "Invalid request" }, 400);
  }
  const data = await c.req.json();
  try {
    const {
      email,
      phone,
      address,
      facebook_url,
      youtube_url,
      instagram_url,
      x_url,
    } = data;

    await prisma.shop.update({
      where: { id: shopId },
      data: {
        email: email || null,
        phone: phone || null,
        address: address || null,
        facebook_url: facebook_url || null,
        youtube_url: youtube_url || null,
        instagram_url: instagram_url || null,
        x_url: x_url || null,
      },
    });

    return c.json({ msg: "Contact Info Updated" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}

export async function handleAddCategory(c: Context) {
  const prisma = prismaClient(c);
  const id = c.req.param("id");
  const shopId = parseInt(id, 10);
  const user = c.get("user");
  if (isNaN(shopId) || !user) {
    return c.json({ msg: "Invalid request" }, 400);
  }
  const data = await c.req.json();
  try {
    const { category } = data;
    if (!category || typeof category !== "string") {
      return c.json({ msg: "Invalid category name" }, 400);
    }

    await prisma.shop.update({
      where: { id: shopId },
      data: {
        categories: {
          push: category,
        },
      },
    });
    return c.json({ msg: "Category added successfully" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal server error" }, 500);
  }
}
