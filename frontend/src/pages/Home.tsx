import { MoveRight, Store } from "lucide-react";
import banner from "/banner_img.png";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-full">
      <div className="min-h-screen flex justify-center flex-col items-center gap-10 px-6 py-16">
        <div className="w-full text-center space-y-6">
          <h1 className="text-6xl font-extrabold text-gray-800 mb-4">
            Create, Sell, Shop - A Marketplace Without Limits
          </h1>
          <p className="text-lg text-gray-600">
            Join our platform and experience a seamless way to create your shop,
            discover amazing products, and shop with ease.
          </p>
          <div className="flex justify-center gap-6">
            <Link className="btn transition-all transform hover:scale-105 px-8 text-lg rounded-lg flex items-center gap-2" to={'/login'}>
              Get Started <MoveRight />
            </Link>
            <Link className="btn transition-all transform hover:scale-105 px-8 text-lg rounded-lg bg-pink-500 text-white hover:bg-pink-400 flex items-center gap-2" to={'/create-shop'}>
              Create Your Shop <Store />
            </Link>
          </div>
        </div>
        <div className="w-1/2">
          <div className="border-4 border-pink-500 rounded-xl overflow-hidden">
            <img
              src={banner}
              alt="Marketplace Banner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <FeaturedProducts />
    </div>
  );
}

export default Home;
