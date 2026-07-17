const AttributeEditModal = ({
  editData,
  setEditData,
  showModal,
  closeViewModal,
  handleUpdate,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Edit Attribute</h2>

          <p className="text-gray-500 text-sm">Update attribute details</p>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="text-sm text-gray-500">Attribute Name</label>

            <input
              value={editData.attribute_name}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  attribute_name: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Display Name</label>

            <input
              value={editData.attribute_display_name}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  attribute_display_name: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Description</label>

            <textarea
              rows="4"
              value={editData.attribute_description}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  attribute_description: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>
        </div>

        <div className="border-t p-5 flex justify-end gap-3">
          <button
            onClick={closeViewModal}
            className="px-5 py-2 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-5 py-2 rounded-xl bg-black text-white"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttributeEditModal;
