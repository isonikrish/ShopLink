import { useEffect, useState } from "react";
import { ArrowLeft, IndianRupee } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Shop } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL } from "@/lib/backend_url";
import axios from "axios";
import { useProduct } from "@/stores/productStore";

function AddNewProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const { shopname } = useParams();
  const { addNewProduct } = useProduct();
  const [shop, setShop] = useState<Shop>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    productImage: File,
    price: 0,
    category: "",
    stock: 0,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "price") {
      const parsedPrice = parseFloat(value);
      setFormData((prev) => ({
        ...prev,
        [name]: isNaN(parsedPrice) ? 0 : parsedPrice,
      }));
    } else if (name === "stock") {
      const parsedStock = parseFloat(value);
      setFormData((prev) => ({
        ...prev,
        [name]: isNaN(parsedStock) ? 0 : parsedStock,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, productImage: file }));
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const { data } = useQuery({
    queryKey: ["shop-for-add", shopname],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/shop/my-shop/${shopname}`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          return res.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    staleTime: 120000,
  });

  useEffect(() => {
    setShop(data);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const data: any = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("productImage", formData.productImage);
    data.append("stock", formData.stock);
    if (shop?.id) {
      const response = await addNewProduct(shop?.id, data);
      navigate(`/manage/${shopname}`);
    }

    setIsLoading(false);
  };

  return (
    <div className="p-6 select-none">
      <div className="mt-4 flex gap-5 items-center">
        <button
          className="btn bg-pink-500 text-white rounded-md"
          type="button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>
      <div className="min-h-full flex justify-center items-center w-full">
        <form
          className="w-[500px] p-8 rounded-lg border border-base-200 shadow-md "
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-extrabold text-center mb-5">
            Add a new product
          </h1>

          <div className="mb-6">
            <label htmlFor="name" className="block text-base font-medium mb-2">
              Product Image <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <div className="avatar">
                <div className="w-24 rounded">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <input
                type="file"
                className="file-input w-full max-w-xs"
                id="productImage"
                name="productImage"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="name" className="block text-base font-medium mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="input input-bordered w-full rounded-md"
              id="name"
              required
              onChange={handleChange}
              name="name"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-base font-medium mb-2"
            >
              Product Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full rounded-md"
              placeholder="Describe your product..."
              id="description"
              name="description"
              required
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex gap-3">
            <div className="mb-6">
              <label
                htmlFor="price"
                className="block text-base font-medium mb-2"
              >
                Product Price <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-md">
                <span className="px-3">
                  <IndianRupee />
                </span>
                <input
                  type="number"
                  placeholder="Enter price"
                  className="input input-bordered w-full rounded-md pl-2"
                  id="price"
                  required
                  onChange={handleChange}
                  name="price"
                  step="0.01"
                  min="0"
                  inputMode="decimal"
                  onInput={(e: any) => {
                    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                  }}
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="stock"
                className="block text-base font-medium mb-2"
              >
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-md">
                <input
                  type="number"
                  placeholder="Enter stock quantity"
                  className="input input-bordered w-full rounded-md pl-2"
                  id="stock"
                  required
                  onChange={handleChange}
                  name="stock"
                  min="0"
                  inputMode="decimal"
                  onInput={(e: any) => {
                    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-base font-medium mb-2"
            >
              Product Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              className="select select-bordered w-full rounded-md"
              value={formData.category}
              name="category"
              onChange={handleSelectChange}
              required
            >
              <option disabled value="">
                Select Category
              </option>
              {shop?.categories.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              className="w-full btn bg-pink-500 text-white text-lg"
              type="submit"
            >
              {isLoading ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewProduct;
