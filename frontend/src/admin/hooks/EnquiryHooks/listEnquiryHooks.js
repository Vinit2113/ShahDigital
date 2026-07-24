// NEW FILE: powers ListEnquiries.jsx (dashboard "Enquiries" table).
// Mirrors the shape of listBrandHooks.js - fetch, search, and a per-row
// status update instead of a full edit modal (enquiries aren't editable,
// only their triage status is).

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import enquiriesServices from "../../services/enquiriesServices";

const useEnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getEnquiries = async () => {
    try {
      setLoading(true);

      const res = await enquiriesServices.fetchEnquiriesAdmin();

      setEnquiries(res?.data?.enquiries || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch enquiries",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnquiries();
  }, []);

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const searchText = search.trim().toLowerCase();

    return (
      enquiry.name?.toLowerCase().includes(searchText) ||
      enquiry.email?.toLowerCase().includes(searchText) ||
      enquiry.product_display_name?.toLowerCase().includes(searchText)
    );
  });

  const handleStatusChange = async (enquiryId, status) => {
    // Optimistic update so the dropdown feels instant, matching the
    // pattern of other admin list pages here.
    setEnquiries((prev) =>
      prev.map((e) =>
        e.enquiries_id === enquiryId ? { ...e, status } : e,
      ),
    );

    try {
      await enquiriesServices.updateEnquiryStatusApi(enquiryId, status);

      toast.success("Enquiry status updated");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update status",
      );

      // Roll back on failure by re-fetching the real state.
      getEnquiries();
    }
  };

  return {
    enquiries: filteredEnquiries,
    // Unfiltered list, so stat cards (New/Contacted/Closed) stay stable
    // while the admin is typing a search query instead of recounting
    // whatever the search happens to match.
    allEnquiries: enquiries,
    totalCount: enquiries.length,
    loading,
    search,
    setSearch,
    handleStatusChange,
  };
};

export default useEnquiryList;
