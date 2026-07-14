import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import categoriesServicces from "../../services/categoriesServicces";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const addCatHook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = {
        cat_name: form.name,
        cat_description: form.description,
      };

      const res = await categoriesServicces.insertCatApi(data);
      toast.success("Category Inserted successfully");
      setForm({
        name: "",
        description: "",
      });
      navigate("/admin/categories/list");
    } catch (error) {
      console.log("Cat front error: ", error);
      return toast.error(
        error.response?.data?.message || "Something went wrong ",
      );
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

export default addCatHook;
