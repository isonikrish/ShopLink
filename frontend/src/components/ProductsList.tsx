import { useShop } from "@/stores/shopStore";
import { PackagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProductsList() {
  const navigate = useNavigate();
  const { MyShop } = useShop();
  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-5 mb-10">
        <div className="mt-4">
          <h2 className="text-3xl font-bold">Products</h2>
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
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price ({MyShop?.currency})</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {MyShop?.products.map((product: any, index: any) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={product.productImage}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <th>
                    <button
                      className="btn bg-pink-500 text-white rounded-md"
                      type="button"
                      onClick={() =>
                        navigate(`/manage/${MyShop?.name}/p/${product.id}`)
                      }
                    >
                      Manage
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsList;
