import { useShop } from "@/stores/shopStore";
import { PackagePlus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProductsList() {
  const navigate = useNavigate();
  const { MyShop } = useShop();
  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-5 mb-10">
        <div className="mt-4">
          <h2 className="text-3xl font-semibold">Products</h2>
          <p className="text-sm text-gray-500">Add and manage your products.</p>
        </div>

        <button
          className="btn bg-pink-500 text-white rounded-md"
          type="button"
          onClick={() => navigate(`/manage/${MyShop?.name}/add-new`)}
        >
          <PackagePlus /> Add New
        </button>
      </div>
    </div>
  );
}

export default ProductsList;
