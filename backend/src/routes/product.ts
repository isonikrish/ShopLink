import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import { isOwner } from "../utils/authorize";
import { handleNewProduct } from "../controllers/product";

const productRoutes = new Hono();

productRoutes.post("/new-product/:id",protectRoute, isOwner, handleNewProduct);

export default productRoutes;