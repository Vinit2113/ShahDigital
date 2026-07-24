// "All Products" dashboard table - mirrors ListBrand.jsx/ListCategory.jsx
// (stats row, search, table, status toggle) via useProductList
// (listProductHooks.js). Routed at /admin/products (see App.jsx) - the
// sidebar's "All Products" link already pointed here with no page behind
// it until now.
import { useState } from "react";
import { Package, Plus, Search, Pencil, Trash2, Check, X } from "lucide-react";
import { useNavigate } from "react-router";
import useProductList from "../../hooks/ProductHooks/listProductHooks";
import ProductEditModal from "./ProductEditModal";

// media_url already includes the full "/uploads/products/images/..." path
// (see backend/controllers/product_media/createMedia.controller.js), so
// it's just appended to the base URL - same pattern as CatalogueCard.jsx.
const IMG_BASE = import.meta.env.VITE_BACKEND_IMG_URL;

const ListProduct = () => {
  const navigate = useNavigate();

  // FIX: replaces window.confirm() for deactivating/deleting a product -
  // clicking the status pill or trash icon on an active row now arms this
  // row's id, swapping the trash icon for an inline tick/cross instead of a
  // native browser alert. Restoring an inactive product stays instant
  // (non-destructive, no confirmation needed). Same pattern as
  // ListCategory.jsx.
  const [confirmingId, setConfirmingId] = useState(null);

  const {
    products,
    loading,
    search,
    setSearch,
    categories,
    brands,
    showEditModal,
    editingProduct,
    loadingEditDetail,
    savingEdit,
    editData,
    setEditData,
    editCatAttributes,
    editAttributeValues,
    handleEditAttributeChange,
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
    handleDelete,
    handleStatusToggle,
  } = useProductList();

  const activeCount = products.filter((p) => p.is_active).length;
  const inactiveCount = products.length - activeCount;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 mb-8">
          <div>
            <p className="text-sm text-gray-500">Admin / Products</p>

            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              Products
            </h1>

            <p className="text-gray-500 mt-2">
              Manage the products shown in the public catalogue.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/products/new")}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5 mb-7">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Total Products</p>
            <h2 className="text-3xl font-bold mt-2">{products.length}</h2>
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
          <div className="border-b border-gray-200 p-6 flex flex-col lg:flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
                <Package size={26} className="text-gray-700" />
              </div>

              <div>
                <h2 className="font-semibold text-lg">Product Management</h2>
                <p className="text-sm text-gray-500">
                  View, edit and manage products.
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
                placeholder="Search product, category, brand..."
                className="border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-black"
              />
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
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-10 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-10 text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.map((product, index) => (
                    <tr
                      key={product.product_id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-5 text-gray-500">{index + 1}</td>

                      <td className="px-6">
                        <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                          {product.image ? (
                            <img
                              src={`${IMG_BASE}${product.image}`}
                              alt={product.product_display_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package size={18} />
                          )}
                        </div>
                      </td>

                      <td className="px-6">
                        <p className="font-semibold">
                          {product.product_display_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID #{product.product_id}
                        </p>
                      </td>

                      <td className="px-6 text-sm text-gray-600">
                        {product.category?.cat_display_name || "-"}
                      </td>

                      <td className="px-6 text-sm text-gray-600">
                        {product.brand?.brand_display_name || "-"}
                      </td>

                      <td className="px-6 text-sm">
                        {product.product_discounted_price ? (
                          <>
                            <span className="text-gray-400 line-through mr-1">
                              ₹{product.product_current_price}
                            </span>
                            <span className="font-semibold text-gray-800">
                              ₹{product.product_discounted_price}
                            </span>
                          </>
                        ) : (
                          <span className="font-semibold text-gray-800">
                            ₹{product.product_current_price}
                          </span>
                        )}
                      </td>

                      <td className="px-6 text-sm text-gray-600">
                        {product.product_stock_quantity}
                      </td>

                      <td className="px-6">
                        <button
                          onClick={() =>
                            product.is_active
                              ? setConfirmingId(product.product_id)
                              : handleStatusToggle(product)
                          }
                          className={`px-3 py-1 rounded-full text-sm ${
                            product.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {product.is_active ? "Active" : "Inactive"}
                        </button>
                      </td>

                      <td className="px-6">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                          >
                            <Pencil size={18} />
                          </button>

                          {confirmingId === product.product_id ? (
                            <>
                              <button
                                onClick={() => {
                                  handleDelete(product);
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
                                product.is_active
                                  ? setConfirmingId(product.product_id)
                                  : handleStatusToggle(product)
                              }
                              className="w-10 h-10 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center"
                              title={product.is_active ? "Delete" : "Restore"}
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

          <div className="border-t border-gray-200 p-5 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Total Products :
              <span className="font-semibold ml-1">{products.length}</span>
            </p>
          </div>
        </div>
      </div>

      {showEditModal && (
        <ProductEditModal
          editingProduct={editingProduct}
          loadingEditDetail={loadingEditDetail}
          savingEdit={savingEdit}
          editData={editData}
          setEditData={setEditData}
          categories={categories}
          brands={brands}
          editCatAttributes={editCatAttributes}
          editAttributeValues={editAttributeValues}
          handleEditAttributeChange={handleEditAttributeChange}
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

export default ListProduct;
