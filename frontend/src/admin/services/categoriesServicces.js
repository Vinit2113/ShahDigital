import api from "../api/axiosInstance";

const fetchCatListAdmin = (token) => {
  return api.post(`category/cat-list-admin`, token, {
    withCredentials: true,
  });
};

const insertCatApi = (data) => {
  console.log(data);

  return api.post(
    `category/cat-insert`,
    {
      cat_name: data.cat_name,
      cat_description: data.cat_description,
    },
    {
      withCredentials: true,
    },
  );
};

const getCatByIdApi = (cat_id) => {
  return api.get(`category/cat-detail/${cat_id}`, {
    withCredentials: true,
  });
};

const updateCatApi = (cat_id, data) => {
  return api.post(`category/cat-update-id/${cat_id}`, data, {
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
