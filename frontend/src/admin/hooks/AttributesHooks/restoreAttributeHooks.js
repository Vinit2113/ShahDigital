import { useState } from "react";
import attributeServices from "../../services/attributeServices";
import toast from "react-hot-toast";

const useRestoreAttribute = () => {
  const [loading, setLoading] = useState(false);

  const restoreAttribute = async (attributeId) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!attributeId) {
        throw new Error("Attribute ID requried");
      }

      const response = await attributeServices.restoreAttributeApi(
        attributeId,
        token,
      );

      toast.success("Attribute restored successfully");
      return response.data;
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete attribute",
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return {
    restoreAttribute,
    loading,
  };
};

export default useRestoreAttribute;
