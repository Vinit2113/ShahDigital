// "Enquiries" dashboard table - shows submissions from the catalogue
// page's "Enquire Now" form (backend/controllers/admin/contactModel.controller.js).
// Styled the same way as ListBrand.jsx/ListCategory.jsx/ListProduct.jsx
// (stats row, search, table). No edit modal here - the only thing an
// admin can change on an enquiry is its triage status; the eye icon
// opens a read-only detail view for the full message.
// Routed at /admin/enquiries (see App.jsx) and linked from the sidebar
// under a new "Enquiries" section (see AdminSidebar.jsx).

import { useState } from "react";
import {
  Mail,
  Search,
  Phone,
  Eye,
  X,
  ChevronDown,
  Clock,
  MessageCircle,
  CheckCircle2,
  Inbox,
} from "lucide-react";
import useEnquiryList from "../../hooks/EnquiryHooks/listEnquiryHooks";

const STATUS_STYLES = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-yellow-100 text-yellow-700",
  CLOSED: "bg-green-100 text-green-700",
};

const AVATAR_STYLES = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-teal-100 text-teal-700",
  "bg-orange-100 text-orange-700",
  "bg-indigo-100 text-indigo-700",
];

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

const getAvatarStyle = (name = "") => {
  const hash = name
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_STYLES[hash % AVATAR_STYLES.length];
};

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "-";

const StatusSelect = ({ status, onChange }) => (
  <div className="relative inline-block">
    <select
      value={status}
      onChange={onChange}
      className={`appearance-none text-sm font-medium rounded-full pl-3 pr-7 py-1 border-0 outline-none cursor-pointer ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      <option value="NEW">New</option>
      <option value="CONTACTED">Contacted</option>
      <option value="CLOSED">Closed</option>
    </select>
    <ChevronDown
      size={13}
      className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-60"
    />
  </div>
);

const EnquiryDetailModal = ({ enquiry, onClose, onStatusChange }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold shrink-0 ${getAvatarStyle(
              enquiry.name,
            )}`}
          >
            {getInitials(enquiry.name)}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{enquiry.name}</h3>
            <p className="text-sm text-gray-500">
              {formatDate(enquiry.created_at)}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 shrink-0"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-6 space-y-5">
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href={`mailto:${enquiry.email}`}
            className="flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <Mail size={15} />
            {enquiry.email}
          </a>
          {enquiry.phone && (
            <a
              href={`tel:${enquiry.phone}`}
              className="flex items-center gap-2 text-gray-600 hover:text-black"
            >
              <Phone size={15} />
              {enquiry.phone}
            </a>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            Product
          </p>
          {enquiry.product_display_name ? (
            <span className="inline-block bg-gray-100 text-gray-700 text-sm font-medium rounded-lg px-3 py-1">
              {enquiry.product_display_name}
            </span>
          ) : (
            <span className="text-gray-400 italic text-sm">
              General enquiry
            </span>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            Message
          </p>
          <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
            {enquiry.message}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Status
          </p>
          <StatusSelect
            status={enquiry.status}
            onChange={(e) =>
              onStatusChange(enquiry.enquiries_id, e.target.value)
            }
          />
        </div>
      </div>
    </div>
  </div>
);

const EmptyState = ({ loading, hasSearch }) => (
  <tr>
    <td colSpan="6" className="text-center py-16 text-gray-500">
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <Inbox size={22} className="text-gray-400" />
        </div>
        <p>
          {loading
            ? "Loading enquiries..."
            : hasSearch
              ? "No enquiries match your search"
              : "No enquiries yet"}
        </p>
      </div>
    </td>
  </tr>
);

const ListEnquiries = () => {
  const {
    enquiries,
    allEnquiries,
    totalCount,
    loading,
    search,
    setSearch,
    handleStatusChange,
  } = useEnquiryList();

  const [viewingEnquiry, setViewingEnquiry] = useState(null);

  const newCount = allEnquiries.filter((e) => e.status === "NEW").length;
  const contactedCount = allEnquiries.filter(
    (e) => e.status === "CONTACTED",
  ).length;
  const closedCount = allEnquiries.filter((e) => e.status === "CLOSED").length;

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
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mb-7">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <h2 className="text-3xl font-bold mt-2">{totalCount}</h2>
            </div>
            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
              <Mail size={20} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New</p>
              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                {newCount}
              </h2>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Clock size={20} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Contacted</p>
              <h2 className="text-3xl font-bold text-yellow-600 mt-2">
                {contactedCount}
              </h2>
            </div>
            <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600">
              <MessageCircle size={20} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Closed</p>
              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {closedCount}
              </h2>
            </div>
            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <CheckCircle2 size={20} />
            </div>
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

            <div className="relative flex items-center w-full lg:w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, product..."
                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-black transition-colors"
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
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading || enquiries.length === 0 ? (
                  <EmptyState loading={loading} hasSearch={!!search.trim()} />
                ) : (
                  enquiries.map((enquiry, index) => (
                    <tr
                      key={enquiry.enquiries_id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition align-top ${
                        enquiry.status === "NEW"
                          ? "border-l-4 border-l-blue-500 bg-blue-50/30"
                          : ""
                      }`}
                    >
                      <td className="px-6 py-5 text-gray-500">{index + 1}</td>

                      <td className="px-6 py-5">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${getAvatarStyle(
                              enquiry.name,
                            )}`}
                          >
                            {getInitials(enquiry.name)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold truncate">
                              {enquiry.name}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <Mail size={11} className="shrink-0" />
                              <span className="truncate">
                                {enquiry.email}
                              </span>
                            </p>
                            {enquiry.phone && (
                              <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                <Phone size={11} className="shrink-0" />
                                {enquiry.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        {enquiry.product_display_name ? (
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium rounded-lg px-2.5 py-1 max-w-[10rem] truncate align-middle">
                            {enquiry.product_display_name}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic text-sm">
                            General enquiry
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-5 text-gray-500 max-w-xs">
                        <p className="line-clamp-2">{enquiry.message}</p>
                      </td>

                      <td className="px-6 py-5 text-gray-500 whitespace-nowrap">
                        {formatDate(enquiry.created_at)}
                      </td>

                      <td className="px-6 py-5">
                        <StatusSelect
                          status={enquiry.status}
                          onChange={(e) =>
                            handleStatusChange(
                              enquiry.enquiries_id,
                              e.target.value,
                            )
                          }
                        />
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-center">
                          <button
                            onClick={() => setViewingEnquiry(enquiry)}
                            className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                            title="View full enquiry"
                          >
                            <Eye size={18} />
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
              Total Enquiries :
              <span className="font-semibold ml-1">{totalCount}</span>
            </p>
          </div>
        </div>
      </div>

      {viewingEnquiry && (
        <EnquiryDetailModal
          enquiry={viewingEnquiry}
          onClose={() => setViewingEnquiry(null)}
          onStatusChange={(id, status) => {
            handleStatusChange(id, status);
            setViewingEnquiry((prev) => (prev ? { ...prev, status } : prev));
          }}
        />
      )}
    </div>
  );
};

export default ListEnquiries;
