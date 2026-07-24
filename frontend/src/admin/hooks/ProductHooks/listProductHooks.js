// Powers ListProduct.jsx (dashboard "All Products" table) and
// ProductEditModal.jsx. Mirrors listBrandHooks.js/commontCatHooks.js for
// the list/search/delete/restore parts, but the edit modal is richer -
// a product has a features collection and an images collection, not just
// plain fields, so those are managed as immediate add/remove actions
// against the backend rather than staged and saved in one batch like the
// name/price/stock fields are.
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import productsServices from "../../services/productsServices";
import categoriesServicces from "../../services/categoriesServicces";
import brandsServices from "../../services/brandsServices";
import catAttributeServices from "../../services/catAttribute.services";
import productAttributeServices from "../../services/productAttributeServices";

const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loadingEditDetail, setLoadingEditDetail] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);

  const [editData, setEditData] = useState({
    cat_id: "",
    brand_id: "",
    product_name: "",
    short_description: "",
    full_description: "",
    product_current_price: "",
    product_discounted_price: "",
    product_stock_quantity: "",
  });

  // Attributes mapped to editData.cat_id, plus this product's existing
  // values for them. Keyed by attribute_id -> { value, product_attribute_id,
  // original } - "original" lets handleUpdate skip an update call when the
  // admin didn't actually touch that field.
  const [editCatAttributes, setEditCatAttributes] = useState([]);
  const [editAttributeValues, setEditAttributeValues] = useState({});

  const [editFeatures, setEditFeatures] = useState([]);
  const [newFeatureInput, setNewFeatureInput] = useState("");
  const [savingFeature, setSavingFeature] = useState(false);

  const [editImages, setEditImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [savingImages, setSavingImages] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);

      const res = await productsServices.fetchProductListAdmin();

      setProducts(res?.data?.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();

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

  // SEARCH FILTER
  const filteredProducts = products.filter((product) => {
    const searchText = search.trim().toLowerCase();

    return (
      product.product_display_name?.toLowerCase().includes(searchText) ||
      product.category?.cat_display_name?.toLowerCase().includes(searchText) ||
      product.brand?.brand_display_name?.toLowerCase().includes(searchText)
    );
  });

  const handleEdit = async (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
    setLoadingEditDetail(true);

    try {
      const [detailRes, featuresRes, productAttrsRes] = await Promise.all([
        productsServices.getProductByIdApi(product.product_id),
        productsServices.listProductFeaturesApi(product.product_id),
        productAttributeServices.listProductAttributesApi(product.product_id),
      ]);

      const detail = detailRes.data.data;

      setEditData({
        cat_id: detail.category?.id || "",
        brand_id: detail.brand?.id || "",
        product_name: detail.product_display_name || "",
        short_description: detail.short_description || "",
        full_description: detail.full_description || "",
        product_current_price: detail.price?.current ?? "",
        product_discounted_price: detail.price?.discounted ?? "",
        product_stock_quantity: detail.stock_quantity ?? "",
      });

      setEditFeatures(featuresRes.data.data || []);
      setEditImages(detail.images || []);

      // Attributes mapped to this product's category, prefilled with
      // whatever value is already stored for each (blank if none yet).
      if (detail.category?.id) {
        const mappedRes = await catAttributeServices.getMappedAttributesApi(
          detail.category.id,
        );
        const mappedAttributes = mappedRes?.data?.data || [];

        const existingByAttrId = {};
        (productAttrsRes?.data?.data || []).forEach((row) => {
          existingByAttrId[row.attribute_id] = row;
        });

        const values = {};
        mappedAttributes.forEach((attr) => {
          const existing = existingByAttrId[attr.attribute_id];
          const value =
            existing?.display_product_attribute || existing?.attribute_value || "";

          values[attr.attribute_id] = {
            value,
            original: value,
            product_attribute_id: existing?.product_attribute_id || null,
          };
        });

        setEditCatAttributes(mappedAttributes);
        setEditAttributeValues(values);
      } else {
        setEditCatAttributes([]);
        setEditAttributeValues({});
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load product details",
      );
      setShowEditModal(false);
    } finally {
      setLoadingEditDetail(false);
    }
  };

  const handleCancel = () => {
    setShowEditModal(false);
    setEditingProduct(null);
    setEditFeatures([]);
    setEditImages([]);
    setNewFeatureInput("");
    setNewImageFiles([]);
    setEditCatAttributes([]);
    setEditAttributeValues({});
  };

  const handleEditAttributeChange = (attributeId, value) => {
    setEditAttributeValues((prev) => ({
      ...prev,
      [attributeId]: { ...prev[attributeId], value },
    }));
  };

  const handleUpdate = async () => {
    try {
      setSavingEdit(true);

      await productsServices.updateProductApi(editingProduct.product_id, {
        cat_id: editData.cat_id,
        brand_id: editData.brand_id,
        product_name: editData.product_name,
        short_description: editData.short_description,
        full_description: editData.full_description,
        product_current_price: editData.product_current_price,
        product_discounted_price: editData.product_discounted_price || null,
        product_stock_quantity: editData.product_stock_quantity,
      });

      // Specifications - staged the same way as the fields above, applied
      // together on Save: create a row for a newly-filled attribute, update
      // one that changed, soft-delete one that was cleared back to empty.
      await Promise.all(
        Object.entries(editAttributeValues).map(([attributeId, entry]) => {
          const trimmed = entry.value.trim();

          if (trimmed && !entry.product_attribute_id) {
            return productAttributeServices.createProductAttributeApi(
              editingProduct.product_id,
              attributeId,
              trimmed,
            );
          }

          if (trimmed && entry.product_attribute_id && trimmed !== entry.original) {
            return productAttributeServices.updateProductAttributeApi(
              entry.product_attribute_id,
              trimmed,
            );
          }

          if (!trimmed && entry.product_attribute_id) {
            return productAttributeServices.deleteProductAttributeApi(
              entry.product_attribute_id,
            );
          }

          return null;
        }),
      );

      toast.success("Product updated successfully");
      handleCancel();
      getProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setSavingEdit(false);
    }
  };

  // FEATURES - immediate add/remove, not batched with the Save button,
  // since each is its own backend row (product_features.feature_id).
  const handleAddFeature = async () => {
    const trimmed = newFeatureInput.trim();
    if (!trimmed || !editingProduct) return;

    try {
      setSavingFeature(true);
      await productsServices.addProductFeaturesApi(
        editingProduct.product_id,
        [trimmed],
      );

      const res = await productsServices.listProductFeaturesApi(
        editingProduct.product_id,
      );
      setEditFeatures(res.data.data || []);
      setNewFeatureInput("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add feature");
    } finally {
      setSavingFeature(false);
    }
  };

  const handleDeleteFeature = async (featureId) => {
    try {
      await productsServices.deleteProductFeatureApi(featureId);
      setEditFeatures((prev) =>
        prev.filter((f) => f.feature_id !== featureId),
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove feature");
    }
  };

  // IMAGES - immediate add/remove, same reasoning as features
  // (product_media.media_id is its own row).
  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setNewImageFiles(files);
  };

  const handleUploadImages = async () => {
    if (newImageFiles.length === 0 || !editingProduct) return;

    try {
      setSavingImages(true);
      await productsServices.uploadProductMediaApi(
        editingProduct.product_id,
        newImageFiles,
        null,
      );

      const detailRes = await productsServices.getProductByIdApi(
        editingProduct.product_id,
      );
      setEditImages(detailRes.data.data.images || []);
      setNewImageFiles([]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload images");
    } finally {
      setSavingImages(false);
    }
  };

  const handleDeleteImage = async (mediaId) => {
    try {
      await productsServices.deleteProductMediaApi(mediaId);
      setEditImages((prev) => prev.filter((img) => img.id !== mediaId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove image");
    }
  };

  // FIX: no more window.confirm() here - ListProduct.jsx now arms an
  // inline tick/cross toggle on the row before calling this, same pattern
  // as commontCatHooks.js/handleDelete.
  const handleDelete = async (product) => {
    try {
      await productsServices.deleteProductApi(product.product_id);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    } finally {
      getProducts();
    }
  };

  const handleRestore = async (product) => {
    try {
      await productsServices.restoreProductApi(product.product_id);
      toast.success("Product restored successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to restore product",
      );
    } finally {
      getProducts();
    }
  };

  const handleStatusToggle = (product) => {
    if (product.is_active) {
      handleDelete(product);
    } else {
      handleRestore(product);
    }
  };

  return {
    products: filteredProducts,
    loading,
    search,
    setSearch,

    categories,
    brands,

    showEditModal,
    editingProduct,
    loadingEditDetail,
    savingEdit,
    editData,
    setEditData,

    editCatAttributes,
    editAttributeValues,
    handleEditAttributeChange,

    editFeatures,
    newFeatureInput,
    setNewFeatureInput,
    savingFeature,
    handleAddFeature,
    handleDeleteFeature,

    editImages,
    newImageFiles,
    handleNewImageChange,
    savingImages,
    handleUploadImages,
    handleDeleteImage,

    handleEdit,
    handleCancel,
    handleUpdate,
    handleDelete,
    handleRestore,
    handleStatusToggle,
  };
};

export default useProductList;
