import { useEffect, useState } from "react";
import useCatActiveList from "./useCatActiveListHook";
import useAttributeActiveList from "./useAttributeActiveListHook";
import toast from "react-hot-toast";

const mapping = [
  { category_id: 1, attribute_id: 1 },
  { category_id: 1, attribute_id: 2 },
  { category_id: 1, attribute_id: 3 },
  { category_id: 1, attribute_id: 4 },
  { category_id: 1, attribute_id: 5 },

  { category_id: 2, attribute_id: 3 },
  { category_id: 2, attribute_id: 4 },

  { category_id: 3, attribute_id: 6 },
  { category_id: 3, attribute_id: 7 },
];

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

  /**
   * Select first category automatically
   */
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      const firstCategory = categories[0];

      setSelectedCategory(firstCategory);

      const mappedAttributes = mapping
        .filter((item) => item.category_id === firstCategory.cat_id)
        .map((item) => item.attribute_id);

      setSelectedAttributes(mappedAttributes);
    }
  }, [categories, selectedCategory]);

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
   */
  const handleCategory = (category) => {
    setSelectedCategory(category);

    const mappedAttributes = mapping
      .filter((item) => item.category_id === category.cat_id)
      .map((item) => item.attribute_id);

    setSelectedAttributes(mappedAttributes);
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
   * Reset to Default Mapping
   */
  const resetMapping = () => {
    if (!selectedCategory) return;

    const mappedAttributes = mapping
      .filter((item) => item.category_id === selectedCategory.cat_id)
      .map((item) => item.attribute_id);

    setSelectedAttributes(mappedAttributes);
  };

  /**
   * Save Payload
   */
  const saveMapping = () => {
    if (!selectedCategory) return null;

    const payload = {
      category_id: selectedCategory.cat_id,
      attributes: selectedAttributes,
    };

    if (!payload) {
      try {
      } catch (error) {}
    }
    // console.log(payload);

    return payload;
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

    // Mapping
    mapping,

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
