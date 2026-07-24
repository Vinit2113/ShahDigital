// Powers ListCatalogue.jsx (admin "Catalogue" dashboard page). Mirrors
// listProductHooks.js's list/edit/delete/restore/features/images shape,
// but the editable fields are catalogue-only (name, descriptions, category,
// brand) - no pricing/stock anywhere in this hook. Features and images
// still go through productsServices.js since those endpoints already work
// per product_id regardless of which admin section calls them.
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import catalogueServices from "../../services/catalogueServices";
import productsServices from "../../services/productsServices";
import categoriesServicces from "../../services/categoriesServicces";
import brandsServices from "../../services/brandsServices";

// Client-side pagination - same reasoning as CatalogueCard.jsx (the public
// catalogue page): the admin-list endpoint already returns every catalogue
// item in one request, so this just slices the already-filtered list.
const PAGE_SIZE = 20;

const useCatalogueList = () => {
  const [catalogue, setCatalogue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearchState] = useState("");
  const [sort, setSortState] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Wraps the raw setters so changing search/sort always jumps back to
  // page 1 - otherwise a narrower result set than the admin's current page
  // would render an empty table.
  const setSearch = (value) => {
    setSearchState(value);
    setCurrentPage(1);
  };

  const setSort = (value) => {
    setSortState(value);
    setCurrentPage(1);
  };

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
  });

  const [editFeatures, setEditFeatures] = useState([]);
  const [newFeatureInput, setNewFeatureInput] = useState("");
  const [savingFeature, setSavingFeature] = useState(false);

  const [editImages, setEditImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [savingImages, setSavingImages] = useState(false);

  const getCatalogue = async () => {
    try {
      setLoading(true);

      const res = await catalogueServices.fetchCatalogueListAdmin();

      setCatalogue(res?.data?.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch catalogue",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCatalogue();

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

  const searchText = search.trim().toLowerCase();
  const filteredCatalogue = catalogue.filter((item) => {
    if (!searchText) return true;

    return (
      item.product_display_name?.toLowerCase().includes(searchText) ||
      item.category?.cat_display_name?.toLowerCase().includes(searchText) ||
      item.brand?.brand_display_name?.toLowerCase().includes(searchText)
    );
  });

  // Applied after search, before pagination, so a sort change re-sorts
  // whatever the current search has already narrowed down to.
  const sortedCatalogue = [...filteredCatalogue].sort((a, b) => {
    switch (sort) {
      case "name_asc":
        return (a.product_display_name || "").localeCompare(
          b.product_display_name || "",
        );
      case "name_desc":
        return (b.product_display_name || "").localeCompare(
          a.product_display_name || "",
        );
      case "category":
        return (a.category?.cat_display_name || "").localeCompare(
          b.category?.cat_display_name || "",
        );
      case "brand":
        return (a.brand?.brand_display_name || "").localeCompare(
          b.brand?.brand_display_name || "",
        );
      case "oldest":
        return new Date(a.created_at) - new Date(b.created_at);
      case "newest":
      default:
        return new Date(b.created_at) - new Date(a.created_at);
    }
  });

  const totalPages = Math.max(
    1,
    Math.ceil(sortedCatalogue.length / PAGE_SIZE),
  );

  // Clamped rather than raw `currentPage` - e.g. deleting the last item on
  // the last page would otherwise leave the admin stuck on a now-empty page
  // until they manually click back.
  const safePage = Math.min(currentPage, totalPages);

  const paginatedCatalogue = sortedCatalogue.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = async (item) => {
    setEditingProduct(item);
    setShowEditModal(true);
    setLoadingEditDetail(true);

    try {
      const [detailRes, featuresRes] = await Promise.all([
        productsServices.getProductByIdApi(item.product_id),
        productsServices.listProductFeaturesApi(item.product_id),
      ]);

      const detail = detailRes.data.data;

      setEditData({
        cat_id: detail.category?.id || "",
        brand_id: detail.brand?.id || "",
        product_name: detail.product_display_name || "",
        short_description: detail.short_description || "",
        full_description: detail.full_description || "",
      });

      setEditFeatures(featuresRes.data.data || []);
      setEditImages(detail.images || []);
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
  };

  const handleUpdate = async () => {
    try {
      setSavingEdit(true);

      await catalogueServices.updateCatalogueProductApi(
        editingProduct.product_id,
        {
          cat_id: editData.cat_id,
          brand_id: editData.brand_id,
          product_name: editData.product_name,
          short_description: editData.short_description,
          full_description: editData.full_description,
        },
      );

      toast.success("Catalogue item updated successfully");
      handleCancel();
      getCatalogue();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update catalogue item",
      );
    } finally {
      setSavingEdit(false);
    }
  };

  // FEATURES - immediate add/remove, same as ProductEditModal.jsx.
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

  // IMAGES - immediate add/remove, same as ProductEditModal.jsx.
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

  // FIX: no more window.confirm() here - the confirmation step is now the
  // inline tick/cross toggle in ListCatalogue.jsx's Actions column, so by
  // the time this runs the admin has already confirmed.
  const handleDelete = async (item) => {
    try {
      await catalogueServices.deleteCatalogueProductApi(item.product_id);
      toast.success("Removed from catalogue");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to remove from catalogue",
      );
    } finally {
      getCatalogue();
    }
  };

  const handleRestore = async (item) => {
    try {
      await catalogueServices.restoreCatalogueProductApi(item.product_id);
      toast.success("Restored to catalogue");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to restore catalogue item",
      );
    } finally {
      getCatalogue();
    }
  };

  const handleStatusToggle = (item) => {
    if (item.is_active) {
      handleDelete(item);
    } else {
      handleRestore(item);
    }
  };

  return {
    catalogue: paginatedCatalogue,
    // Unfiltered, so stat cards stay stable while searching.
    allCatalogue: catalogue,
    totalCount: catalogue.length,
    filteredCount: filteredCatalogue.length,
    loading,
    search,
    setSearch,
    sort,
    setSort,

    currentPage: safePage,
    totalPages,
    handlePageChange,

    categories,
    brands,

    showEditModal,
    editingProduct,
    loadingEditDetail,
    savingEdit,
    editData,
    setEditData,

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

export default useCatalogueList;
