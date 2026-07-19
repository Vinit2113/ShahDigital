// "Edit Category" modal, opened from ListCategory.jsx's pencil icon.
// Mirrors BrandEditModal.jsx exactly (overlay + centered card, click
// backdrop to close, image swap with existing-image fallback). One
// difference: the image is OPTIONAL here (categories can be saved
// without one), matching AddCategory.jsx's create form.

import {
  Layers,
  FileText,
  Image as ImageIcon,
  X,
  Save,
  UploadCloud,
} from "lucide-react";

const CATEGORY_IMAGE_BASE = `${import.meta.env.VITE_BACKEND_IMG_URL}/uploads/categories`;

const CategoryEditModal = ({
  editingCategory,
  editData,
  setEditData,
  editImagePreview,
  handleEditImageChange,
  savingEdit,
  handleCancel,
  handleUpdate,
}) => {
  const currentImageUrl = editingCategory?.cat_image
    ? `${CATEGORY_IMAGE_BASE}/${editingCategory.cat_image}`
    : null;

  // New picked file takes priority over the existing saved image.
  const previewSrc = editImagePreview || currentImageUrl;

  return (
    <div
      onClick={() => !savingEdit && handleCancel()}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-pop bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
              <Layers size={22} className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Edit Category
              </h2>
              <p className="text-gray-500 text-sm mt-0.5">
                Update this category's details
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

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
              <Layers size={14} className="text-gray-400" />
              Category Name
            </label>

            <input
              value={editData.cat_name}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  cat_name: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
              <FileText size={14} className="text-gray-400" />
              Description
            </label>

            <textarea
              rows="4"
              value={editData.cat_description}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  cat_description: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:border-black focus:ring-4 focus:ring-black/5 transition"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
              <ImageIcon size={14} className="text-gray-400" />
              Category Image / Icon (optional)
            </label>

            <label className="group flex items-center gap-4 border border-dashed border-gray-300 rounded-2xl p-4 cursor-pointer hover:border-black hover:bg-gray-50 transition">
              <div className="w-16 h-16 rounded-xl border border-gray-200 bg-white flex items-center justify-center overflow-hidden shrink-0 p-1.5">
                {previewSrc ? (
                  <img
                    src={previewSrc}
                    alt={editData.cat_name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <ImageIcon size={22} className="text-gray-300" />
                )}
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  <UploadCloud
                    size={15}
                    className="text-gray-400 group-hover:text-black transition"
                  />
                  {previewSrc ? "Click to replace image" : "Click to add an image"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Leave empty to keep it as-is. JPG, PNG, WEBP or AVIF.
                </p>
              </div>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.avif"
                onChange={handleEditImageChange}
                className="hidden"
              />
            </label>
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

export default CategoryEditModal;
