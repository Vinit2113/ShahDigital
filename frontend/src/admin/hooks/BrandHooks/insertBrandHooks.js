// Form state + submit logic for AddBrand.jsx. Modeled on
// inserCategoryHooks.js, but this one sends multipart/form-data (via
// FormData) instead of a plain JSON body, since the backend create route
// expects a real uploaded file for brand_image
// (backend/controllers/brands/createBrands.controller.js requires req.file).

import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import brandsServices from "../../services/brandsServices";

const useInsertBrand = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return toast.error("Brand name is required");
    }

    if (!imageFile) {
      return toast.error("Brand logo/image is required");
    }

    try {
      setLoading(true);

      // Text fields are appended BEFORE brand_image on purpose.
      // backend/middleware/uploads.js's brandStorage.filename() callback
      // reads req.body.brand_name while Multer is still parsing the
      // multipart stream - it only sees fields that arrived before the
      // file field. Appending brand_name after brand_image would make
      // Multer name the file using the "brand" fallback instead of the
      // real brand name.
      const payload = new FormData();
      payload.append("brand_name", form.name.trim());
      payload.append("brand_description", form.description.trim());
      payload.append("brand_image", imageFile);

      await brandsServices.createBrandApi(payload);

      toast.success("Brand created successfully");

      setForm({ name: "", description: "" });
      setImageFile(null);
      setImagePreview(null);

      navigate("/admin/brands");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
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

export default useInsertBrand;
