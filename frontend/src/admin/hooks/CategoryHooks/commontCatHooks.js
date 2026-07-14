import { useEffect, useState } from "react";
import useListCatHook from "./listCategoryHooks";
import updateCatHook from "./updateCategoryHooks";
import deleteCatHook from "./deleteCategoryHooks";
import useRestoreCat from "./restoreCatHooks";

const useCategory = () => {
  const { categories, loading, getCategories } = useListCatHook();

  const { updateCategory } = updateCatHook();

  const { deleteCategory } = deleteCatHook();

  const { restoreCat } = useRestoreCat();

  const [editId, setEditId] = useState(null);

  const [editData, setEditData] = useState({
    cat_name: "",
    cat_description: "",
  });

  useEffect(() => {
    getCategories();
  }, []);

  const handleEdit = (category) => {
    setEditId(category.cat_id);

    setEditData({
      cat_name: category.cat_name,
      cat_description: category.cat_description ?? "",
    });
  };

  const handleCancel = () => {
    setEditId(null);

    setEditData({
      cat_name: "",
      cat_description: "",
    });
  };

  // TOGGLE STATUS
  const handleStatusToggle = async (category) => {
    console.log(category);

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

  const handleUpdate = async (catId) => {
    await updateCategory(catId, editData);

    setEditId(null);

    getCategories();
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
    categories,
    loading,

    editId,
    editData,

    setEditData,

    handleEdit,
    handleCancel,

    handleUpdate,

    handleDelete,
    handleRestore,

    handleStatusToggle,
  };
};

export default useCategory;
