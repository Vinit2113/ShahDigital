import { useState, useEffect, useCallback, useRef } from "react";
import catAttributeServices from "../../services/catAttribute.services";
import toast from "react-hot-toast";

const useCatActiveList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetched = useRef(false);

  const fetchCategories = useCallback(async () => {
    if (fetched.current) return;

    fetched.current = true;

    setLoading(true);

    try {
      const response = await catAttributeServices.getCatActiveListApi();

      console.log("CATEGORY API RESPONSE:", response.data.categories);

      setCategories(response.data.categories || []);
    } catch (err) {
      fetched.current = false;

      toast.error(err?.response?.data?.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    refetch: fetchCategories,
  };
};

export default useCatActiveList;
