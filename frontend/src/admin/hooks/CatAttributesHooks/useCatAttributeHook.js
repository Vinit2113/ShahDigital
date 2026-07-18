import { useCallback, useEffect, useState } from "react";
import useCatActiveList from "./useCatActiveListHook";
import useAttributeActiveList from "./useAttributeActiveListHook";
import catAttributeServices from "../../services/catAttribute.services";
import toast from "react-hot-toast";

// FIX (useCatAttributeHook.js): the hardcoded `mapping` array that used to
// live here has been removed entirely. It never reflected real data - every
// category/attribute pairing was fake, and "Total Mapping" on the page
// always showed the same 9 regardless of what was actually saved. Mapped
// attributes are now fetched per-category from the real backend endpoint
// (GET-style POST /catAttribute/list/map-catat/:cat_id) instead.

const useCategoryAttributeMapping = () => {
  const {
    categories,
    loading: categoryLoading,
    refetch: getCategories,
  } = useCatActiveList();

  const {
    attributes,
    loading: attributeLoading,
    fetchAttribute,
  } = useAttributeActiveList();

  const [categorySearch, setCategorySearch] = useState("");
  const [attributeSearch, setAttributeSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  // FIX: new state to track the mapped-attributes fetch and the save
  // request separately from the category/attribute list loading flags.
  const [mappingLoading, setMappingLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  /**
   * FIX: replaces the old "filter the hardcoded mapping array" logic.
   * Fetches the real mapped attribute ids for one category from the backend.
   */
  const fetchMappedAttributes = useCallback(async (catId) => {
    if (!catId) return;

    setMappingLoading(true);

    try {
      const response = await catAttributeServices.getMappedAttributesApi(catId);
      const mapped = response?.data?.data || [];

      setSelectedAttributes(mapped.map((item) => item.attribute_id));
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to fetch mapped attributes",
      );
    } finally {
      setMappingLoading(false);
    }
  }, []);

  /**
   * Select first category automatically
   * FIX: now triggers a real fetch instead of reading the hardcoded array.
   */
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      const firstCategory = categories[0];

      setSelectedCategory(firstCategory);
      fetchMappedAttributes(firstCategory.cat_id);
    }
  }, [categories, selectedCategory, fetchMappedAttributes]);

  /**
   * Category Search
   */
  const filteredCategories = categories.filter((category) =>
    category.cat_name?.toLowerCase().includes(categorySearch.toLowerCase()),
  );

  /**
   * Attribute Search
   */
  const filteredAttributes = attributes.filter((attribute) =>
    attribute.attribute_name
      ?.toLowerCase()
      .includes(attributeSearch.toLowerCase()),
  );

  /**
   * Change Category
   * FIX: now triggers a real fetch instead of reading the hardcoded array.
   */
  const handleCategory = (category) => {
    setSelectedCategory(category);
    fetchMappedAttributes(category.cat_id);
  };

  /**
   * Select / Unselect Attribute
   */
  const toggleAttribute = (id) => {
    setSelectedAttributes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  /**
   * Reset to Saved Mapping
   * FIX: now re-fetches the real saved mapping from the backend instead of
   * resetting to the hardcoded array.
   */
  const resetMapping = () => {
    if (!selectedCategory) return;
    fetchMappedAttributes(selectedCategory.cat_id);
  };

  /**
   * Save Mapping
   * FIX: this used to build a payload and just `return` it - nothing ever
   * called the network, so the "Save Mapping" button silently did nothing.
   * It now calls the real POST /catAttribute/map/cat_attribute endpoint,
   * with the payload keys (`catId`, `attributeIds`) matching what
   * addAttributeToCategory.controller.js actually reads (the old payload
   * used `category_id`/`attributes`, which would not have matched even if
   * the call had been wired up).
   */
  const saveMapping = async () => {
    if (!selectedCategory) return;

    const payload = {
      catId: selectedCategory.cat_id,
      attributeIds: selectedAttributes,
    };

    setSaving(true);

    try {
      await catAttributeServices.addAttributeToCategoryApi(payload);
      toast.success("Mapping saved successfully");

      // Re-fetch so the UI reflects exactly what the backend persisted
      // (see the sync fix in addAttributeToCategory.controller.js - saving
      // now also removes attributes that were unchecked, not just inserts).
      await fetchMappedAttributes(selectedCategory.cat_id);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save mapping");
    } finally {
      setSaving(false);
    }
  };

  return {
    // Category Data
    categories,
    getCategories,

    // Attribute Data
    attributes,
    fetchAttribute,

    // Loading
    loading: categoryLoading || attributeLoading,
    mappingLoading,
    saving,

    // Search
    categorySearch,
    setCategorySearch,

    attributeSearch,
    setAttributeSearch,

    // Selected Data
    selectedCategory,
    selectedAttributes,

    // Filtered Data
    filteredCategories,
    filteredAttributes,

    // Actions
    handleCategory,
    toggleAttribute,

    resetMapping,
    saveMapping,
  };
};

export default useCategoryAttributeMapping;
