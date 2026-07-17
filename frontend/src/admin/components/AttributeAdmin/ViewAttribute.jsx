import { Layers, ArrowLeft, Pencil } from "lucide-react";

const ViewAttribute = () => {
  // Dummy data only
  const attribute = {
    attribute_id: 12,

    attribute_name: "color",

    attribute_display_name: "Color",

    attribute_description: "Defines the available colors for products.",

    attribute_is_active: true,

    created_at: "2026-07-15",

    updated_at: "2026-07-20",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between gap-5 mb-8">
          <div className="flex items-center gap-4">
            <button className="w-11 h-11 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 flex items-center justify-center">
              <ArrowLeft size={20} />
            </button>

            <div>
              <p className="text-sm text-gray-500">Admin / Attributes / View</p>

              <h1 className="text-3xl font-bold text-gray-800 mt-2">
                Attribute Details
              </h1>

              <p className="text-gray-500 mt-1">
                View complete attribute information.
              </p>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
            <Pencil size={18} />
            Edit Attribute
          </button>
        </div>

        {/* Main Card */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Card Header */}

          <div className="p-6 border-b border-gray-200 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
              <Layers size={28} className="text-gray-700" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {attribute.attribute_display_name}
              </h2>

              <p className="text-gray-500">{attribute.attribute_name}</p>
            </div>
          </div>

          {/* Details */}

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-sm text-gray-500">Attribute ID</p>

                <p className="font-semibold mt-2">#{attribute.attribute_id}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-sm text-gray-500">Status</p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                    attribute.attribute_is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {attribute.attribute_is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-sm text-gray-500">Attribute Name</p>

                <p className="font-semibold mt-2">{attribute.attribute_name}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-sm text-gray-500">Display Name</p>

                <p className="font-semibold mt-2">
                  {attribute.attribute_display_name}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-sm text-gray-500">Created At</p>

                <p className="font-semibold mt-2">{attribute.created_at}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-sm text-gray-500">Updated At</p>

                <p className="font-semibold mt-2">{attribute.updated_at}</p>
              </div>
            </div>

            {/* Description */}

            <div className="mt-6 bg-gray-50 rounded-xl p-5">
              <p className="text-sm text-gray-500">Description</p>

              <p className="mt-2 text-gray-700 leading-relaxed">
                {attribute.attribute_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAttribute;
