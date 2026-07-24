// Form state + submit logic for AddProduct.jsx. Modeled on
// insertBrandHooks.js, but a product is created in three sequential calls
// instead of one - the backend needs the new product_id before it can
// attach media or features to it:
//   1. create the product (JSON body)              -> get product_id back
//   2. upload images/video (multipart/form-data)    -> optional
//   3. insert features (JSON array of strings)      -> optional
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import productsServices from "../../services/productsServices";
import categoriesServicces from "../../services/categoriesServicces";
import brandsServices from "../../services/brandsServices";
import catAttributeServices from "../../services/catAttribute.services";
import productAttributeServices from "../../services/productAttributeServices";

const useInsertProduct = () => {
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
    product_current_price: "",
    product_discounted_price: "",
    product_stock_quantity: "",
  });

  // Attributes mapped to the currently selected category (e.g. Condition,
  // RAM, Battery Health for Laptops/Desktops) - fetched fresh whenever
  // cat_id changes, since each category can expose a different set
  // (see backend/controllers/cat_attribute/listMappedCatAttribute.controller.js).
  const [catAttributes, setCatAttributes] = useState([]);
  // Keyed by attribute_id -> string value, entered as free text
  // (attribute_value on product_attributes has no fixed enum).
  const [attributeValues, setAttributeValues] = useState({});

  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          categoriesServicces.fetchCatListAdmin(),
          brandsServices.fetchBrandListAdmin(),
        ]);

        // Only offer categories/brands that are actually usable - a
        // product created under a deleted/inactive one would be
        // orphaned from the public catalogue's own filters.
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

  // Reload the attribute set whenever the chosen category changes, and
  // drop any previously entered values - they belonged to the old
  // category's attribute set and may not apply to the new one.
  useEffect(() => {
    let ignore = false;

    const syncCatAttributes = async () => {
      if (!form.cat_id) {
        await Promise.resolve();
        if (!ignore) {
          setCatAttributes([]);
          setAttributeValues({});
        }
        return;
      }

      try {
        const res = await catAttributeServices.getMappedAttributesApi(form.cat_id);
        if (!ignore) {
          setCatAttributes(res?.data?.data || []);
          setAttributeValues({});
        }
      } catch {
        if (!ignore) toast.error("Failed to load category attributes");
      }
    };

    syncCatAttributes();

    return () => {
      ignore = true;
    };
  }, [form.cat_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttributeChange = (attributeId, value) => {
    setAttributeValues((prev) => ({ ...prev, [attributeId]: value }));
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

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
  };

  const resetForm = () => {
    setForm({
      cat_id: "",
      brand_id: "",
      product_name: "",
      short_description: "",
      full_description: "",
      product_current_price: "",
      product_discounted_price: "",
      product_stock_quantity: "",
    });
    setFeatures([]);
    setFeatureInput("");
    setImageFiles([]);
    setImagePreviews([]);
    setVideoFile(null);
    setAttributeValues({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.cat_id) return toast.error("Category is required");
    if (!form.brand_id) return toast.error("Brand is required");
    if (!form.product_name.trim()) return toast.error("Product name is required");
    if (!form.product_current_price) return toast.error("Current price is required");
    if (form.product_stock_quantity === "")
      return toast.error("Stock quantity is required");

    try {
      setLoading(true);

      const createRes = await productsServices.createProductApi(
        form.cat_id,
        form.brand_id,
        {
          product_name: form.product_name.trim(),
          short_description: form.short_description.trim(),
          full_description: form.full_description.trim(),
          product_current_price: form.product_current_price,
          product_discounted_price: form.product_discounted_price || undefined,
          product_stock_quantity: form.product_stock_quantity,
        },
      );

      const productId = createRes.data?.Product?.product_id;

      // Media and features are attached only if provided - a bare
      // product with no images/features yet is still a valid create.
      if (productId && imageFiles.length > 0) {
        await productsServices.uploadProductMediaApi(
          productId,
          imageFiles,
          videoFile,
        );
      }

      if (productId && features.length > 0) {
        await productsServices.addProductFeaturesApi(productId, features);
      }

      // Attributes (Condition, RAM, etc.) - one row per non-empty value,
      // same "attach after the product exists" reasoning as media/features.
      const attributeEntries = Object.entries(attributeValues).filter(
        ([, value]) => value.trim() !== "",
      );

      if (productId && attributeEntries.length > 0) {
        await Promise.all(
          attributeEntries.map(([attributeId, value]) =>
            productAttributeServices.createProductAttributeApi(
              productId,
              attributeId,
              value.trim(),
            ),
          ),
        );
      }

      toast.success("Product created successfully");
      resetForm();
      navigate("/admin/products");
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
    catAttributes,
    attributeValues,
    handleAttributeChange,
    features,
    featureInput,
    setFeatureInput,
    handleAddFeature,
    handleRemoveFeature,
    imagePreviews,
    handleImageChange,
    handleRemoveImage,
    videoFile,
    handleVideoChange,
    handleSubmit,
    loading,
  };
};

export default useInsertProduct;
