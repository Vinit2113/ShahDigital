import { useState } from "react";
import attributeServices from "../../services/attributeServices";
import toast from "react-hot-toast";

const useDeleteAttribute = () => {
  const [loading, setLoading] = useState(false);

  const deleteAttribute = async (attributeId) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!attributeId) {
        throw new Error("Attribute ID is required");
      }

      const res = await attributeServices.deleteAttributeApi(
        attributeId,
        token,
      );

      toast.success("Attribute deleted successfully");

      return res.data;
    } catch (error) {

      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete Attribute";

      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return {
    deleteAttribute,
    loading,
  };
};

export default useDeleteAttribute;
