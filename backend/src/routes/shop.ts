import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import {
  handleAddCategory,
  handleChangeApperance,
  handleChangeOrderStatus,
  handleContactUpdate,
  handleCreateShop,
  handleGeneralUpdate,
  handleGetMyShop,
  handleGetMyShops,
  handleGetOrders,
} from "../controllers/shop";
import { isOwner } from "../utils/authorize";

const shopRoutes = new Hono();

shopRoutes.post("/create", protectRoute, handleCreateShop);
shopRoutes.get("/my-shops", protectRoute, handleGetMyShops);
shopRoutes.get("/my-shop/:shopname", protectRoute, handleGetMyShop);
shopRoutes.put("/general-update/:id", protectRoute, handleGeneralUpdate);
shopRoutes.put(
  "/change-apperance/:id",
  protectRoute,
  isOwner,
  handleChangeApperance
);
shopRoutes.put(
  "/contact-update/:id",
  protectRoute,
  isOwner,
  handleContactUpdate
);
shopRoutes.put(
  "/add-shop-category/:id",
  protectRoute,
  isOwner,
  handleAddCategory
);

shopRoutes.get("/orders/:id", protectRoute, handleGetOrders);
shopRoutes.put("/change-order-status/:id", protectRoute, handleChangeOrderStatus);


export default shopRoutes;
