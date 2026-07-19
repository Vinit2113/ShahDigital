// REWRITTEN (useCatAttributeListHook.js): powers the read-only "Mapping
// Overview" tree at /admin/attributes/mappings. Flipped back to
// CATEGORY-centric (category = root branch, its attributes = leaf nodes,
// e.g. category "Laptops" -> attributes "Processor", "RAM", "Color") -
// this was attribute-centric for a moment, but that's been reverted per
// feedback: category as the main node, attributes as the sub-nodes.

import { useEffect, useState } from "react";
import useCatActiveList from "./useCatActiveListHook";
import catAttributeServices from "../../services/catAttribute.services";
import toast from "react-hot-toast";

const useCatAttributeList = () => {
  // Root list - one branch per active category.
  const { categories, loading: categoriesLoading } = useCatActiveList();

  // Map of { [cat_id]: [{ attribute_id, attribute_display_name }, ...] }
  const [attributesByCat, setAttributesByCat] = useState({});
  const [loadingMap, setLoadingMap] = useState(false);
  const [search, setSearch] = useState("");

  // NEW: there is no backend endpoint that returns "all categories with
  // their attributes" in one call - listMappedCatAt only takes a single
  // cat_id (backend/controllers/cat_attribute/listMappedCatAttribute.controller.js).
  // So once the category list loads, fetch that same per-category endpoint
  // once per category, in parallel.
  useEffect(() => {
    if (categories.length === 0) return;

    const fetchAll = async () => {
      setLoadingMap(true);

      try {
        const results = await Promise.all(
          categories.map((category) =>
            catAttributeServices
              .getMappedAttributesApi(category.cat_id)
              .then((res) => [category.cat_id, res?.data?.data || []])
              .catch(() => [category.cat_id, []]),
          ),
        );

        setAttributesByCat(Object.fromEntries(results));
      } catch (err) {
        toast.error(
          err?.response?.data?.message || "Failed to fetch category attributes",
        );
      } finally {
        setLoadingMap(false);
      }
    };

    fetchAll();
  }, [categories]);

  // Client-side name filter for the search box on the overview page.
  const filteredCategories = categories.filter((category) =>
    category.cat_name?.toLowerCase().includes(search.toLowerCase()),
  );

  // Drives the "Mapped Categories" / "Unmapped Categories" stat tiles.
  const mappedCount = categories.filter(
    (category) => (attributesByCat[category.cat_id]?.length || 0) > 0,
  ).length;

  return {
    categories,
    filteredCategories,
    attributesByCat,
    loading: categoriesLoading || loadingMap,
    search,
    setSearch,
    totalCategories: categories.length,
    mappedCount,
    unmappedCount: categories.length - mappedCount,
  };
};

export default useCatAttributeList;
