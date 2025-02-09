import { IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
function ProductCard({ product }: any) {
  return (
    <div className="max-w-sm rounded-lg border border-base-300">
      <div className="relative">
        <img
          src={product?.productImage}
          alt="Product"
          className="w-full h-56 object-cover rounded-t-lg"
        />
        
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {product?.name}
        </h3>

        {product?.category && (
          <p className="text-sm text-gray-600 mb-2">
            <strong>Category:</strong> {product?.category}
          </p>
        )}

        <Link
          className="flex items-center gap-2 underline"
          to={`/shop/${product.shop.name}`}
        >
          <div className="avatar">
            <div className="w-5 h-5 rounded-full">
              <img src={product.shop?.logo} alt={product.shop?.name} />
            </div>
          </div>
          <span className="text-sm font-medium">{product.shop?.name}</span>
        </Link>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <span>
              <IndianRupee size={16} />
            </span>
            <p className="text-lg font-semibold">
              {product?.price.toLocaleString("en-IN")}
            </p>
          </div>
          <Link className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-400 transition-all duration-300" to={`/product/${product.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
