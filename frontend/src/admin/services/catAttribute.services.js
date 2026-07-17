import api from "../api/axiosInstance";

const addAttributeToCategoryApi = (data) => {
  return api.post("map/cat_attribute", data, {
    withCredentials: true,
  });
};

const getMappedAttributesApi = (cat_id) => {
  return api.post(
    `list/map-catat/${cat_id}`,
    {},
    {
      withCredentials: true,
    },
  );
};

// CAT ACTIVE LIST
const getCatActiveListApi = (token) => {
  return api.post(`category/cat-active-list/`, token, {
    withCredentials: true,
  });
};

const getAttributeActiveListApi = (token) => {
  return api.post(`attribute/cat-list-active/`, token, {
    withCredentials: true,
  });
};

export default {
  addAttributeToCategoryApi,
  getMappedAttributesApi,
  getCatActiveListApi,
  getAttributeActiveListApi,
};
