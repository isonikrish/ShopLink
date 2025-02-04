import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import { handleChangeApperance, handleContactUpdate, handleCreateShop, handleGeneralUpdate, handleGetMyShop, handleGetMyShops } from "../controllers/shop";

const shopRoutes = new Hono();

shopRoutes.post("/create", protectRoute, handleCreateShop);
shopRoutes.get("/my-shops", protectRoute, handleGetMyShops);
shopRoutes.get("/my-shop/:shopname", protectRoute,handleGetMyShop);
shopRoutes.put("/general-update/:id", protectRoute, handleGeneralUpdate);
shopRoutes.put("/change-apperance/:id", protectRoute, handleChangeApperance);
shopRoutes.put("/contact-update/:id", protectRoute, handleContactUpdate);
export default shopRoutes;