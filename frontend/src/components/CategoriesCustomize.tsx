import { useRef, useState } from "react";
import { Plus, Trash } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "@/lib/backend_url";
import { useShop } from "@/stores/shopStore";
import toast from "react-hot-toast";

function CategoriesCustomize() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { MyShop } = useShop();
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const openModal = () => {
    modalRef.current?.showModal();
  };
  const handleAddCategory = async () => {
    try {
      setIsLoading(true);
      const res = await axios.put(
        `${BACKEND_URL}/api/shop/add-shop-category/${MyShop?.id}`,
        { category },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Category Added");
      }
    } catch (error) {
      toast.error("Error in adding category");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-6 rounded-lg">
      <div className="flex items-center gap-5 mb-10">
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-900">Categories</h2>
          <p className="text-sm text-gray-500">
            Add and manage your shop categories.
          </p>
        </div>

        <button
          className="btn bg-pink-500 text-white rounded-md"
          type="button"
          onClick={openModal}
        >
          <Plus /> Add Category
        </button>
        <dialog ref={modalRef} id="my_modal_1" className="modal">
          <div className="modal-box p-6 rounded-lg">
            <h3 className="font-semibold text-xl mb-4 text-gray-800">
              Add Category
            </h3>
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-sm text-gray-600">
                Category Name
              </label>
              <input
                id="category"
                type="text"
                placeholder="Enter category name"
                className="input w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="modal-action mt-4 flex justify-end gap-3">
              <form method="dialog">
                <button className="btn border border-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-100">
                  Close
                </button>
              </form>

              <button
                className="btn bg-pink-500 text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-pink-600"
                type="button"
                onClick={handleAddCategory}
              >
                {isLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  <>
                    <Plus size={16} /> Add
                  </>
                )}
              </button>
            </div>
          </div>
        </dialog>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-base-200">
              <th className="p-3 text-left text-gray-700">Category Name</th>
              <th className="p-3 text-center text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MyShop?.categories.map((category, index) => {
              return (
                <tr className="border-b" key={index}>
                  <td className="p-3">{category}</td>
                  <td className="p-3 text-center">
                    <button className="text-red-500 hover:text-red-700">
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoriesCustomize;
