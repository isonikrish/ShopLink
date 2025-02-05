import { BACKEND_URL } from "@/lib/backend_url";
import axios from "axios";
import { ArrowLeft, Plus } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function ManageProduct() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    variantType: "",
    variantName: "",
  });

  const handleAddVariant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/api/product/add-variant/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast.success("New Variant Added");
        setFormData({ variantType: "", variantName: "" });
      }
    } catch (error) {
      toast.error("Error in adding variant");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-6">
      <div className="mt-4 flex gap-5 items-center">
        <button
          className="btn bg-pink-500 text-white rounded-md"
          type="button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <form
        className="w-[500px] p-8 rounded-lg border border-base-200 shadow-md flex flex-col m-10"
        onSubmit={handleAddVariant}
      >
        <h1 className="text-3xl font-extrabold text-center mb-5">
          Add a variant
        </h1>
        <div className="mb-6">
          <label htmlFor="name" className="block text-base font-medium mb-2">
            Variant Type <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter variant type - color/size"
            className="input input-bordered w-full rounded-md"
            id="variantType"
            required
            name="variantType"
            onChange={(e) =>
              setFormData({ ...formData, variantType: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="block text-base font-medium mb-2">
            Variant Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter variant name - pink/xl"
            className="input input-bordered w-full rounded-md"
            id="variantName"
            required
            name="variantName"
            onChange={(e) =>
              setFormData({ ...formData, variantName: e.target.value })
            }
          />
        </div>
        <button className="btn bg-pink-500 text-white rounded-md" type="submit">
          {isLoading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            <>
              <Plus size={16} /> Add Variant
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ManageProduct;
