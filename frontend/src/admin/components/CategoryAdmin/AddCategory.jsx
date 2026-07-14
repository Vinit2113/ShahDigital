import React, { useState } from "react";
import { Save, ArrowLeft, ImagePlus } from "lucide-react";
import { useNavigate } from "react-router";
import addCatHook from "../../hooks/CategoryHooks/inserCategoryHooks";

const AddCategory = () => {
  const navigate = useNavigate();
  const { form, handleChange, handleSubmit, loading } = addCatHook();
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Add Category</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create a new product category.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/categories/list")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl p-6 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter category name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>

          <textarea
            rows={5}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write category description..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none resize-none focus:border-gray-500"
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-950 text-white hover:bg-gray-800 cursor-pointer"
          >
            <Save size={18} className="" />
            Save Category
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
