// Form state + submit logic for AddCatalogueProduct.jsx. Mirrors
// insertProductHooks.js's three-step create (product -> media -> features),
// minus every pricing/stock field - those don't exist on this form at all.
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import catalogueServices from "../../services/catalogueServices";
import productsServices from "../../services/productsServices";
import categoriesServicces from "../../services/categoriesServicces";
import brandsServices from "../../services/brandsServices";

const useInsertCatalogueProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [form, setForm] = useState({
    cat_id: "",
    brand_id: "",
    product_name: "",
    short_description: "",
    full_description: "",
  });

  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          categoriesServicces.fetchCatListAdmin(),
          brandsServices.fetchBrandListAdmin(),
        ]);

        setCategories(
          (catRes.data.categories || []).filter(
            (c) => c.cat_is_active && !c.deleted_at,
          ),
        );
        setBrands(
          (brandRes.data.brands || []).filter(
            (b) => b.brand_is_active && !b.deleted_at,
          ),
        );
      } catch {
        toast.error("Failed to load categories/brands");
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFeature = () => {
    const trimmed = featureInput.trim();
    if (!trimmed) return;

    setFeatures((prev) => [...prev, trimmed]);
    setFeatureInput("");
  };

  const handleRemoveFeature = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setForm({
      cat_id: "",
      brand_id: "",
      product_name: "",
      short_description: "",
      full_description: "",
    });
    setFeatures([]);
    setFeatureInput("");
    setImageFiles([]);
    setImagePreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.cat_id) return toast.error("Category is required");
    if (!form.brand_id) return toast.error("Brand is required");
    if (!form.product_name.trim())
      return toast.error("Product name is required");

    try {
      setLoading(true);

      const createRes = await catalogueServices.createCatalogueProductApi(
        form.cat_id,
        form.brand_id,
        {
          product_name: form.product_name.trim(),
          short_description: form.short_description.trim(),
          full_description: form.full_description.trim(),
        },
      );

      const productId = createRes.data?.Product?.product_id;

      if (productId && imageFiles.length > 0) {
        await productsServices.uploadProductMediaApi(
          productId,
          imageFiles,
          null,
        );
      }

      if (productId && features.length > 0) {
        await productsServices.addProductFeaturesApi(productId, features);
      }

      toast.success("Added to catalogue successfully");
      resetForm();
      navigate("/admin/catalogue");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    brands,
    form,
    handleChange,
    features,
    featureInput,
    setFeatureInput,
    handleAddFeature,
    handleRemoveFeature,
    imagePreviews,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
    loading,
  };
};

export default useInsertCatalogueProduct;
