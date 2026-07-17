import { Layers } from "lucide-react";

const AttributeViewModal = ({
  selectedAttribute,
  showModal,
  closeViewModal,
}) => {
  if (!selectedAttribute) return null;

  return (
    <div
      onClick={closeViewModal}
      className={`fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/40 backdrop-blur-sm transition ${
        showModal ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
          showModal ? "scale-100 translate-y-0" : "scale-95 translate-y-5"
        }`}
      >
        {/* HEADER */}

        <div className="bg-black text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <Layers size={28} />
              </div>

              <div>
                <h2 className="text-xl font-bold">Attribute Details</h2>

                <p className="text-gray-300 text-sm">
                  Product attribute information
                </p>
              </div>
            </div>

            <button
              onClick={closeViewModal}
              className="text-2xl text-gray-300 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>

        {/* CONTENT */}

        <div className="p-6 space-y-5">
          <div className="border rounded-2xl p-5">
            <p className="text-sm text-gray-500">Attribute Name</p>

            <h3 className="font-semibold text-lg mt-1">
              {selectedAttribute.attribute_name}
            </h3>

            <p className="text-sm text-gray-500 mt-4">Display Name</p>

            <h3 className="font-semibold mt-1">
              {selectedAttribute.attribute_display_name}
            </h3>

            <p className="text-sm text-gray-500 mt-4">Description</p>

            <p className="mt-1 text-gray-700">
              {selectedAttribute.attribute_description || "-"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-sm text-gray-500">Status</p>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                  selectedAttribute.attribute_is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {selectedAttribute.attribute_is_active ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-sm text-gray-500">ID</p>

              <p className="font-semibold mt-2">
                #{selectedAttribute.attribute_id}
              </p>
            </div>
          </div>

          <div className="flex justify-between mx-1">
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-sm text-gray-500">Created Date</p>

              <p className="font-semibold mt-2">
                {new Date(selectedAttribute.created_at).toLocaleString()}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-sm text-gray-500">Updated Date</p>

              <p className="font-semibold mt-2">
                {new Date(selectedAttribute.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t p-5 flex justify-end">
          <button
            onClick={closeViewModal}
            className="px-6 py-2.5 rounded-xl bg-black text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttributeViewModal;
