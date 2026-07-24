// Mirrors AddBrand.jsx's layout/structure - form state and submit logic
// live in useInsertProduct (insertProductHooks.js), this component is
// just the layout, extended with category/brand dropdowns, pricing,
// a features list, and multi-image + video upload.
import {
  Save,
  RotateCcw,
  Package,
  FileText,
  ArrowLeft,
  Plus,
  X,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router";
import useInsertProduct from "../../hooks/ProductHooks/insertProductHooks";

const inputClass =
  "w-full border border-gray-300 rounded-xl py-3 px-4 outline-none focus:border-black transition";

const AddProduct = () => {
  const navigate = useNavigate();
  const {
    categories,
    brands,
    form,
    handleChange,
    catAttributes,
    attributeValues,
    handleAttributeChange,
    features,
    featureInput,
    setFeatureInput,
    handleAddFeature,
    handleRemoveFeature,
    imagePreviews,
    handleImageChange,
    handleRemoveImage,
    videoFile,
    handleVideoChange,
    handleSubmit,
    loading,
  } = useInsertProduct();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-gray-500">Admin / Products</p>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
              Add Product
            </h1>

            <p className="text-gray-500 mt-2">
              Create a new product for the catalogue.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/products")}
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
              <Package size={26} className="text-gray-700" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Product Details
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

            {/* Specifications - dynamic, driven by whichever attributes
                are mapped to the selected category (Admin > Attribute
                Mapping), e.g. Condition, RAM, Battery Health for
                Laptops/Desktops. Hidden until a category with mapped
                attributes is chosen. */}
            {catAttributes.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specifications
                </label>

                <div className="grid sm:grid-cols-2 gap-6">
                  {catAttributes.map((attr) => (
                    <div key={attr.attribute_id}>
                      <label className="block text-xs text-gray-500 mb-1">
                        {attr.attribute_display_name}
                      </label>
                      <input
                        type="text"
                        value={attributeValues[attr.attribute_id] || ""}
                        onChange={(e) =>
                          handleAttributeChange(attr.attribute_id, e.target.value)
                        }
                        placeholder={`Enter ${attr.attribute_display_name}`}
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

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

            {/* Pricing / Stock */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Price
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="product_current_price"
                  value={form.product_current_price}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discounted Price
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="product_discounted_price"
                  value={form.product_discounted_price}
                  onChange={handleChange}
                  placeholder="Optional"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  name="product_stock_quantity"
                  value={form.product_stock_quantity}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
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
                Product Images
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

            {/* Video */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Video
              </label>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
                  <Video size={22} className="text-gray-300" />
                </div>

                <div className="flex-1">
                  <input
                    type="file"
                    accept=".mp4,.mov,.avi,.mkv,.webm"
                    onChange={handleVideoChange}
                    className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border file:border-gray-300 file:bg-white file:text-sm file:font-medium file:hover:bg-gray-100 file:transition cursor-pointer"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    {videoFile ? videoFile.name : "Optional, single video file."}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
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
                {loading ? "Saving..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
