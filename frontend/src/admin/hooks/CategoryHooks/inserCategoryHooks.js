import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import categoriesServicces from "../../services/categoriesServicces";


const addCatHook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  // NEW: optional category image/icon, mirrors insertBrandHooks.js -
  // unlike brands, this is NOT required (see createCategories.controller.js).
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = {
        cat_name: form.name,
        cat_description: form.description,
        imageFile,
      };

      const res = await categoriesServicces.insertCatApi(data);
      toast.success("Category Inserted successfully");
      setForm({
        name: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);
      navigate("/admin/categories/list");
    } catch (error) {
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
    imageFile,
    imagePreview,
    handleImageChange,
    handleSubmit,
    loading,
  };
};

export default addCatHook;
