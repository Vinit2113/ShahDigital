import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import categoriesServicces from "../../services/categoriesServicces";

const updateCatHook = () => {
  const navigate = useNavigate();
  const { cat_id } = useParams();

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get category by id
  const updateCategory = async (cat_id, data) => {
    try {
      setLoading(true);

      await categoriesServicces.updateCatApi(cat_id, data);

      toast.success("Category updated successfully");

      return true;
    } catch (error) {
      console.log("Update category error:", error);

      toast.error(error.response?.data?.message || "Something went wrong");

      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update category
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = {
        cat_name: form.name,
        cat_description: form.description,
      };

      await categoriesServicces.updateCatApi(cat_id, data);

      toast.success("Category updated successfully");

      navigate("/admin/categories/list");
    } catch (error) {
      console.log("Update category error:", error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

//   useEffect(() => {
//     if (cat_id) {
//       getCategoryById();
//     }
//   }, [cat_id]);

  return {
    form,
    loading,
    fetchLoading,
    handleChange,
    handleSubmit,
    updateCategory,
  };
};

export default updateCatHook;
