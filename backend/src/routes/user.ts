import { Hono } from "hono";
import { handleAddToCart, handleGetCart, handleGetMe, handleGetMyOrders, handleLogin, handleLogout, handlePlaceOrder, handleQuantityDecrement, handleQuantityIncrement, handleSignup } from "../controllers/user";
import { protectRoute } from "../utils/protectRoute";

const userRoutes = new Hono();

userRoutes.post("/signup", handleSignup);
userRoutes.post("/login", handleLogin);
userRoutes.post("/logout", protectRoute, handleLogout);
userRoutes.get("/me", protectRoute, handleGetMe);
userRoutes.post("/add-to-cart", protectRoute, handleAddToCart);
userRoutes.get("/get-cart", protectRoute, handleGetCart);
userRoutes.put("/quantity-increment/:id", protectRoute, handleQuantityIncrement);
userRoutes.put("/quantity-decrement/:id", protectRoute, handleQuantityDecrement);
userRoutes.post("/place-order", protectRoute, handlePlaceOrder);
userRoutes.get("/my-orders", protectRoute, handleGetMyOrders);

export default userRoutes;