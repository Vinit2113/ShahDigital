// CATEGORIES ADMIN SECTION - COMPLETE (create), including an optional
// category image/icon upload. Part of a 2-page flow with ListCategory.jsx
// (list/edit/delete/restore). Category Tree was removed entirely - it
// showed fake data and served no real purpose (see git history).
import React from "react";
import {
  Save,
  RotateCcw,
  Layers,
  FileText,
  ArrowLeft,
  Image as ImageIcon,
} from "lucide-react";
import { useNavigate } from "react-router";
import addCatHook from "../../hooks/CategoryHooks/inserCategoryHooks";

const AddCategory = () => {
  const navigate = useNavigate();
  const {
    form,
    handleChange,
    imageFile,
    imagePreview,
    handleImageChange,
    handleSubmit,
    loading,
  } = addCatHook();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-gray-500">Admin / Categories</p>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
              Create Category
            </h1>

            <p className="text-gray-500 mt-2">
              Create a new product category for organizing your products.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/categories/list")}
            className="flex items-center gap-2 border border-gray-300 px-5 py-3 rounded-xl hover:bg-gray-100 transition w-fit"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="border-b border-gray-200 px-4 sm:px-6 md:px-8 py-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
              <Layers size={26} className="text-gray-700" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Category Details
              </h2>

              <p className="text-sm text-gray-500">
                Fill in the information below.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-7">
            {/* Category Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>

              <div className="relative">
                <Layers
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Example: Electronics"
                  required
                  className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-black transition"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-4 top-5 text-gray-400"
                />

                <textarea
                  rows={5}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Write a short description..."
                  className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none resize-none focus:border-black transition"
                />
              </div>
            </div>

            {/* Category Image / Icon - OPTIONAL, unlike brand logos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Image / Icon (optional)
              </label>

              <div className="flex items-center gap-5">
                <div className="w-24 h-24 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 p-2">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Category preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <ImageIcon size={28} className="text-gray-300" />
                  )}
                </div>

                <div className="flex-1">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.avif"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border file:border-gray-300 file:bg-white file:text-sm file:font-medium file:hover:bg-gray-100 file:transition cursor-pointer"
                  />

                  <p className="text-xs text-gray-400 mt-2">
                    JPG, PNG, WEBP or AVIF. Leave empty to create the
                    category without an icon.
                  </p>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-700 mb-3">
                Preview Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Category Name
                  </p>

                  <p className="font-medium text-gray-700 mt-1">
                    {form.name || "Not entered"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Status
                  </p>

                  <span
                    className={`inline-flex mt-1 px-3 py-1 rounded-full text-sm ${
                      form.name
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {form.name ? "Ready to Create" : "Waiting for Name"}
                  </span>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Description
                  </p>

                  <p className="text-gray-700 mt-1">
                    {form.description || "No description added."}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 flex justify-end gap-4">
              <button
                type="button"
                // onClick={() => navigate(-1)}
                className="flex items-center gap-2 border border-gray-300 px-5 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                <RotateCcw size={18} />
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Create Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
