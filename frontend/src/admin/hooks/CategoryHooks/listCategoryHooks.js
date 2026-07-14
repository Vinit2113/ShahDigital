import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import categoriesServicces from "../../services/categoriesServicces";

const useListCatHook = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await categoriesServicces.fetchCatListAdmin(token);
      //   console.log(resx);

      setCategories(res.data.categories);

      toast.success("Categories fetched successfully");
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    getCategories,
  };
};

export default useListCatHook;
