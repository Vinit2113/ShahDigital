// "Edit Catalogue Item" modal, opened from ListCatalogue.jsx's pencil icon.
// Mirrors ProductEditModal.jsx minus pricing/stock fields - those stay
// exclusive to the Products section's edit modal.
import {
  BookOpen,
  FileText,
  X,
  Save,
  Plus,
  Trash2,
  UploadCloud,
} from "lucide-react";

const IMG_BASE = import.meta.env.VITE_BACKEND_IMG_URL;

const inputClass =
  "w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition";

const CatalogueEditModal = ({
  editingProduct,
  loadingEditDetail,
  savingEdit,
  editData,
  setEditData,
  categories,
  brands,
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
  handleCancel,
  handleUpdate,
}) => {
  return (
    <div
      onClick={() => !savingEdit && handleCancel()}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-pop bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
              <BookOpen size={22} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Edit Catalogue Item
              </h2>
              <p className="text-gray-500 text-sm mt-0.5">
                {editingProduct?.product_display_name}
              </p>
            </div>
          </div>

          <button
            onClick={handleCancel}
            disabled={savingEdit}
            className="w-9 h-9 rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-600 flex items-center justify-center transition shrink-0 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {loadingEditDetail ? (
          <div className="p-10 text-center text-gray-500">
            Loading catalogue item...
          </div>
        ) : (
          <>
            {/* Body */}
            <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
              {/* Category / Brand */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={editData.cat_id}
                    onChange={(e) =>
                      setEditData({ ...editData, cat_id: e.target.value })
                    }
                    className={inputClass}
                  >
                    {categories.map((cat) => (
                      <option key={cat.cat_id} value={cat.cat_id}>
                        {cat.cat_display_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <select
                    value={editData.brand_id}
                    onChange={(e) =>
                      setEditData({ ...editData, brand_id: e.target.value })
                    }
                    className={inputClass}
                  >
                    {brands.map((brand) => (
                      <option key={brand.brand_id} value={brand.brand_id}>
                        {brand.brand_display_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  value={editData.product_name}
                  onChange={(e) =>
                    setEditData({ ...editData, product_name: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <input
                  value={editData.short_description}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      short_description: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                  <FileText size={14} className="text-gray-400" />
                  Full Description
                </label>
                <textarea
                  rows={3}
                  value={editData.full_description}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      full_description: e.target.value,
                    })
                  }
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Features */}
              <div className="border-t border-gray-100 pt-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeatureInput}
                    onChange={(e) => setNewFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    placeholder="Add a feature and press Enter"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    disabled={savingFeature}
                    className="shrink-0 flex items-center gap-1 px-4 rounded-xl border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {editFeatures.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {editFeatures.map((feature) => (
                      <span
                        key={feature.feature_id}
                        className="flex items-center gap-2 bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full"
                      >
                        {feature.feature_name}
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteFeature(feature.feature_id)
                          }
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Images */}
              <div className="border-t border-gray-100 pt-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images
                </label>

                {editImages.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-4">
                    {editImages.map((img) => (
                      <div key={img.id} className="relative w-20 h-20 shrink-0">
                        <img
                          src={`${IMG_BASE}${img.url}`}
                          alt={img.alt_text || ""}
                          className="w-full h-full object-cover rounded-xl border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(img.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-500 hover:text-red-500"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.avif"
                    multiple
                    onChange={handleNewImageChange}
                    className="flex-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-gray-300 file:bg-white file:text-sm file:font-medium file:hover:bg-gray-100 file:transition cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={handleUploadImages}
                    disabled={savingImages || newImageFiles.length === 0}
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
                  >
                    <UploadCloud size={16} />
                    {savingImages ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-5 flex justify-end gap-3 bg-gray-50">
              <button
                onClick={handleCancel}
                disabled={savingEdit}
                className="px-5 py-2.5 rounded-xl border border-gray-300 font-medium hover:bg-gray-100 transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={savingEdit}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition disabled:opacity-50"
              >
                <Save size={16} />
                {savingEdit ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </>
        )}
      </div>

      <style>
        {`
          @keyframes modalPop {
            0% { opacity: 0; transform: scale(0.95) translateY(8px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }

          .modal-pop {
            animation: modalPop 0.18s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default CatalogueEditModal;
