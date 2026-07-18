import { useCallback, useEffect, useRef, useState } from "react";
import catAttributeServices from "../../services/catAttribute.services";
import toast from "react-hot-toast";

const useAttributeActiveList = () => {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetched = useRef(false);

  const fetchAttribute = useCallback(async () => {
    if (fetched.current) return;

    fetched.current = true;
    setLoading(true);

    try {
      const response = await catAttributeServices.getAttributeActiveListApi();

      // console.log(response.data.attributes);

      setAttributes(response?.data?.attributes || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch attributes",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttribute();
  }, [fetchAttribute]);

  return {
    attributes,
    loading,
    fetchAttribute,
  };
};

export default useAttributeActiveList;
