import api from "../api/axiosInstance";

const addAttributeAdmin = (token) => {
  return api.post(`attribute/insert/`, token, {
    withCredentials: true,
  });
};

const listAttirbuteAdmin = (token) => {
  return api.post(`attribute/admin/list-all`, token, {
    withCredentials: true,
  });
};

const deleteAttributeApi = (attributeId, token) => {
  return api.post(`attribute/delete/${attributeId}`, token, {
    withCredentials: true,
  });
};

const restoreAttributeApi = (attributeId, token) => {
  return api.post(`attribute/restore/${attributeId}`, token, {
    withCredentials: true,
  });
};

const updateAttributeApi = (attributeId, token) => {
  return api.post(`attribute/update/${attributeId}`, token, {
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
