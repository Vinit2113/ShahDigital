import React from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router";

const ListCategory = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "Mobile, laptops, gadgets and electronic items",
    },
    {
      id: 2,
      name: "Fashion",
      description: "Clothing, shoes and accessories",
    },
    {
      id: 3,
      name: "Home & Kitchen",
      description: "Furniture, appliances and kitchen products",
    },
  ];

  const handleDelete = (id) => {
    console.log("Delete category:", id);
  };

  const handleEdit = (id) => {
    navigate(`/category/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your product categories.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/categories/new")}
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-950 text-white hover:bg-gray-800 transition"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Category List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-4 border-b border-gray-200 text-sm font-medium text-gray-600">
          <div className="col-span-1">IDs.</div>

          <div className="col-span-4">Category Name</div>

          <div className="col-span-5">Description</div>

          <div className="col-span-2 text-center">Actions</div>
        </div>

        {categories.map((category, index) => (
          <div
            key={category.id}
            className="grid grid-cols-12 items-center px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <div className="col-span-1 text-gray-500">{index + 1}</div>

            <div className="col-span-4">
              <h3 className="font-medium text-gray-900">{category.name}</h3>
            </div>

            <div className="col-span-5 text-sm text-gray-500">
              {category.description}
            </div>

            <div className="col-span-2 flex justify-center gap-3">
              {/* Edit */}
              <button
                onClick={() => handleEdit(category.id)}
                className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
                title="Edit Category"
              >
                <Edit size={18} />
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDelete(category.id)}
                className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                title="Delete Category"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCategory;
