import { useShop } from "@/stores/shopStore";
import { useState } from "react";

function CreateShop() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    currency: "",
  });

  const { createShop } = useShop();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, currency: e.target.value }));
  };

  const handleCreateShop = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await createShop(formData);
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen select-none">
      <form
        className="w-[500px] p-8 rounded-lg border border-base-200 shadow-md"
        onSubmit={handleCreateShop}
      >
        <h1 className="text-3xl font-extrabold text-center">
          Create Your Shop
        </h1>
        <p className="text-lg text-center text-gray-600 mb-10">
          Create your new shop in one-click.
        </p>

        <div className="mb-6">
          <label htmlFor="name" className="block text-base font-medium mb-2">
            Shop Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Shop Name"
            className="input input-bordered w-full rounded-md"
            id="name"
            required
            onChange={handleChange}
            name="name"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="currency"
            className="block text-base font-medium mb-2"
          >
            Shop Currency <span className="text-red-500">*</span>
          </label>
          <select
            id="currency"
            className="select select-bordered w-full rounded-md"
            value={formData.currency}
            onChange={handleCurrencyChange}
            required
          >
            <option disabled value="">
              Select Currency
            </option>
            <option value="usd">USD - US Dollar</option>
            <option value="inr">INR - Indian Rupee</option>
          </select>
        </div>

        <div>
          <button
            className="w-full btn bg-pink-500 text-white text-lg"
            type="submit"
          >
            {isLoading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateShop;
