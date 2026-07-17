import { useEffect, useState } from "react";
import useCatActiveList from "./useCatActiveListHook";

const attributes = [
  {
    attribute_id: 1,
    attribute_name: "Processor",
  },
  {
    attribute_id: 2,
    attribute_name: "RAM",
  },
  {
    attribute_id: 3,
    attribute_name: "Storage Type",
  },
  {
    attribute_id: 4,
    attribute_name: "Storage Capacity",
  },
  {
    attribute_id: 5,
    attribute_name: "Graphics",
  },
  {
    attribute_id: 6,
    attribute_name: "Print Speed",
  },
  {
    attribute_id: 7,
    attribute_name: "Resolution",
  },
];

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
  const { categories, loading, refetch: getCategories } = useCatActiveList();

  console.log("Here is active cat list", categories);

  const [categorySearch, setCategorySearch] = useState("");
  const [attributeSearch, setAttributeSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  // No need to fetch categories here because
  // useCatActiveList() already fetches them automatically.

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

  const filteredCategories = categories.filter((category) =>
    category.cat_name?.toLowerCase().includes(categorySearch.toLowerCase()),
  );

  const filteredAttributes = attributes.filter((attribute) =>
    attribute.attribute_name
      .toLowerCase()
      .includes(attributeSearch.toLowerCase()),
  );

  const handleCategory = (category) => {
    setSelectedCategory(category);

    const mappedAttributes = mapping
      .filter((item) => item.category_id === category.cat_id)
      .map((item) => item.attribute_id);

    setSelectedAttributes(mappedAttributes);
  };

  const toggleAttribute = (id) => {
    setSelectedAttributes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const resetMapping = () => {
    if (!selectedCategory) return;

    const mappedAttributes = mapping
      .filter((item) => item.category_id === selectedCategory.cat_id)
      .map((item) => item.attribute_id);

    setSelectedAttributes(mappedAttributes);
  };

  const saveMapping = () => {
    const payload = {
      category_id: selectedCategory.cat_id,
      attributes: selectedAttributes,
    };

    console.log(payload);
    return payload;
  };

  return {
    categories,
    loading,
    getCategories, // alias of refetch if needed

    attributes,
    mapping,

    categorySearch,
    setCategorySearch,

    attributeSearch,
    setAttributeSearch,

    selectedCategory,
    selectedAttributes,

    filteredCategories,
    filteredAttributes,

    handleCategory,
    toggleAttribute,

    resetMapping,
    saveMapping,
  };
};

export default useCategoryAttributeMapping;
