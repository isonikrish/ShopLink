import { useUser } from "../stores/userStore";
import { Bell, LogOut, ShoppingCart, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function ProfileDropdown() {
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-600 text-neutral-content w-12 h-12 rounded-full flex items-center justify-center"
      >
        <span className="text-xl">{user?.name?.[0] || "U"}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 shadow-md rounded-lg z-10 bg-base-100 border border-base-300">
          <ul className="p-2">
            <li className="p-2 border-b border-base-200 rounded-md">
              <div className="flex items-center gap-2">
                <div className="bg-gray-600 text-neutral-content w-7 h-7 rounded-full flex items-center justify-center">
                  <span className="text-sm">{user?.name?.[0] || "U"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{user?.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </div>
            </li>
            <li className="p-2 hover:bg-base-200 rounded-md">
              <Link to="/my-shops" className="flex items-center">
                <Store size={16} className="mr-2" />
                My Shops
              </Link>
            </li>
            <li className="p-2 hover:bg-base-200 rounded-md">
              <Link to="/orders" className="flex items-center">
                <ShoppingCart size={16} className="mr-2" />
                Orders
              </Link>
            </li>
            <li
              className="p-2 cursor-pointer flex items-center border-t border-base-200 hover:bg-base-200 rounded-md"
              onClick={logout}
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
