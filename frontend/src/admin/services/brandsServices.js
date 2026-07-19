import api from "../api/axiosInstance";

// createBrandApi expects a FormData payload (not JSON) - the backend
// route (backend/routes/brands.routes.js) runs
// brandStorage.single("brand_image") (Multer), which requires a real
// multipart/form-data request to read the uploaded file.
const createBrandApi = (formData) => {
  return api.post("brands/create-brand", formData, {
    withCredentials: true,
  });
};

// NEW: admin-only list, powers ListBrand.jsx (dashboard table). Returns
// every brand (active/inactive/deleted) with brand_id, unlike the public
// "list-All" endpoint.
const fetchBrandListAdmin = () => {
  return api.post(
    "brands/list-admin",
    {},
    {
      withCredentials: true,
    },
  );
};

// Edit (name/description/active status, optionally a replacement logo)
// from the Edit Brand modal. Sent as FormData (not JSON) since the update
// route always runs brandStorage.single("brand_image") - Multer only
// parses req.body correctly for a real multipart request, even when no
// new image file is attached.
// imageFile is optional: pass a File to replace the logo, or omit/null
// to leave the existing brand_image untouched (backend only updates it
// when req.file is present - see updateBrandById.controller.js).
const updateBrandApi = (brandId, data, imageFile) => {
  const payload = new FormData();

  if (data.brand_name !== undefined) payload.append("brand_name", data.brand_name);
  if (data.brand_description !== undefined)
    payload.append("brand_description", data.brand_description);
  if (data.brand_is_active !== undefined)
    payload.append("brand_is_active", data.brand_is_active);
  if (imageFile) payload.append("brand_image", imageFile);

  return api.post(`brands/update/${brandId}`, payload, {
    withCredentials: true,
  });
};

// NEW: soft-delete / restore, same pattern as categoriesServicces.js.
const deleteBrandApi = (brandId) => {
  return api.post(
    `brands/delete/${brandId}`,
    {},
    {
      withCredentials: true,
    },
  );
};

const restoreBrandApi = (brandId) => {
  return api.post(
    `brands/restore/${brandId}`,
    {},
    {
      withCredentials: true,
    },
  );
};

export default {
  createBrandApi,
  fetchBrandListAdmin,
  updateBrandApi,
  deleteBrandApi,
  restoreBrandApi,
};
