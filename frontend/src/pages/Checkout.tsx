import { BACKEND_URL } from "@/lib/backend_url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IndianRupee } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    country: "",
    state: "",
    city: "",
    address: "",
  });

  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/user/get-cart`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          return res.data;
        }
      } catch (error) {
        return [];
      }
    },
  });

  const subTotal = data?.reduce(
    (acc: number, item: any) => acc + item.quantity * item.product.price,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const orderItems = data?.map((item: any) => ({
      productId: item.productId,
      shopId: item.product.shopId,
      quantity: item.quantity,
      selectVariants: item.selectedVariants,
    }));
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/user/place-order`,
        { formData, orderItems },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Placed Order");
      }
    } catch (error) {
      toast.error("Failed to place Order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center gap-10 pt-20">
      <form className="w-[500px] p-8 rounded-lg border border-base-200 shadow-md">
        <h1 className="text-3xl font-extrabold text-center">
          Shipping Address
        </h1>

        <div className="mb-6 mt-5">
          <label htmlFor="phone" className="block text-base font-medium mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your phone number"
            className="input input-bordered w-full rounded-md"
            id="phone"
            required
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-6 mt-5">
          <label htmlFor="country" className="block text-base font-medium mb-2">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter country"
            className="input input-bordered w-full rounded-md"
            id="country"
            required
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex gap-2">
          <div className="w-full">
            <label htmlFor="state" className="block text-base font-medium mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter State"
              className="input input-bordered w-full rounded-md"
              id="state"
              required
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full">
            <label htmlFor="city" className="block text-base font-medium mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter city"
              className="input input-bordered w-full rounded-md"
              id="city"
              required
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-6 mt-5">
          <label htmlFor="address" className="block text-base font-medium mb-2">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter address"
            className="input input-bordered w-full rounded-md"
            id="address"
            required
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
      </form>

      <div className="card bg-base-100 w-96 p-6 border border-base-300 mt-3 shadow-lg rounded-lg h-96">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
        <div className="flex items-center mt-2 space-x-2">
          <input
            className="input input-bordered flex-1 rounded-md"
            placeholder="Discount code"
          />
          <button className="btn bg-pink-500 text-white px-4 rounded-md hover:bg-pink-600 transition">
            Apply
          </button>
        </div>

        <ul className="mt-4 space-y-3 border-b border-base-300 pb-4 text-gray-700">
          <li className="flex justify-between text-lg font-medium">
            <span>Sub Total:</span>
            <span className="flex items-center">
              <IndianRupee size={16} />
              {subTotal?.toLocaleString("en-IN")}
            </span>
          </li>
          <li className="flex justify-between text-lg font-medium text-green-600">
            <span>Discount (0%):</span>
            <span>- 0</span>
          </li>
        </ul>

        <div className="flex justify-between p-4 text-xl font-bold text-gray-900">
          <span>Total:</span>
          <span className="flex items-center">
            <IndianRupee size={16} />
            {subTotal?.toLocaleString("en-IN")}
          </span>
        </div>
        <button
          className="btn mt-3 bg-pink-500 text-white text-lg font-semibold rounded-md hover:bg-pink-600 transition px-4"
          onClick={handlePlaceOrder}
        >
          {isLoading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Place order"
          )}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
