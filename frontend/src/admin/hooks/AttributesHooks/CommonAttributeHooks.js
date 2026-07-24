import { useEffect, useState } from "react";
import useListAttributeHook from "./listAttributeHooks";
import useDeleteAttribute from "./DeleteAttributeHooks";
import useRestoreAttribute from "./restoreAttributeHooks";
import updateAttributeHook from "./updateAttributeHooks";

const useAttribute = () => {
  const { attributes, getAttributes, loading, setAttributes } =
    useListAttributeHook();
  const { deleteAttribute } = useDeleteAttribute();
  const { restoreAttribute } = useRestoreAttribute();
  const { updateAttribute } = updateAttributeHook();
  const [modalMode, setModalMode] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [selectedAttribute, setSelectedAttribute] = useState(null);

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState({
    attribute_name: "",
    attribute_description: "",
  });

  useEffect(() => {
    getAttributes();
  }, []);

  // MODEL FOR PRODUCT DESCRIPTION

  const closeViewModal = () => {
    setShowModal(false);
    setModalMode(null);
    setEditId(null);

    setEditData({
      attribute_name: "",
      attribute_display_name: "",
      attribute_description: "",
    });

    setTimeout(() => {
      setSelectedAttribute(null);
    }, 200);
  };

  const openViewModal = (item) => {
    setSelectedAttribute(item);
    setModalMode("view");
    setShowModal(true);
  };

  const handleEdit = (attribute) => {
    setEditId(attribute.attribute_id);

    setEditData({
      attribute_name: attribute.attribute_name || "",
      attribute_display_name: attribute.attribute_display_name || "",
      attribute_description: attribute.attribute_description || "",
    });

    setSelectedAttribute(attribute);
    setModalMode("edit");
    setShowModal(true);
  };

  // ACTIVE ATTRIBUTE COUNTER
  const activeCount = attributes.filter(
    (item) => item.attribute_is_active,
  ).length;

  const inactiveCount = attributes.length - activeCount;

  // SEARCH FILTER
  const filterAttributes = attributes.filter((attribute) => {
    const searchText = search.trim().toLowerCase();

    return (
      attribute.attribute_name?.toLowerCase().includes(searchText) ||
      attribute.attribute_display_name?.toLowerCase().includes(searchText) ||
      attribute.attribute_description?.toLowerCase().includes(searchText)
    );
  });

  // DELETE
  // FIX: no more window.confirm() here - ListAttribute.jsx now arms an
  // inline tick/cross toggle on the row before calling this, same pattern
  // as commontCatHooks.js/handleDelete.
  const handleDelete = async (attributeId) => {
    await deleteAttribute(attributeId);

    getAttributes();
  };
  const handleCancel = () => {
    setEditId(null);
    setEditData({
      attribute_name: "",
      attribute_description: "",
    });
  };

  // TOGGLE STATUS
  // FIX: no more window.confirm() here either - same reasoning as
  // handleDelete above.
  const handleToggleStatus = async (attribute) => {
    try {
      if (attribute.attribute_is_active === 1) {
        await deleteAttribute(attribute.attribute_id);
      } else {
        await restoreAttribute(attribute.attribute_id);
      }
      getAttributes();
    } catch (error) {
    }
  };

  // UPDATE DETAILS
  const handleUpdate = async () => {
    try {
      const isSame =
        selectedAttribute.attribute_name === editData.attribute_name &&
        selectedAttribute.attribute_display_name ===
          editData.attribute_display_name &&
        selectedAttribute.attribute_description ===
          editData.attribute_description;

      // No changes
      if (isSame) {
        return;
      }

      await updateAttribute(editId, editData);

      // Refresh list with updated data
      await getAttributes();

      // Close modal after successful update
      closeViewModal();
    } catch (error) {
    }
  };

  // RESTORE
  const handleRestore = async (attributeid) => {
    await restoreAttribute(attributeid);

    getAttributes();
  };

  return {
    attributes: filterAttributes,
    loading,

    showModal,
    selectedAttribute,

    openViewModal,
    closeViewModal,
    setShowModal,
    modalMode,

    editId,
    editData,

    activeCount,
    inactiveCount,

    search,
    setSearch,

    setEditData,
    handleEdit,
    handleCancel,
    handleUpdate,
    handleDelete,
    handleRestore,
    handleToggleStatus,
  };
};

export default useAttribute;
