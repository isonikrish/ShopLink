import { IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

function ShopProduct({ product, shop }: any) {
  return (
    <div>
      <div className="card bg-base-100 w-72 shadow-xl border-secondary border m-4">
        <figure className="relative">
          <img
            src={product?.productImage}
            alt={product?.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
        </figure>

        <div className="card-body">
          <div className="space-y-4">
            <h2 className="card-title text-xl font-bold ">{product?.name}</h2>

            <Link
              className="flex items-center gap-2 underline"
              to={`/shop/${shop.name}`}
            >
              <div className="avatar">
                <div className="w-5 h-5 rounded-full">
                  <img src={shop?.logo} alt={shop?.name} />
                </div>
              </div>
              <span className="text-sm font-medium">{shop?.name}</span>
            </Link>

            <div className="badge badge-secondary mt-2 flex items-center space-x-1">
              <span>
                <IndianRupee size={16} />
              </span>
              <p className="text-lg font-semibold">
                {product?.price.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="card-actions justify-between mt-4">
            <Link
              className="btn btn-secondary w-full mt-2"
              to={`/product/${product?.id}`}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopProduct;
