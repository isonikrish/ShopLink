import { useState } from "react";
import { THEMES } from "@/lib/theme";
import { useShop } from "@/stores/shopStore";

const ApperanceCustomize = () => {
  const { MyShop , apperanceUpdateShop} = useShop();
  const [selectedTheme, setSelectedTheme] = useState(MyShop?.theme||THEMES[0]);
  const [isLoading, setIsLoading] = useState(false);

  const updateApperance = async () => {
    setIsLoading(true)
    if(MyShop?.id) await apperanceUpdateShop(MyShop.id, selectedTheme);
    setIsLoading(false)
  };

  return (
    <div className="container">
      <div className="space-y-6">
        <div className="flex gap-10">
          <div>
            <h2 className="text-lg font-semibold">Theme</h2>
            <p className="text-sm text-base-content/70">
              Choose a theme for your shop
            </p>
          </div>
          <div className="mt-4">
            <button
              className="w-full btn bg-pink-500 text-white rounded-md"
              type="submit"
              onClick={updateApperance}
            >
              {isLoading ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                "Update Theme"
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                selectedTheme === t ? "bg-base-300" : ""
              }`}
              onClick={() => setSelectedTheme(t)}
            >
              <div
                className="relative h-8 w-full rounded-md overflow-hidden border border-base-300"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApperanceCustomize;
