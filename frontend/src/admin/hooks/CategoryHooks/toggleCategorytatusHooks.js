import { useState } from "react";
import categoriesServices from "../../services/categoriesServicces";
import toast from "react-hot-toast";

const useToggleCategory = () => {
  const [loading, setLoading] = useState(false);

  const toggleCategory = async (catId, status) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await categoriesServices.toggleCategoryApi(
        catId,
        {
          cat_is_active: status,
        },
        token,
      );

      toast.success(
        status
          ? "Category activated successfully"
          : "Category deactivated successfully",
      );

      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update category status",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    toggleCategory,
    loading,
  };
};

export default useToggleCategory;
