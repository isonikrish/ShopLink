import {  ShoppingBag, Store } from "lucide-react";
import logo from "/shoplink.png";
import { Link } from "react-router-dom";
import { useUser } from "../stores/userStore";
import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between py-3 px-4 border border-b border-base-300 shadow-sm">
      <Link className="w-[130px] cursor-pointer" to={"/"}>
        <img src={logo} className="w-full h-full object-contain" />
      </Link>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">

          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-pink-500"
          >
            <ShoppingBag size={30} />
            <span className="absolute top-0 right-0 text-xs text-white bg-pink-500 rounded-full w-4 h-4 flex items-center justify-center">
              {user?.cart?.length}
            </span>
          </Link>
        </div>
        {user ? (
          <div className="flex items-center gap-4">
            <Link
              className="btn w-36 rounded-lg bg-pink-500 text-white flex items-center justify-center gap-2 py-2 px-4"
              to={"/create-shop"}
            >
              <Store className="w-5 h-5" />
              <span>Create Shop</span>
            </Link>

            <ProfileDropdown />
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to={"/login"}>
              <button className="btn rounded-lg bg-pink-500 text-white w-[100px]">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
