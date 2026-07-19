// REWRITTEN (CategoryAttributeList.jsx): tree view flipped back to
// CATEGORY-centric per feedback - each CATEGORY is the root branch (click
// to expand/collapse), and its ATTRIBUTES (e.g. "Processor", "RAM",
// "Color") render as leaf nodes underneath with a vertical tree-guide
// line. This is intentionally separate from CategoryAttributeMapping.jsx
// (the "Assign To Category" editor) - this page has no checkboxes/save
// button, it's just a viewer.
// Data comes from useCatAttributeListHook.js. See that file for why the
// mapping is fetched per-category (no bulk backend endpoint exists).
// Routed at /admin/attributes/mappings (see App.jsx) and linked from the
// sidebar under Attributes > "Mapping Overview" (see AdminSidebar.jsx).

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Boxes,
  Layers,
  Search,
  Settings2,
} from "lucide-react";
import { useNavigate } from "react-router";
import useCatAttributeList from "../hooks/CatAttributesHooks/useCatAttributeListHook";

const CategoryBranch = ({ category, attributes }) => {
  const hasAttributes = attributes.length > 0;
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => hasAttributes && setOpen(!open)}
        className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-50 transition"
      >
        {hasAttributes ? (
          open ? (
            <ChevronDown size={18} className="text-gray-500 shrink-0" />
          ) : (
            <ChevronRight size={18} className="text-gray-500 shrink-0" />
          )
        ) : (
          <span className="w-[18px] shrink-0" />
        )}

        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
          <Boxes size={18} className="text-gray-700" />
        </div>

        <div>
          <p className="font-semibold">{category.cat_name}</p>
          <p className="text-xs text-gray-500">
            {hasAttributes
              ? `${attributes.length} connected attribute${attributes.length === 1 ? "" : "s"}`
              : "No attributes mapped yet"}
          </p>
        </div>
      </button>

      {/* Attribute leaf nodes - a vertical tree-guide line runs along the
          left of this block, with each leaf (e.g. Processor, RAM, Color)
          branching off it. */}
      {open && hasAttributes && (
        <div className="pl-[3.75rem] pr-6 pb-3">
          <div className="border-l border-gray-200 ml-[3px]">
            {attributes.map((attribute) => (
              <div
                key={attribute.attribute_id}
                className="relative pl-6 py-1.5"
              >
                <span className="absolute left-0 top-1/2 w-4 h-px bg-gray-200" />
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-700">
                    {attribute.attribute_display_name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CategoryAttributeList = () => {
  const navigate = useNavigate();

  const {
    filteredCategories,
    attributesByCat,
    loading,
    search,
    setSearch,
    totalCategories,
    mappedCount,
    unmappedCount,
  } = useCatAttributeList();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 mb-8">
          <div>
            <p className="text-sm text-gray-500">
              Admin / Attributes / Mapping Overview
            </p>

            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              Category Attribute Tree
            </h1>

            <p className="text-gray-500 mt-2">
              Expand a category to see which attributes it's connected to.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/attributes/assign")}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            <Settings2 size={18} />
            Manage Mappings
          </button>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-5 mb-7">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Total Categories</p>
            <h2 className="text-3xl font-bold mt-2">{totalCategories}</h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Mapped Categories</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {mappedCount}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Unmapped Categories</p>
            <h2 className="text-3xl font-bold text-red-500 mt-2">
              {unmappedCount}
            </h2>
          </div>
        </div>

        {/* Search */}

        <div className="relative mb-6 max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search category..."
            className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-black"
          />
        </div>

        {/* Tree Card */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {loading ? (
            <p className="text-center text-gray-500 py-10">
              Loading category attribute tree...
            </p>
          ) : filteredCategories.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No categories found.
            </p>
          ) : (
            filteredCategories.map((category) => (
              <CategoryBranch
                key={category.cat_id}
                category={category}
                attributes={attributesByCat[category.cat_id] || []}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryAttributeList;
