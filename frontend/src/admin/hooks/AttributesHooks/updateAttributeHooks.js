import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import attributeServices from "../../services/attributeServices";
import toast from "react-hot-toast";

const updateAttributeHook = () => {
  const navigate = useNavigate();
  const { attribute_id } = useParams();

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateAttribute = async (attribute_id, data) => {
    try {
      setLoading(true);

      await attributeServices.updateAttributeApi(attribute_id, data);

      toast.success("Attribute updated successfully");

      return true;
    } catch (error) {

      toast.error(error.response?.data?.message || "Something went wrong");

      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = {
        attribute_name: form.name,
        attribute_description: form.description,
      };

      await attributeServices.updateAttributeApi(attribute_id, data);

      toast.success("Attribute updated successfully");

      navigate("/admin/attribute/list");
    } catch (error) {

      toast.error(error.response?.data?.message || "Something ent wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    fetchLoading,
    handleChange,
    handleSubmit,
    updateAttribute,
  };
};

export default updateAttributeHook;
