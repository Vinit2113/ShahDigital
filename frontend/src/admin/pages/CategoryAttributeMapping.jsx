import { useState } from "react";
import { Layers, Search, Check, Save, RotateCcw } from "lucide-react";
import useCategoryAttributeMapping from "../hooks/CatAttributesHooks/useCatAttributeHook";

const CategoryAttributeMapping = () => {
  const {
    categories,
    attributes,
    mapping,

    loading,

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
  } = useCategoryAttributeMapping();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Admin / Category Attribute Mapping
          </p>

          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            Category Attribute Mapping
          </h1>

          <p className="text-gray-500 mt-2">
            Assign attributes to product categories.
          </p>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm shadow-gray-200/50">
            <p className="text-gray-500 text-sm">Total Categories</p>

            <h2 className="text-3xl font-bold mt-2">{categories.length}</h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm shadow-gray-200/50">
            <p className="text-gray-500 text-sm">Available Attributes</p>

            <h2 className="text-3xl font-bold mt-2">{attributes.length}</h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm shadow-gray-200/50">
            <p className="text-gray-500 text-sm">Total Mapping</p>

            <h2 className="text-3xl font-bold mt-2 text-green-600">
              {mapping.length}
            </h2>
          </div>
        </div>

        <div
          className="
        bg-white 
        rounded-3xl 
        border 
        border-gray-200 
        shadow-md 
        shadow-gray-200/40
        overflow-hidden
      "
        >
          <div className="grid lg:grid-cols-3">
            {/* CATEGORY PANEL */}

            <div className="border-r border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="font-semibold text-lg">Categories</h2>

                <div className="relative mt-5">
                  <Search
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Search category"
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="
                    w-full
                    border
                    border-gray-200
                    rounded-2xl
                    bg-gray-50
                    pl-10
                    py-3
                    outline-none
                    focus:bg-white
                    focus:ring-2
                    focus:ring-gray-200
                    transition-all
                  "
                  />
                </div>
              </div>

              <div className="p-5 space-y-3">
                {loading ? (
                  <p className="text-gray-500 p-5">Loading categories...</p>
                ) : (
                  filteredCategories.map((category) => (
                    <button
                      key={category.cat_id}
                      onClick={() => handleCategory(category)}
                      className={`
                    w-full
                    text-left
                    p-5
                    rounded-2xl
                    border
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-md

                    ${
                      selectedCategory?.cat_id === category.cat_id
                        ? "bg-zinc-900 text-white border-zinc-900 shadow-md shadow-black/10"
                        : "border-gray-200 hover:bg-gray-50"
                    }
                  `}
                    >
                      <div className="font-semibold">{category.cat_name}</div>

                      <p
                        className={`
                      text-sm
                      mt-1
                      ${
                        selectedCategory?.cat_id === category.cat_id
                          ? "text-gray-300"
                          : "text-gray-500"
                      }
                    `}
                      >
                        {category.cat_description}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* ATTRIBUTE PANEL */}

            <div className="lg:col-span-2">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div
                    className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                  shadow-sm
                "
                  >
                    <Layers />
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg">
                      {/* {selectedCategory.cat_name} */}
                      {selectedCategory?.cat_name || "Select Category"}
                    </h2>

                    <p className="text-sm text-gray-500">
                      Select attributes for this category
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative mb-5 md:col-span-2">
                    <Search
                      size={18}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      type="text"
                      placeholder="Search attribute"
                      value={attributeSearch}
                      onChange={(e) => setAttributeSearch(e.target.value)}
                      className="
                      w-full
                      border
                      border-gray-200
                      rounded-2xl
                      bg-gray-50
                      pl-10
                      py-3
                      outline-none
                      focus:bg-white
                      focus:ring-2
                      focus:ring-gray-200
                      transition-all
                    "
                    />
                  </div>

                  {filteredAttributes.map((attribute) => {
                    const checked = selectedAttributes.includes(
                      attribute.attribute_id,
                    );

                    return (
                      <button
                        key={attribute.attribute_id}
                        onClick={() => toggleAttribute(attribute.attribute_id)}
                        className={`
                        flex
                        items-center
                        justify-between
                        border
                        rounded-2xl
                        p-5
                        transition-all
                        duration-300

                        ${
                          checked
                            ? "border-gray-400 bg-gray-50 shadow-sm"
                            : "border-gray-200 hover:bg-gray-50 hover:shadow-sm"
                        }
                      `}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`
                            w-5
                            h-5
                            rounded-md
                            border
                            flex
                            items-center
                            justify-center

                            ${
                              checked
                                ? "bg-zinc-900 border-zinc-900 text-white"
                                : "border-gray-300"
                            }
                          `}
                          >
                            {checked && <Check size={14} />}
                          </div>

                          <span className="font-medium">
                            {attribute.attribute_name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>{" "}
              {/* FOOTER ACTIONS */}
              <div
                className="
              border-t
              border-gray-200
              p-6
              flex
              justify-end
              gap-4
            "
              >
                <button
                  onClick={resetMapping}
                  className="
                  flex
                  items-center
                  gap-2
                  border
                  border-gray-300
                  px-5
                  py-3
                  rounded-2xl
                  hover:bg-gray-100
                  transition-all
                  duration-300
                "
                >
                  <RotateCcw size={18} />
                  Reset
                </button>

                <button
                  onClick={saveMapping}
                  className="
                  flex
                  items-center
                  gap-2
                  bg-zinc-900
                  text-white
                  px-6
                  py-3
                  rounded-2xl
                  shadow-md
                  shadow-black/10
                  hover:bg-black
                  transition-all
                  duration-300
                "
                >
                  <Save size={18} />
                  Save Mapping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAttributeMapping;
