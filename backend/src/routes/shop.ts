import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import { handleCreateShop } from "../controllers/shop";

const shopRoutes = new Hono();

shopRoutes.post("/create", protectRoute, handleCreateShop)

export default shopRoutes;