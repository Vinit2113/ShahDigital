import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

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

      const res = await axios.post(
        `${baseURL}category/cat-insert`,
        {
          cat_name: form.name,
          cat_description: form.description,
        },
        {
          withCredentials: true,
        },
      );
      toast.success(res.data.message || "Category Inserted successfully");
      setForm({
        name: "",
        description: "",
      });
      navigate("/admin");
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
