import { Layers, FileText, Save, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router";
import addAttributeHook from "../../hooks/AttributesHooks/insertAttributeHooks";

const AddAttribute = () => {
  const navigate = useNavigate();

  const { form, handleChange, handleSubmit, loading } = addAttributeHook();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">Admin / Attributes</p>

          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            Create Attribute
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new product attribute that can be assigned to product
            categories.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="border-b border-gray-200 px-8 py-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
              <Layers size={26} className="text-gray-700" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Attribute Details
              </h2>

              <p className="text-sm text-gray-500">
                Fill in the information below.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-7">
            {/* Attribute Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attribute Name
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
                  placeholder="Example: Color"
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
                  rows="5"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Write a short description..."
                  className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none resize-none focus:border-black transition"
                />
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
                    Attribute Name
                  </p>

                  <p className="font-medium text-gray-700 mt-1">Color</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Status
                  </p>

                  <span className="inline-flex mt-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                    Ready to Create
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 flex justify-end gap-4">
              <button
                type="reset"
                className="flex items-center gap-2 border border-gray-300 px-5 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                <RotateCcw size={18} />
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Add Attribute"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAttribute;
