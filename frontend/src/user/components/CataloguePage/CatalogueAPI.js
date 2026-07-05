import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const fetchCatalogue = async (page, limit = 20, signal, search = "") => {
  const res = await axios.get(`${baseURL}catalogue/list`, {
    params: { page, limit, search: search || undefined },
    signal,
  });

  return res.data;
};

export const fetchHeroSec = async () => {
  const res = await axios.get(`${baseURL}catalogue/hero`);
  return res.data;
};
