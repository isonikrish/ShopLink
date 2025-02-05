import {
  Users,
  Edit,
  Library,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  House,
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
              menu === "home" ? "bg-base-200" : ""
            } cursor-pointer border-b border-base-300 hover:bg-base-200`}
            onClick={() => setMenu("home")}
          >
            <House className="w-5 h-5" />
            <span className="mx-4 font-medium">Home</span>
          </div>

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
              menu === "collaborators" ? "bg-base-200" : ""
            } cursor-pointer border-b border-base-300`}
            onClick={() => setMenu("collaborators")}
          >
            <Users className="w-5 h-5" />
            <span className="mx-4 font-medium">Collaborators</span>
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

          <div
            className={`flex items-center px-4 py-6 ${
              menu === "analytics" ? "bg-base-200" : ""
            } hover:rounded-lg cursor-pointer border-b border-base-300`}
            onClick={() => setMenu("analytics")}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="mx-4 font-medium">Analytics</span>
          </div>

          <div
            className={`flex items-center px-4 py-6 ${
              menu === "payouts" ? "bg-base-200" : ""
            } hover:rounded-lg cursor-pointer border-b border-base-300`}
            onClick={() => setMenu("payouts")}
          >
            <DollarSign className="w-5 h-5" />
            <span className="mx-4 font-medium">Payouts</span>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
