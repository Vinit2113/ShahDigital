import { useState } from "react";
import { useNavigate } from "react-router";
import attributeServices from "../../services/attributeServices";
import toast from "react-hot-toast";

const addAttributeHook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  // GET THE VALUE INSERTED IN THE INPUT FIELD
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // GET THE DATA AND STORED THE VALUE IN THE KEY IN JSON FORMAT,   FROM THE FORM WHICH IS INPUTED FROM THE INPUT FIELD BY THE FUNCITON HANDLECHAGE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const attributeData = {
        attribute_name: form.name,
        attribute_description: form.description,
      };

      // SEND THE JSON DATA TO THE BACKEND AND IF SUCCESS THE FORM WILL BE RESET AND IF NOT SHOW ERROR !
      const res = await attributeServices.addAttributeAdmin(attributeData);

      toast.success("Attribute Inserted Successfully");
      setForm({
        name: "",
        description: "",
      });
      navigate("/admin/attributes/list");
    } catch (error) {
      return toast.error(error.res?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return {
    form,
    handleChange,
    handleSubmit,
    loading,
  };
};

export default addAttributeHook;
