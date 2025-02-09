import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import { isOwner } from "../utils/authorize";
import { handleAddVariant, handleGetFeaturedProducts, handleGetProduct, handleNewProduct } from "../controllers/product";

const productRoutes = new Hono();

productRoutes.post("/new-product/:id",protectRoute, isOwner, handleNewProduct);
productRoutes.get("/get-product/:id", handleGetProduct);
productRoutes.post("/add-variant/:id", protectRoute, handleAddVariant);
productRoutes.get("/featured-products", handleGetFeaturedProducts);


export default productRoutes;