// CATEGORIES ADMIN SECTION - COMPLETE (list/search/edit-via-modal/delete
// + restore, with active/inactive stats, and an image thumbnail column).
// Companion page: AddCategory.jsx (create). Category Tree was removed
// entirely - it showed fake data and served no real purpose.
import { useState } from "react";
import {
  Layers,
  Boxes,
  Plus,
  Search,
  Pencil,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { useNavigate } from "react-router";
import useCategory from "../../hooks/CategoryHooks/commontCatHooks";
import CategoryEditModal from "./CategoryEditModal";

// cat_image is stored as a bare filename (same pattern as brand_image),
// so it has to be assembled here: backend base URL + the static
// /uploads/categories mount (see backend/app.js).
const CATEGORY_IMAGE_BASE = `${import.meta.env.VITE_BACKEND_IMG_URL}/uploads/categories`;

const ListCategory = () => {
  const navigate = useNavigate();

  // FIX: replaces window.confirm() for deactivating/deleting a category -
  // clicking the status pill or trash icon on an active row now arms this
  // row's id, swapping the trash icon for an inline tick/cross instead of a
  // native browser alert. Restoring an inactive category stays instant
  // (non-destructive, no confirmation needed).
  const [confirmingId, setConfirmingId] = useState(null);

  const {
    categories,
    loading,
    showEditModal,
    editingCategory,
    savingEdit,
    editData,
    setEditData,
    editImagePreview,
    handleEditImageChange,
    search,
    setSearch,
    handleEdit,
    handleCancel,
    handleUpdate,
    handleDelete,
    handleStatusToggle,
  } = useCategory();

  const activeCount = categories.filter((c) => c.cat_is_active).length;
  const inactiveCount = categories.length - activeCount;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 mb-8">
          <div>
            <p className="text-sm text-gray-500">Admin / Categories</p>

            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              Product Categories
            </h1>

            <p className="text-gray-500 mt-2">
              Manage categories used across products.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/categories/new")}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5 mb-7">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Total Categories</p>

            <h2 className="text-3xl font-bold mt-2">{categories.length}</h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Active</p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {activeCount}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Inactive</p>

            <h2 className="text-3xl font-bold text-red-500 mt-2">
              {inactiveCount}
            </h2>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="border-b border-gray-200 p-6 flex flex-col lg:flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
                <Layers size={26} className="text-gray-700" />
              </div>

              <div>
                <h2 className="font-semibold text-lg">Category Management</h2>

                <p className="text-sm text-gray-500">
                  View, edit and manage categories.
                </p>
              </div>
            </div>

            <div className="relative flex align-center">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search category..."
                className="border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-6 py-4">Image</th>

                  <th className="px-6 py-4">Category</th>

                  <th className="px-6 py-4">Description</th>

                  <th className="px-6 py-4">Created</th>

                  <th className="px-6 py-4">Status</th>

                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr
                      key={category.cat_id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      {/* Image */}

                      <td className="px-6 py-5">
                        <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 p-1.5">
                          {category.cat_image ? (
                            <img
                              src={`${CATEGORY_IMAGE_BASE}/${category.cat_image}`}
                              alt={category.cat_display_name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Boxes size={18} className="text-gray-400" />
                          )}
                        </div>
                      </td>

                      {/* Category */}

                      <td className="px-6">
                        <p className="font-semibold">
                          {category.cat_display_name}
                        </p>

                        <p className="text-xs text-gray-500">
                          ID #{category.cat_id}
                        </p>
                      </td>

                      {/* Description */}

                      <td className="px-6 text-gray-500 max-w-sm">
                        {category.cat_description}
                      </td>

                      {/* Created */}

                      <td className="px-6">
                        {category.created_at
                          ? new Date(category.created_at).toLocaleDateString()
                          : "-"}
                      </td>

                      {/* Status */}

                      <td className="px-6">
                        <button
                          onClick={() =>
                            category.cat_is_active
                              ? setConfirmingId(category.cat_id)
                              : handleStatusToggle(category)
                          }
                          className={`px-3 py-1 rounded-full text-sm ${
                            category.cat_is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {category.cat_is_active ? "Active" : "Inactive"}
                        </button>
                      </td>

                      {/* Actions */}

                      <td className="px-6">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                          >
                            <Pencil size={18} />
                          </button>

                          {confirmingId === category.cat_id ? (
                            <>
                              <button
                                onClick={() => {
                                  handleDelete(category.cat_id);
                                  setConfirmingId(null);
                                }}
                                className="w-10 h-10 rounded-lg border border-green-200 text-green-600 hover:bg-green-50 flex items-center justify-center"
                                title="Confirm delete"
                              >
                                <Check size={18} />
                              </button>

                              <button
                                onClick={() => setConfirmingId(null)}
                                className="w-10 h-10 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 flex items-center justify-center"
                                title="Cancel"
                              >
                                <X size={18} />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() =>
                                category.cat_is_active
                                  ? setConfirmingId(category.cat_id)
                                  : handleStatusToggle(category)
                              }
                              className="w-10 h-10 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center"
                              title={
                                category.cat_is_active ? "Delete" : "Restore"
                              }
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}

          <div className="border-t border-gray-200 p-5 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Total Categories :
              <span className="font-semibold ml-1">{categories.length}</span>
            </p>

            <button className="bg-black text-white px-5 py-2 rounded-lg">
              Page 1
            </button>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {showEditModal && (
        <CategoryEditModal
          editingCategory={editingCategory}
          editData={editData}
          setEditData={setEditData}
          editImagePreview={editImagePreview}
          handleEditImageChange={handleEditImageChange}
          savingEdit={savingEdit}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ListCategory;
