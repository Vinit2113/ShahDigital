import { useState } from "react";
import attributeServices from "../../services/attributeServices";
import toast from "react-hot-toast";

const useListAttributeHook = () => {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAttributes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await attributeServices.listAttirbuteAdmin(token);

      //   console.log(res.data.attributes[0].created_at);

      setAttributes(res.data.attributes);

      toast.success("Attributes fetched successfully");

      //   setAttributes(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.res?.data?.message || "Failed to fetch attribute");
    } finally {
      setLoading(false);
    }
  };
  return {
    attributes,
    loading,
    setAttributes,
    getAttributes,
  };
};

export default useListAttributeHook;
