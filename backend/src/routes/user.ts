import { Hono } from "hono";
import { handleAddToCart, handleGetCart, handleGetMe, handleLogin, handleLogout, handleQuantityDecrement, handleQuantityIncrement, handleSignup } from "../controllers/user";
import { protectRoute } from "../utils/protectRoute";

const userRoutes = new Hono();

userRoutes.post("/signup", handleSignup);
userRoutes.post("/login", handleLogin);
userRoutes.post("/logout", protectRoute, handleLogout);
userRoutes.get("/me", protectRoute, handleGetMe);
userRoutes.post("/add-to-cart", protectRoute, handleAddToCart);
userRoutes.get("/get-cart", protectRoute, handleGetCart)
userRoutes.put("/quantity-increment/:id", protectRoute, handleQuantityIncrement)
userRoutes.put("/quantity-decrement/:id", protectRoute, handleQuantityDecrement)
export default userRoutes;