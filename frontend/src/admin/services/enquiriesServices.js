import api from "../api/axiosInstance";

// NEW FILE: powers the admin "Enquiries" dashboard page
// (ListEnquiries.jsx), hitting the routes added in
// backend/routes/contactModelEnquiries.routes.js.

const fetchEnquiriesAdmin = () => {
  return api.post(
    "contact-form/list",
    {},
    {
      withCredentials: true,
    },
  );
};

const updateEnquiryStatusApi = (enquiryId, status) => {
  return api.post(
    `contact-form/update-status/${enquiryId}`,
    { status },
    {
      withCredentials: true,
    },
  );
};

export default {
  fetchEnquiriesAdmin,
  updateEnquiryStatusApi,
};
