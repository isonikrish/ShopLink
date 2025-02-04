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
        <Route path="/manage/:shopname" element={<ManageShop />}/>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
