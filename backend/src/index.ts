import { Hono } from 'hono'
import { cors } from 'hono/cors';
import userRoutes from './routes/user';
import shopRoutes from './routes/shop';
import productRoutes from './routes/product';

const app = new Hono()
app.use(
  "*",
  cors({
    origin: "https://shoplink-two.vercel.app", 
    credentials: true,
  })
);
app.use("*", (c, next) => {
  c.header("Access-Control-Allow-Origin", "https://shoplink-two.vercel.app");
  c.header("Access-Control-Allow-Credentials", "true");
  return next();
});

app.route("/api/user", userRoutes);
app.route("/api/shop", shopRoutes);
app.route("/api/product", productRoutes);

export default app
