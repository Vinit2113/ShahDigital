// NEW FILE: "Enquiries" dashboard table - shows submissions from the
// catalogue page's "Enquire Now" form (backend/controllers/admin/contactModel.controller.js).
// Styled the same way as ListBrand.jsx/ListCategory.jsx (stats row,
// search, table). No edit modal here - the only thing an admin can
// change on an enquiry is its triage status.
// Routed at /admin/enquiries (see App.jsx) and linked from the sidebar
// under a new "Enquiries" section (see AdminSidebar.jsx).

import { Mail, Search } from "lucide-react";
import useEnquiryList from "../../hooks/EnquiryHooks/listEnquiryHooks";

const STATUS_STYLES = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-yellow-100 text-yellow-700",
  CLOSED: "bg-green-100 text-green-700",
};

const ListEnquiries = () => {
  const {
    enquiries,
    totalCount,
    loading,
    search,
    setSearch,
    handleStatusChange,
  } = useEnquiryList();

  const newCount = enquiries.filter((e) => e.status === "NEW").length;
  const closedCount = enquiries.filter((e) => e.status === "CLOSED").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">Admin / Enquiries</p>

          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            Product Enquiries
          </h1>

          <p className="text-gray-500 mt-2">
            Submissions from the "Enquire Now" form on the catalogue page.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5 mb-7">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Total Enquiries</p>
            <h2 className="text-3xl font-bold mt-2">{totalCount}</h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">New</p>
            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {newCount}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Closed</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {closedCount}
            </h2>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="border-b border-gray-200 p-6 flex flex-col lg:flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
                <Mail size={26} className="text-gray-700" />
              </div>

              <div>
                <h2 className="font-semibold text-lg">Enquiry Management</h2>
                <p className="text-sm text-gray-500">
                  View submissions and update their status.
                </p>
              </div>
            </div>

            <div className="relative flex align-center">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, product..."
                className="border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-6 py-4">Sr. No</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : enquiries.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      No enquiries found
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enquiry, index) => (
                    <tr
                      key={enquiry.enquiries_id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition align-top"
                    >
                      <td className="px-6 py-5 text-gray-500">{index + 1}</td>

                      <td className="px-6">
                        <p className="font-semibold">{enquiry.name}</p>
                        <p className="text-xs text-gray-500">{enquiry.email}</p>
                        <p className="text-xs text-gray-500">{enquiry.phone}</p>
                      </td>

                      <td className="px-6 text-gray-700">
                        {enquiry.product_display_name || (
                          <span className="text-gray-400 italic">
                            General enquiry
                          </span>
                        )}
                      </td>

                      <td className="px-6 text-gray-500 max-w-xs">
                        <p className="line-clamp-3">{enquiry.message}</p>
                      </td>

                      <td className="px-6 text-gray-500">
                        {enquiry.created_at
                          ? new Date(enquiry.created_at).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-6">
                        <select
                          value={enquiry.status}
                          onChange={(e) =>
                            handleStatusChange(
                              enquiry.enquiries_id,
                              e.target.value,
                            )
                          }
                          className={`text-sm rounded-full px-3 py-1 border-0 outline-none cursor-pointer ${STATUS_STYLES[enquiry.status] || "bg-gray-100 text-gray-600"}`}
                        >
                          <option value="NEW">New</option>
                          <option value="CONTACTED">Contacted</option>
                          <option value="CLOSED">Closed</option>
                        </select>
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
              Total Enquiries :
              <span className="font-semibold ml-1">{totalCount}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListEnquiries;
