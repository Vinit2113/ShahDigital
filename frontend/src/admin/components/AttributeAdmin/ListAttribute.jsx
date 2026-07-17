import { useState } from "react";

import {
  Layers,
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  Filter,
  Check,
  X,
} from "lucide-react";

import useAttribute from "../../hooks/AttributesHooks/CommonAttributeHooks";
import { useNavigate } from "react-router";
import AttributeViewModal from "./ListAttribute/AttributeViewModal";
import AttributeEditModal from "./ListAttribute/AttributeEditModal";

const ListAttribute = () => {
  const navigate = useNavigate();

  const {
    activeCount,
    attributes,

    handleDelete,
    handleEdit,
    handleToggleStatus,

    showModal,
    selectedAttribute,

    openViewModal,
    closeViewModal,

    inactiveCount,
    loading,

    search,
    setSearch,

    editData,
    setEditData,

    handleCancel,
    handleUpdate,

    modalMode,
  } = useAttribute();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 mb-8">
          <div>
            <p className="text-sm text-gray-500">Admin / Attributes</p>

            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              Product Attributes
            </h1>

            <p className="text-gray-500 mt-2">
              Manage product attributes used across categories.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/attributes/add")}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            <Plus size={18} />
            Add Attribute
          </button>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-5 mb-7">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Total Attributes</p>

            <h2 className="text-3xl font-bold mt-2">{attributes.length}</h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Active</p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {activeCount}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Inactive</p>

            <h2 className="text-3xl font-bold text-red-500 mt-2">
              {inactiveCount}
            </h2>
          </div>
        </div>

        {/* Table Card */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Table Header */}

          <div className="border-b border-gray-200 p-6 flex flex-col lg:flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
                <Layers className="text-gray-700" size={26} />
              </div>

              <div>
                <h2 className="font-semibold text-lg">Attribute Management</h2>

                <p className="text-sm text-gray-500">
                  View, edit and delete attributes.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-black"
                />
              </div>

              <button className="border border-gray-300 px-4 rounded-xl flex items-center gap-2 hover:bg-gray-100">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>

          {/* Table */}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-gray-600 text-sm">
                  <th className="px-6 py-4">Attribute</th>

                  <th className="px-6 py-4">Attribute Name</th>

                  <th className="px-6 py-4">Created</th>

                  <th className="px-6 py-4">Status</th>

                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : attributes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-500">
                      No attributes found.
                    </td>
                  </tr>
                ) : (
                  attributes.map((item) => (
                    <tr
                      key={item.attribute_id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center">
                            <Layers size={18} />
                          </div>

                          <div>
                            <p className="font-semibold">
                              {item.attribute_display_name}
                            </p>

                            <p className="text-xs text-gray-500">
                              ID #{item.attribute_id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 text-gray-500">
                        {item.attribute_name}
                      </td>

                      <td className="px-6 text-gray-500">
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-6">
                        <button
                          onClick={() => handleToggleStatus(item)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            item.attribute_is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {item.attribute_is_active ? "Active" : "Inactive"}
                        </button>
                      </td>

                      <td className="px-6">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => openViewModal(item)}
                            className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                          >
                            <Eye size={18} />
                          </button>

                          <button
                            onClick={() => handleEdit(item)}
                            className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(item.attribute_id)}
                            className="w-10 h-10 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}

          <div className="border-t border-gray-200 p-5 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">
                {attributes.length === 0 ? 0 : `1-${attributes.length}`}
              </span>{" "}
              of <span className="font-medium">{attributes.length}</span>{" "}
              attributes
            </p>

            <div className="flex gap-2">
              <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
                Previous
              </button>

              <button className="bg-black text-white px-4 py-2 rounded-lg">
                1
              </button>

              <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* VIEW MODAL */}

        {modalMode === "view" && (
          <AttributeViewModal
            selectedAttribute={selectedAttribute}
            showModal={showModal}
            closeViewModal={closeViewModal}
          />
        )}

        {/* EDIT MODAL */}
        {modalMode === "edit" && (
          <AttributeEditModal
            editData={editData}
            setEditData={setEditData}
            closeViewModal={closeViewModal}
            handleUpdate={handleUpdate}
            handleCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListAttribute;
