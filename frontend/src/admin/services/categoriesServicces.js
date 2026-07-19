import api from "../api/axiosInstance";

const fetchCatListAdmin = (token) => {
  return api.post(`category/cat-list-admin`, token, {
    withCredentials: true,
  });
};

// CHANGED: now sends a FormData payload (not JSON) so an optional
// cat_image file can be included - the backend route
// (backend/routes/category.routes.js) runs catStorage.single("cat_image"),
// which needs a real multipart/form-data request. data.imageFile is
// optional; category creation still works fine without one.
const insertCatApi = (data) => {
  const payload = new FormData();

  // Text fields appended BEFORE cat_image on purpose - Multer's
  // catStorage.filename() callback (backend/middleware/uploads.js) reads
  // req.body.cat_name while still parsing the multipart stream, so it
  // only sees fields that arrived before the file field.
  payload.append("cat_name", data.cat_name);
  payload.append("cat_description", data.cat_description);

  if (data.imageFile) {
    payload.append("cat_image", data.imageFile);
  }

  return api.post(`category/cat-insert`, payload, {
    withCredentials: true,
  });
};

const getCatByIdApi = (cat_id) => {
  return api.get(`category/cat-detail/${cat_id}`, {
    withCredentials: true,
  });
};

// CHANGED: also sends FormData now, same reasoning as insertCatApi -
// imageFile is optional (omit to keep the existing image untouched).
const updateCatApi = (cat_id, data) => {
  const payload = new FormData();

  if (data.cat_name !== undefined) payload.append("cat_name", data.cat_name);
  if (data.cat_description !== undefined)
    payload.append("cat_description", data.cat_description);
  if (data.imageFile) payload.append("cat_image", data.imageFile);

  return api.post(`category/cat-update-id/${cat_id}`, payload, {
    withCredentials: true,
  });
};

const deleteCatApi = (catId, token) => {
  return api.post(`category/cat-delete-id/${catId}`, token, {
    withCredentials: true,
  });
};

const restoreCatApi = (cat_id, token) => {
  return api.post(`category/cat-restore-id/${cat_id}`, token, {
    withCredentials: true,
  });
};
export default {
  fetchCatListAdmin,
  insertCatApi,
  updateCatApi,
  deleteCatApi,
  restoreCatApi,
};
