import { useState } from "react";
import categoriesServicces from "../../services/categoriesServicces";
import toast from "react-hot-toast";

const useRestoreCat = () => {
  const [loading, setLoading] = useState(false);

  const restoreCat = async (catId) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!catId) {
        throw new Error("Category ID required");
      }

      const response = await categoriesServicces.restoreCatApi(catId, token);

      toast.success("Category restored successfully");

      return response.data;
    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete category",
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return {
    restoreCat,
    loading,
  };
};

export default useRestoreCat;
