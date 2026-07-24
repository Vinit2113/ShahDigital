import api from "../api/axiosInstance";

const addAttributeAdmin = (payload) => {
  return api.post(`attribute/insert/`, payload, {
    withCredentials: true,
  });
};

const listAttirbuteAdmin = (payload) => {
  return api.post(`attribute/admin/list-all`, payload, {
    withCredentials: true,
  });
};

const deleteAttributeApi = (attributeId, payload) => {
  return api.post(`attribute/delete/${attributeId}`, payload, {
    withCredentials: true,
  });
};

const restoreAttributeApi = (attributeId, payload) => {
  return api.post(`attribute/restore/${attributeId}`, payload, {
    withCredentials: true,
  });
};

const updateAttributeApi = (attributeId, payload) => {
  return api.post(`attribute/update/${attributeId}`, payload, {
    withCredentials: true,
  });
};

export default {
  addAttributeAdmin,
  listAttirbuteAdmin,
  deleteAttributeApi,
  restoreAttributeApi,
  updateAttributeApi,
};
