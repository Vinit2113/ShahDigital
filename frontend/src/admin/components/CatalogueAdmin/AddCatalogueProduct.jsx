// Mirrors AddProduct.jsx's layout, minus every pricing/stock field - this
// creates a product through the catalogue-only endpoint
// (backend/routes/catalogue.routes.js), same shahDigital.products table.
import {
  Save,
  RotateCcw,
  BookOpen,
  FileText,
  ArrowLeft,
  Plus,
  X,
} from "lucide-react";
import { useNavigate } from "react-router";
import useInsertCatalogueProduct from "../../hooks/CatalogueHooks/insertCatalogueHooks";

const inputClass =
  "w-full border border-gray-300 rounded-xl py-3 px-4 outline-none focus:border-black transition";

const AddCatalogueProduct = () => {
  const navigate = useNavigate();
  const {
    categories,
    brands,
    form,
    handleChange,
    features,
    featureInput,
    setFeatureInput,
    handleAddFeature,
    handleRemoveFeature,
    imagePreviews,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
    loading,
  } = useInsertCatalogueProduct();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-gray-500">Admin / Catalogue</p>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
              Add to Catalogue
            </h1>

            <p className="text-gray-500 mt-2">
              Create a catalogue entry - name, description, category, brand,
              features and images only. Set pricing and stock under{" "}
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="font-medium text-gray-800 underline underline-offset-2 hover:text-black"
              >
                Products
              </button>
              .
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/catalogue")}
            className="flex items-center gap-2 border border-gray-300 px-5 py-3 rounded-xl hover:bg-gray-100 transition w-fit"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-4 sm:px-6 md:px-8 py-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
              <BookOpen size={26} className="text-gray-700" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Catalogue Details
              </h2>
              <p className="text-sm text-gray-500">
                Fill in the information below.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-7">
            {/* Category / Brand */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="cat_id"
                  value={form.cat_id}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select category</option>
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
                  name="brand_id"
                  value={form.brand_id}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select brand</option>
                  {brands.map((brand) => (
                    <option key={brand.brand_id} value={brand.brand_id}>
                      {brand.brand_display_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="product_name"
                value={form.product_name}
                onChange={handleChange}
                placeholder="Example: Dell Vostro 3520 Laptop"
                required
                className={inputClass}
              />
            </div>

            {/* Descriptions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description
              </label>
              <input
                type="text"
                name="short_description"
                value={form.short_description}
                onChange={handleChange}
                placeholder="One line summary shown on the catalogue card"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description
              </label>
              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-4 top-5 text-gray-400"
                />
                <textarea
                  rows={4}
                  name="full_description"
                  value={form.full_description}
                  onChange={handleChange}
                  placeholder="Detailed description..."
                  className={`${inputClass} pl-11 resize-none`}
                />
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                  placeholder="e.g. 16GB RAM, press Enter to add"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="shrink-0 flex items-center gap-1 px-4 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  <Plus size={18} />
                </button>
              </div>

              {features.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {features.map((feature, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catalogue Images
              </label>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.avif"
                multiple
                onChange={handleImageChange}
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border file:border-gray-300 file:bg-white file:text-sm file:font-medium file:hover:bg-gray-100 file:transition cursor-pointer"
              />
              <p className="text-xs text-gray-400 mt-2">
                Up to 10 images. JPG, PNG, WEBP or AVIF.
              </p>

              {imagePreviews.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {imagePreviews.map((src, index) => (
                    <div key={src} className="relative w-20 h-20 shrink-0">
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-xl border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-500 hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin/catalogue")}
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
                {loading ? "Saving..." : "Add to Catalogue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCatalogueProduct;
