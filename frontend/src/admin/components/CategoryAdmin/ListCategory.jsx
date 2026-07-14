import { Edit, Trash2, Plus, Check, X } from "lucide-react";
import { useNavigate } from "react-router";

import { useEffect, useState } from "react";
import useCategory from "../../hooks/CategoryHooks/commontCatHooks";

const ListCategory = () => {
  const navigate = useNavigate();

  const {
    categories,
    loading,
    editId,
    editData,
    setEditData,
    handleEdit,
    handleCancel,
    handleUpdate,
    handleDelete,
    handleRestore,
    handleStatusToggle,
  } = useCategory();

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
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-4 border-b border-gray-200 text-sm font-semibold text-gray-600 bg-gray-50">
          <div className="col-span-1">#</div>
          <div className="col-span-2">Name</div>
          <div className="col-span-2">Display Name</div>
          <div className="col-span-3">Description</div>
          <div className="col-span-1">Created</div>
          <div className="col-span-1">Updated</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>

        {categories.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            No categories found.
          </div>
        ) : (
          categories.map((category, index) => (
            <div
              key={category.cat_id}
              className="grid grid-cols-12 items-center px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition"
            >
              <div className="col-span-1 text-gray-500">{index + 1}</div>

              {/* Name */}
              <div className="col-span-2 font-medium text-gray-900">
                {editId === category.cat_id ? (
                  <input
                    value={editData.cat_name}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        cat_name: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                ) : (
                  category.cat_name
                )}
              </div>

              <div className="col-span-2">{category.cat_display_name}</div>

              {/* Description */}
              <div className="col-span-3 text-sm text-gray-500 truncate">
                {editId === category.cat_id ? (
                  <textarea
                    value={editData.cat_description}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        cat_description: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                ) : (
                  category.cat_description
                )}
              </div>

              <div className="col-span-1 text-sm text-gray-500">
                {category.created_at
                  ? new Date(category.created_at).toLocaleDateString()
                  : "-"}
              </div>

              <div className="col-span-1 text-sm text-gray-500">
                {category.updated_at
                  ? new Date(category.updated_at).toLocaleDateString()
                  : "-"}
              </div>

              <div className="col-span-1 flex justify-center">
                <button
                  onClick={() => handleStatusToggle(category)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    category.cat_is_active
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  {category.cat_is_active ? "Active" : "Inactive"}
                </button>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex justify-center gap-3">
                {editId === category.cat_id ? (
                  <>
                    <button
                      onClick={() => handleUpdate(category.cat_id)}
                      className="p-2 rounded-lg border border-green-200 text-green-600 hover:bg-green-50"
                    >
                      <Check size={18} />
                    </button>

                    <button
                      onClick={handleCancel}
                      className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(category.cat_id)}
                      className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListCategory;
