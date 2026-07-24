// "Catalogue" dashboard page - now a full CRUD management table for
// catalogue-facing fields (name, description, category, brand, features,
// images). Mirrors ListProduct.jsx's structure (stats row, search, table,
// status toggle, edit modal) but has no pricing/stock anywhere - those stay
// exclusive to ListProduct.jsx/ProductEditModal.jsx. Both operate on the
// same shahDigital.products table (backend/routes/catalogue.routes.js).
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  BookOpen,
  Package,
  Plus,
  Search,
  Pencil,
  Trash2,
  Check,
  X,
} from "lucide-react";
import useCatalogueList from "../../hooks/CatalogueHooks/listCatalogueHooks";
import CatalogueEditModal from "./CatalogueEditModal";

const IMG_BASE = import.meta.env.VITE_BACKEND_IMG_URL;

const ListCatalogue = () => {
  const navigate = useNavigate();

  // FIX: replaces window.confirm() for removing a catalogue item - clicking
  // "delete" (either the status pill or the trash icon) while active now
  // arms this row's id, swapping the trash icon for an inline tick/cross
  // instead of a native browser alert. Restoring an inactive item stays
  // instant (non-destructive, no confirmation needed).
  const [confirmingId, setConfirmingId] = useState(null);

  const {
    catalogue,
    allCatalogue,
    totalCount,
    filteredCount,
    loading,
    search,
    setSearch,
    sort,
    setSort,

    currentPage,
    totalPages,
    handlePageChange,

    categories,
    brands,

    showEditModal,
    editingProduct,
    loadingEditDetail,
    savingEdit,
    editData,
    setEditData,

    editFeatures,
    newFeatureInput,
    setNewFeatureInput,
    savingFeature,
    handleAddFeature,
    handleDeleteFeature,

    editImages,
    newImageFiles,
    handleNewImageChange,
    savingImages,
    handleUploadImages,
    handleDeleteImage,

    handleEdit,
    handleCancel,
    handleUpdate,
    handleStatusToggle,
  } = useCatalogueList();

  const activeCount = allCatalogue.filter((c) => c.is_active).length;
  const inactiveCount = allCatalogue.length - activeCount;
  const categoryCount = new Set(allCatalogue.map((c) => c.category?.cat_id)).size;
  const brandCount = new Set(allCatalogue.map((c) => c.brand?.brand_id)).size;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 mb-8">
          <div>
            <p className="text-sm text-gray-500">Admin / Catalogue</p>

            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              Catalogue
            </h1>

            <p className="text-gray-500 mt-2">
              Manage catalogue content - name, description, category, brand,
              features and images. Set pricing and stock under{" "}
              <button
                onClick={() => navigate("/admin/products")}
                className="font-medium text-gray-800 underline underline-offset-2 hover:text-black"
              >
                Products
              </button>
              .
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/catalogue/new")}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition w-fit"
          >
            <Plus size={18} />
            Add to Catalogue
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-7">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Total Items</p>
            <h2 className="text-3xl font-bold mt-2">{allCatalogue.length}</h2>
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

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Categories / Brands</p>
            <h2 className="text-3xl font-bold mt-2">
              {categoryCount} / {brandCount}
            </h2>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 p-6 flex flex-col lg:flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <BookOpen size={26} className="text-gray-700" />
              </div>

              <div>
                <h2 className="font-semibold text-lg">Catalogue Management</h2>
                <p className="text-sm text-gray-500">
                  View, edit and manage catalogue items.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative flex items-center w-full lg:w-80">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search product, category, brand..."
                  className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-black transition-colors"
                />
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-black transition-colors text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name_asc">Name (A - Z)</option>
                <option value="name_desc">Name (Z - A)</option>
                <option value="category">Category (A - Z)</option>
                <option value="brand">Brand (A - Z)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-6 py-4">Sr. No</th>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Brand</th>
                  <th className="px-6 py-4">Features</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-10 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : catalogue.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-10 text-gray-500">
                      No catalogue items found
                    </td>
                  </tr>
                ) : (
                  catalogue.map((item, index) => (
                    <tr
                      key={item.product_id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition align-top"
                    >
                      <td className="px-6 py-5 text-gray-500">{index + 1}</td>

                      <td className="px-6 py-5">
                        <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                          {item.image ? (
                            <img
                              src={`${IMG_BASE}${item.image}`}
                              alt={item.product_display_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package size={18} />
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-5 max-w-xs">
                        <p className="font-semibold">
                          {item.product_display_name}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                          {item.short_description}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        {item.category?.cat_display_name || "-"}
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        {item.brand?.brand_display_name || "-"}
                      </td>

                      <td className="px-6 py-5 max-w-[14rem]">
                        {item.features?.length ? (
                          <div className="flex flex-wrap gap-1">
                            {item.features.slice(0, 3).map((feature) => (
                              <span
                                key={feature}
                                className="bg-gray-100 text-gray-700 text-xs rounded-md px-2 py-0.5"
                              >
                                {feature}
                              </span>
                            ))}
                            {item.features.length > 3 && (
                              <span className="text-xs text-gray-400 px-1 py-0.5">
                                +{item.features.length - 3} more
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-xs">
                            None listed
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <button
                          onClick={() =>
                            item.is_active
                              ? setConfirmingId(item.product_id)
                              : handleStatusToggle(item)
                          }
                          className={`px-3 py-1 rounded-full text-sm ${
                            item.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {item.is_active ? "Active" : "Inactive"}
                        </button>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            disabled={!item.is_active}
                            className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                            title={
                              item.is_active
                                ? "Edit"
                                : "Restore before editing"
                            }
                          >
                            <Pencil size={18} />
                          </button>

                          {confirmingId === item.product_id ? (
                            <>
                              <button
                                onClick={() => {
                                  handleStatusToggle(item);
                                  setConfirmingId(null);
                                }}
                                className="w-10 h-10 rounded-lg border border-green-200 text-green-600 hover:bg-green-50 flex items-center justify-center"
                                title="Confirm remove"
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
                                item.is_active
                                  ? setConfirmingId(item.product_id)
                                  : handleStatusToggle(item)
                              }
                              className="w-10 h-10 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center"
                              title={item.is_active ? "Remove" : "Restore"}
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

          <div className="border-t border-gray-200 p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-700">{catalogue.length}</span> of{" "}
              <span className="font-semibold text-gray-700">{filteredCount}</span>{" "}
              {filteredCount === 1 ? "item" : "items"}
              {filteredCount !== totalCount && (
                <span className="text-gray-400"> (filtered from {totalCount})</span>
              )}
            </p>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-500 px-2">
                  Page <span className="font-semibold text-gray-700">{currentPage}</span> of{" "}
                  {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showEditModal && (
        <CatalogueEditModal
          editingProduct={editingProduct}
          loadingEditDetail={loadingEditDetail}
          savingEdit={savingEdit}
          editData={editData}
          setEditData={setEditData}
          categories={categories}
          brands={brands}
          editFeatures={editFeatures}
          newFeatureInput={newFeatureInput}
          setNewFeatureInput={setNewFeatureInput}
          savingFeature={savingFeature}
          handleAddFeature={handleAddFeature}
          handleDeleteFeature={handleDeleteFeature}
          editImages={editImages}
          newImageFiles={newImageFiles}
          handleNewImageChange={handleNewImageChange}
          savingImages={savingImages}
          handleUploadImages={handleUploadImages}
          handleDeleteImage={handleDeleteImage}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ListCatalogue;
