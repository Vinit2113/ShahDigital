// CHANGED: editing is now modal-based instead of inline-in-the-table-row,
// same reasoning and shape as listBrandHooks.js - lets the admin also
// replace/add a category's image, which an inline row edit couldn't
// reasonably support.
import { useEffect, useState } from "react";
import useListCatHook from "./listCategoryHooks";
import updateCatHook from "./updateCategoryHooks";
import deleteCatHook from "./deleteCategoryHooks";
import useRestoreCat from "./restoreCatHooks";

const useCategory = () => {
  const { categories, loading, getCategories } = useListCatHook();

  const { updateCategory, loading: savingEdit } = updateCatHook();
  const { deleteCategory } = deleteCatHook();
  const { restoreCat } = useRestoreCat();

  const [showEditModal, setShowEditModal] = useState(false);
  // NEW: keeps the full category row being edited (not just its id), so
  // the modal can show its EXISTING image as a fallback preview until/unless
  // the admin picks a new one.
  const [editingCategory, setEditingCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState({
    cat_name: "",
    cat_description: "",
  });

  // NEW: optional replacement image picked in the edit modal.
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  // SEARCH FITLER
  const filterCategories = categories.filter((category) => {
    const searchText = search.trim().toLowerCase();

    return (
      category.cat_name?.toLowerCase().includes(searchText) ||
      category.cat_display_name?.toLowerCase().includes(searchText) ||
      category.cat_description?.toLowerCase().includes(searchText)
    );
  });

  const handleEdit = (category) => {
    setEditingCategory(category);

    setEditData({
      cat_name: category.cat_name,
      cat_description: category.cat_description ?? "",
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
    setEditingCategory(null);

    setEditData({
      cat_name: "",
      cat_description: "",
    });

    setEditImageFile(null);
    setEditImagePreview(null);
  };

  // TOGGLE STATUS
  const handleStatusToggle = async (category) => {
    try {
      if (category.cat_is_active === 1) {
        await deleteCategory(category.cat_id);
      } else {
        await restoreCat(category.cat_id);
      }
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  // CHANGED: only closes the modal / refetches on SUCCESS now - previously
  // this ran unconditionally, so a failed update (e.g. duplicate name)
  // silently closed the row and discarded the admin's edits instead of
  // letting them fix and retry. Same fix applied to listBrandHooks.js.
  const handleUpdate = async () => {
    const success = await updateCategory(editingCategory.cat_id, {
      ...editData,
      imageFile: editImageFile,
    });

    if (success) {
      handleCancel();
      getCategories();
    }
  };

  const handleDelete = async (catId) => {
    await deleteCategory(catId);

    getCategories();
  };

  const handleRestore = async (catId) => {
    await restoreCat(catId);

    getCategories();
  };

  return {
    categories: filterCategories,
    loading,

    showEditModal,
    editingCategory,
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

export default useCategory;
