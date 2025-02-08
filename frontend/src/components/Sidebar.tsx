import {
  Edit,
  Library,
  ShoppingCart,
} from "lucide-react";

type sidebarProp = {
  setMenu: (menu: string) => void;
  menu: string;
};

const Sidebar = ({ setMenu, menu }: sidebarProp) => {
  return (
    <aside className="flex flex-col w-64 overflow-y-auto h-1/2 border-r border-base-300">
      <div className="flex flex-col justify-between flex-1">
        <nav>

          <div
            className={`flex items-center px-4 py-6 ${
              menu === "customize" ? "bg-base-200" : ""
            } cursor-pointer border-b border-base-300`}
            onClick={() => setMenu("customize")}
          >
            <Edit className="w-5 h-5" />
            <span className="mx-4 font-medium">Customize</span>
          </div>

          <div
            className={`flex items-center px-4 py-6 ${
              menu === "products" ? "bg-base-200" : ""
            } cursor-pointer border-b border-base-300`}
            onClick={() => setMenu("products")}
          >
            <Library className="w-5 h-5" />
            <span className="mx-4 font-medium">Products</span>
          </div>

          <div
            className={`flex items-center px-4 py-6 ${
              menu === "orders" ? "bg-base-200" : ""
            } hover:rounded-lg cursor-pointer border-b border-base-300`}
            onClick={() => setMenu("orders")}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="mx-4 font-medium">Orders</span>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
