import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const fetchCatListAdmin = (token) => {
  return axios.post(`${baseURL}category/cat-list-admin`, token, {
    withCredentials: true,
  });
};

const insertCatApi = (data) => {
  console.log(data);

  return axios.post(
    `${baseURL}category/cat-insert`,
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
  return axios.get(`${baseURL}category/cat-detail/${cat_id}`, {
    withCredentials: true,
  });
};

const updateCatApi = (cat_id, data) => {
  return axios.post(`${baseURL}category/cat-update-id/${cat_id}`, data, {
    withCredentials: true,
  });
};

const deleteCatApi = (catId, token) => {
  return axios.post(`${baseURL}category/cat-delete-id/${catId}`, token, {
    withCredentials: true,
  });
};

const restoreCatApi = (cat_id, token) => {
  return axios.post(`${baseURL}category/cat-restore-id/${cat_id}`, token, {
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
