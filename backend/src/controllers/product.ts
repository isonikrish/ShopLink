import { Context } from "hono";
import { addProductSchema } from "../utils/zodSchemas";
import { prismaClient } from "../utils/prismaClient";

export async function handleNewProduct(c: Context) {
  const data = await c.req.parseBody();
  const id = parseInt(c.req.param("id"));
  const prisma = prismaClient(c);
  try {
    const validatedData = addProductSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
          errors: validatedData.error.errors,
        },
        400
      );
    }
    const { name, description, category, price, productImage } =
      validatedData.data;
    const bucket = c.env.HONO_R2_UPLOAD;
    const fileKey = `/product-images/${name}-${id}`;
    const uploadResult = await bucket.put(fileKey, productImage);
    if (!uploadResult) {
      return c.json({ msg: "Failed to upload file to R2" }, 500);
    }
    const fileUrl = `${c.env.bucket_url}/${fileKey}`;

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        category,
        price: parseFloat(price),
        productImage: fileUrl,
        shopId: id,
      },
    });
    if (!newProduct) return c.json({ msg: "Error creating new product" }, 400);

    return c.json(newProduct, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}
