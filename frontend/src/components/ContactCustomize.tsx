import { BACKEND_URL } from "@/lib/backend_url";
import { useShop } from "@/stores/shopStore";
import axios from "axios";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaXTwitter } from "react-icons/fa6";

function ContactCustomize() {
  const { MyShop } = useShop();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: MyShop?.email || "",
    phone: MyShop?.phone || "",
    address: MyShop?.address || "",
    facebook_url: MyShop?.facebook_url || "",
    youtube_url: MyShop?.youtube_url || "",
    instagram_url: MyShop?.instagram_url || "",
    x_url: MyShop?.x_url || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/shop/contact-update/${MyShop?.id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        toast.success("Contact Info Updated");
      }
    } catch (error) {
      toast.error("Error in updating contact info");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Contact Information
        </h2>
        <p className="text-sm text-gray-500">
          Update your contact details and social media links below.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="mt-2 p-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone"
              className="mt-2 p-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="w-full max-w-xs">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your address"
            className="mt-2 p-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-full max-w-xs">
              <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
                <Facebook className="text-blue-600" /> Facebook
              </label>
              <input
                type="text"
                name="facebook_url"
                value={formData.facebook_url}
                onChange={handleInputChange}
                placeholder="Facebook profile url"
                className="mt-2 p-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full max-w-xs">
              <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
                <Youtube className="text-red-600" /> Youtube
              </label>
              <input
                type="text"
                name="youtube_url"
                value={formData.youtube_url}
                onChange={handleInputChange}
                placeholder="Youtube channel url"
                className="mt-2 p-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full max-w-xs">
              <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
                <Instagram className="text-pink-600" /> Instagram
              </label>
              <input
                type="text"
                name="instagram_url"
                value={formData.instagram_url}
                onChange={handleInputChange}
                placeholder="Instagram profile url"
                className="mt-2 p-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="w-full max-w-xs">
              <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
                <FaXTwitter className="text-blue-400" /> X
              </label>
              <input
                type="text"
                name="x_url"
                value={formData.x_url}
                onChange={handleInputChange}
                placeholder="X profile url"
                className="mt-2 p-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="btn bg-pink-500 text-white mt-10 w-48 rounded-md"
      >
        {isLoading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          "Update Contact Info"
        )}
      </button>
    </div>
  );
}

export default ContactCustomize;
