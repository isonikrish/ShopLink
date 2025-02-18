import { Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { useUser } from "./stores/userStore";
import { useEffect } from "react";
import CreateShop from "./pages/CreateShop";
import { ProtectedRoute } from "./lib/protectRoute";
import MyShops from "./pages/MyShops";
import ManageShop from "./pages/ManageShop";
import AddNewProduct from "./pages/AddNewProduct";
import ManageProduct from "./pages/ManageProduct";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import { Footer } from "./components/Footer";

function App() {
  const { fetchUser, user } = useUser();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Authentication />} />
        <Route
          path="/create-shop"
          element={
            <ProtectedRoute>
              <CreateShop />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-shops"
          element={
            <ProtectedRoute>
              <MyShops />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage/:shopname"
          element={
            <ProtectedRoute>
              <ManageShop />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/manage/:shopname/add-new"
          element={
            <ProtectedRoute>
              <AddNewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage/:shopname/p/:id"
          element={
            <ProtectedRoute>
              <ManageProduct />
            </ProtectedRoute>
          }
        />
        <Route path="/shop/:shopname" element={<Shop />} />
        <Route path="/product/:id" element={<Product />}/>
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/orders" element={<Orders />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
