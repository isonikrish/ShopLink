import { useShop } from "@/stores/shopStore";
import { useState } from "react";
import GeneralCustomize from "./GeneralCustomize";
import ApperanceCustomize from "./ApperanceCustomize";
import ContactCustomize from "./ContactCustomize";
import CategoriesCustomize from "./CategoriesCustomize";

function CustomizeShop() {
  const { MyShop } = useShop();
  const [customizeMenu, setCustomizeMenu] = useState("general");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-base-content mb-6">
        Customize Your Shop:{" "}
        <span className="text-pink-500">{MyShop?.name}</span>
      </h1>

      <div>
        <ul className="menu menu-horizontal bg-base-200 rounded-lg">
          {[
            { key: "general", label: "General Settings" },
            { key: "categories", label: "Categories" },
            { key: "appearance", label: "Appearance" },
            { key: "contact", label: "Contact Details" },
            
          ].map((tab) => (
            <li key={tab.key} onClick={() => setCustomizeMenu(tab.key)}>
              <a
                className={`font-medium px-4 py-2 rounded-lg transition-all ${
                  customizeMenu === tab.key ? "bg-pink-500 text-white" : ""
                }`}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 w-full">
        {customizeMenu === "general" && (
          <GeneralCustomize />
        )}


        {customizeMenu === "appearance" && (
          <div className="card border border-base-300 p-4">
            <ApperanceCustomize />
          </div>
        )}
        {customizeMenu === "contact" && (
          <div className="card border border-base-300 p-4">
            <ContactCustomize />
          </div>
        )}
        {customizeMenu === "categories" && (
          <div className="card border border-base-300 p-4">
            <CategoriesCustomize />
          </div>
        )}

      </div>
    </div>
  );
}

export default CustomizeShop;
