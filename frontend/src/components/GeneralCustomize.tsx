import { useShop } from "@/stores/shopStore";
import { useState } from "react";

function GeneralCustomize() {
  const { MyShop, generalUpdateShop } = useShop();
  const [previewLogo, setPreviewLogo] = useState(MyShop?.logo);
  const [isLoading, setIsLoading] = useState(false);
  const [generalCustomize, setGeneralCustomize] = useState({
    logo: MyShop?.logo || File,
    name: MyShop?.name || "",
    description: MyShop?.description || "",
  });
  

  const handleLogoChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setGeneralCustomize({ ...generalCustomize, logo: file });
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  const handleSubmitChanges = async () => {
    setIsLoading(true);
    const data = new FormData();
    data.append("name", generalCustomize.name);
    data.append("description", generalCustomize.description);
    if (generalCustomize.logo instanceof File) {
      data.append("logo", generalCustomize.logo);
    }

    if (MyShop?.id) await generalUpdateShop(MyShop?.id, data);
    setIsLoading(false);
  };
  return (
    <div className="p-6 rounded-xl w-full space-y-6 border border-base-300">
      <div className="card bg-base-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Shop Logo</h2>
        <div className="flex items-center gap-10 w-full">
          <div className="avatar">
            <div className="w-28 h-28 rounded-full">
              <img src={previewLogo || MyShop?.logo} alt="Shop Logo" />
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered "
            onChange={handleLogoChange}
          />
        </div>
      </div>
      <div className="card bg-base-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Shop Name</h2>
        <input
          type="text"
          placeholder="Enter shop name"
          className="input input-bordered w-full rounded-md"
          value={generalCustomize?.name}
          onChange={(e) =>
            setGeneralCustomize({ ...generalCustomize, name: e.target.value })
          }
        />
      </div>

      <div className="card bg-base-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Shop Description</h2>
        <textarea
          className="textarea textarea-bordered w-full rounded-md"
          placeholder="Describe your shop..."
          value={generalCustomize?.description}
          onChange={(e) =>
            setGeneralCustomize({
              ...generalCustomize,
              description: e.target.value,
            })
          }
        ></textarea>
      </div>

      <button
        className="btn bg-pink-500 text-white mt-3 w-36 rounded-md"
        onClick={handleSubmitChanges}
      >
        {isLoading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}

export default GeneralCustomize;
