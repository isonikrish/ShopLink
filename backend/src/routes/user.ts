import { Hono } from "hono";
import { handleGetMe, handleLogin, handleLogout, handleSignup } from "../controllers/user";
import { protectRoute } from "../utils/protectRoute";

const userRoutes = new Hono();

userRoutes.post("/signup", handleSignup);
userRoutes.post("/login", handleLogin);
userRoutes.post("/logout", protectRoute, handleLogout);
userRoutes.get("/me", protectRoute, handleGetMe);

export default userRoutes;
