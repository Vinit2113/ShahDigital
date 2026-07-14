import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import categoriesServicces from "../../services/categoriesServicces";

const useDeleteCat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCategory = async (catId) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      if (!catId) {
        throw new Error("Category ID is required");
      }

      const response = await categoriesServicces.deleteCatApi(catId, token);

      toast.success("Category deleted successfully");

      return response.data;
    } catch (error) {
      console.log(error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete category";

      setError(message);
      toast.error(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteCategory,
    loading,
    error,
  };
};

export default useDeleteCat;
