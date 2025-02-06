import { Hono } from "hono";
import { handleAddToCart, handleGetCart, handleGetMe, handleLogin, handleLogout, handleSignup } from "../controllers/user";
import { protectRoute } from "../utils/protectRoute";

const userRoutes = new Hono();

userRoutes.post("/signup", handleSignup);
userRoutes.post("/login", handleLogin);
userRoutes.post("/logout", protectRoute, handleLogout);
userRoutes.get("/me", protectRoute, handleGetMe);
userRoutes.post("/add-to-cart", protectRoute, handleAddToCart);
userRoutes.get("/get-cart", protectRoute, handleGetCart)

export default userRoutes;