import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

import logo from "/shoplink.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "@/stores/userStore";
import ProfiileDropdown from "./ProfileDropdown";

function Navbar() {
  const { user } = useUser();
  return (
    <nav className="flex items-center justify-between p-4 border-b shadow-sm">
      <Link className="w-32 cursor-pointer" to={"/"}>
        <img
          src={logo}
          alt="ShopLink Logo"
          className="w-full h-auto object-contain"
        />
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center cursor-pointer">
            <Heart size={23} />
          </div>
          <div className="w-10 h-10 flex items-center cursor-pointer">
            <ShoppingBag size={23} />
          </div>
        </div>
        {user ? (
          <ProfiileDropdown />
        ) : (
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
