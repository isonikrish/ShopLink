import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import { handleCreateShop, handleGetMyShops } from "../controllers/shop";

const shopRoutes = new Hono();

shopRoutes.post("/create", protectRoute, handleCreateShop);
shopRoutes.get("/my-shops", protectRoute, handleGetMyShops);


export default shopRoutes;