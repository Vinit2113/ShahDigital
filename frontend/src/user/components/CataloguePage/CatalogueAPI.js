import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const fetchCatalogue = async () => {
  const res = await axios.post(`${baseURL}catalogue/list`);

  return res.data;
};

export const fetchHeroSec = async () => {
  const res = await axios.get(`${baseURL}catalogue/hero`);
  return res.data;
};



export default baseURL;
