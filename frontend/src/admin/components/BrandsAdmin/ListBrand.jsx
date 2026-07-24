// "All Brands" dashboard table - mirrors ListCategory.jsx's structure
// (stats row, search, inline-edit table, status toggle) via useBrandList
// (listBrandHooks.js). Columns: Sr. No, Image, Brand Name, Created,
// Status, Actions.
// Routed at /admin/brands (see App.jsx) - the sidebar's "All Brands" link
// already pointed here with no page behind it until now.

import { useState } from "react";
import { Tag, Plus, Search, Pencil, Trash2, Check, X } from "lucide-react";
import { useNavigate } from "react-router";
import useBrandList from "../../hooks/BrandHooks/listBrandHooks";
import BrandEditModal from "./BrandEditModal";

// brand_image is stored as a bare filename (not a full path) by
// createBrands.controller.js, so it has to be assembled here: backend
// base URL + the static /uploads/brands mount (see backend/app.js).
// FIX: uses VITE_BACKEND_IMG_URL (no trailing slash, already used the
// same way in CatalogueCard.jsx) instead of VITE_BACKEND_URL - that one
// has a trailing slash ("http://localhost:3197/"), which produced a
// double slash before "uploads" (".../3197//uploads/...") and Express's
// static file server 404s on that instead of normalizing it.
const BRAND_IMAGE_BASE = `${import.meta.env.VITE_BACKEND_IMG_URL}/uploads/brands`;

const ListBrand = () => {
  const navigate = useNavigate();

  // FIX: replaces window.confirm() for deactivating/deleting a brand -
  // clicking the status pill or trash icon on an active row now arms this
  // row's id, swapping the trash icon for an inline tick/cross instead of a
  // native browser alert. Restoring an inactive brand stays instant
  // (non-destructive, no confirmation needed). Same pattern as
  // ListCategory.jsx.
  const [confirmingId, setConfirmingId] = useState(null);

  const {
    brands,
    loading,
    showEditModal,
    editingBrand,
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
  } = useBrandList();

  const activeCount = brands.filter((b) => b.brand_is_active).length;
  const inactiveCount = brands.length - activeCount;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 mb-8">
          <div>
            <p className="text-sm text-gray-500">Admin / Brands</p>

            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              Product Brands
            </h1>

            <p className="text-gray-500 mt-2">
              Manage brands used across products.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/brands/new")}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            <Plus size={18} />
            Add Brand
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5 mb-7">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Total Brands</p>

            <h2 className="text-3xl font-bold mt-2">{brands.length}</h2>
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
                <Tag size={26} className="text-gray-700" />
              </div>

              <div>
                <h2 className="font-semibold text-lg">Brand Management</h2>

                <p className="text-sm text-gray-500">
                  View, edit and manage brands.
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
                placeholder="Search brand..."
                className="border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-6 py-4">Sr. No</th>

                  <th className="px-6 py-4">Image</th>

                  <th className="px-6 py-4">Brand Name</th>

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
                ) : brands.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      No brands found
                    </td>
                  </tr>
                ) : (
                  brands.map((brand, index) => (
                    <tr
                      key={brand.brand_id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      {/* Sr. No */}

                      <td className="px-6 py-5 text-gray-500">{index + 1}</td>

                      {/* Image */}

                      <td className="px-6">
                        {/* FIX: fixed-size square frame (w-11 h-11) + object-contain
                            so every logo renders at a consistent size regardless of
                            its original resolution/aspect ratio, instead of
                            object-cover cropping non-square logos unpredictably. */}
                        <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 p-1.5">
                          {brand.brand_image ? (
                            <img
                              src={`${BRAND_IMAGE_BASE}/${brand.brand_image}`}
                              alt={brand.brand_display_name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Tag size={18} />
                          )}
                        </div>
                      </td>

                      {/* Brand Name */}

                      <td className="px-6">
                        <p className="font-semibold">
                          {brand.brand_display_name}
                        </p>

                        <p className="text-xs text-gray-500">
                          ID #{brand.brand_id}
                        </p>
                      </td>

                      {/* Created */}

                      <td className="px-6">
                        {brand.created_at
                          ? new Date(brand.created_at).toLocaleDateString()
                          : "-"}
                      </td>

                      {/* Status */}

                      <td className="px-6">
                        <button
                          onClick={() =>
                            brand.brand_is_active
                              ? setConfirmingId(brand.brand_id)
                              : handleStatusToggle(brand)
                          }
                          className={`px-3 py-1 rounded-full text-sm ${
                            brand.brand_is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {brand.brand_is_active ? "Active" : "Inactive"}
                        </button>
                      </td>

                      {/* Actions */}

                      <td className="px-6">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(brand)}
                            className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                          >
                            <Pencil size={18} />
                          </button>

                          {confirmingId === brand.brand_id ? (
                            <>
                              <button
                                onClick={() => {
                                  handleDelete(brand.brand_id);
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
                                brand.brand_is_active
                                  ? setConfirmingId(brand.brand_id)
                                  : handleStatusToggle(brand)
                              }
                              className="w-10 h-10 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center"
                              title={brand.brand_is_active ? "Delete" : "Restore"}
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
              Total Brands :
              <span className="font-semibold ml-1">{brands.length}</span>
            </p>

            <button className="bg-black text-white px-5 py-2 rounded-lg">
              Page 1
            </button>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {showEditModal && (
        <BrandEditModal
          editingBrand={editingBrand}
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

export default ListBrand;
