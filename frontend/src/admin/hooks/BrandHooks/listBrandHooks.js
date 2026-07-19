// Powers ListBrand.jsx (dashboard "All Brands" table) and BrandEditModal.jsx.
// CHANGED: editing is now modal-based instead of inline-in-the-table-row -
// clicking the pencil icon opens BrandEditModal instead of turning the row
// into input fields. This also adds the ability to replace the logo image
// during edit (the old inline row edit only touched name/description).

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import brandsServices from "../../services/brandsServices";

const useBrandList = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  // NEW: tracks the update request itself, separate from the initial
  // page-load `loading` flag, so the modal's Update button can show a
  // saving state and be disabled to prevent double submits.
  const [savingEdit, setSavingEdit] = useState(false);
  // NEW: keeps the full brand row being edited (not just its id), so the
  // modal can show its EXISTING logo as a fallback preview until/unless
  // the admin picks a new one.
  const [editingBrand, setEditingBrand] = useState(null);
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState({
    brand_name: "",
    brand_description: "",
  });

  // NEW: optional replacement logo picked in the edit modal.
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);

  const getBrands = async () => {
    try {
      setLoading(true);

      const res = await brandsServices.fetchBrandListAdmin();

      setBrands(res?.data?.brands || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch brands");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  // SEARCH FILTER
  const filteredBrands = brands.filter((brand) => {
    const searchText = search.trim().toLowerCase();

    return (
      brand.brand_name?.toLowerCase().includes(searchText) ||
      brand.brand_display_name?.toLowerCase().includes(searchText) ||
      brand.brand_description?.toLowerCase().includes(searchText)
    );
  });

  const handleEdit = (brand) => {
    setEditingBrand(brand);

    setEditData({
      brand_name: brand.brand_name,
      brand_description: brand.brand_description ?? "",
    });

    setEditImageFile(null);
    setEditImagePreview(null);
    setShowEditModal(true);
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setEditImageFile(file);
    setEditImagePreview(URL.createObjectURL(file));
  };

  const handleCancel = () => {
    setShowEditModal(false);
    setEditingBrand(null);

    setEditData({
      brand_name: "",
      brand_description: "",
    });

    setEditImageFile(null);
    setEditImagePreview(null);
  };

  const handleUpdate = async () => {
    try {
      setSavingEdit(true);

      await brandsServices.updateBrandApi(
        editingBrand.brand_id,
        editData,
        editImageFile,
      );

      toast.success("Brand updated successfully");
      handleCancel();
      getBrands();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update brand");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (brandId) => {
    try {
      await brandsServices.deleteBrandApi(brandId);

      toast.success("Brand deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete brand");
    } finally {
      getBrands();
    }
  };

  const handleRestore = async (brandId) => {
    try {
      await brandsServices.restoreBrandApi(brandId);

      toast.success("Brand restored successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to restore brand");
    } finally {
      getBrands();
    }
  };

  // TOGGLE STATUS - active brand gets soft-deleted, inactive gets restored
  const handleStatusToggle = async (brand) => {
    if (brand.brand_is_active) {
      await handleDelete(brand.brand_id);
    } else {
      await handleRestore(brand.brand_id);
    }
  };

  return {
    brands: filteredBrands,
    loading,

    showEditModal,
    editingBrand,
    savingEdit,
    editData,
    setEditData,

    editImageFile,
    editImagePreview,
    handleEditImageChange,

    search,
    setSearch,

    handleEdit,
    handleCancel,
    handleUpdate,

    handleDelete,
    handleRestore,
    handleStatusToggle,
  };
};

export default useBrandList;
