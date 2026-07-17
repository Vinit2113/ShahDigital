import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

const categoryTreeData = [
  {
    id: 1,
    name: "Electronics",
    count: 120,
    children: [
      {
        id: 2,
        name: "Mobiles",
        count: 45,
        children: [
          {
            id: 3,
            name: "Android Phones",
            count: 30,
          },
          {
            id: 4,
            name: "iPhones",
            count: 15,
          },
        ],
      },
      {
        id: 5,
        name: "Laptops",
        count: 35,
      },
    ],
  },

  {
    id: 6,
    name: "Fashion",
    count: 90,
    children: [
      {
        id: 7,
        name: "Men",
        count: 50,
      },
      {
        id: 8,
        name: "Women",
        count: 40,
      },
    ],
  },
];

const CategoryNode = ({ category, level = 0 }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="select-none" style={{ marginLeft: `${level * 24}px` }}>
      {/* Category Row */}
      <div
        className="
          flex items-center justify-between
          px-4 py-3 mb-2
          bg-white
          border border-gray-200
          rounded-lg
          hover:bg-gray-50
          transition
        "
      >
        <div className="flex items-center gap-3">
          {category.children?.length > 0 && (
            <button
              onClick={() => setOpen(!open)}
              className="
                text-gray-500
                hover:text-black
              "
            >
              {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
          )}

          {open ? (
            <FolderOpen size={20} className="text-gray-700" />
          ) : (
            <Folder size={20} className="text-gray-700" />
          )}

          <div>
            <h4 className="text-sm font-medium text-gray-800">
              {category.name}
            </h4>

            <span className="text-xs text-gray-400">
              {category.count} Products
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            className="
              p-2
              rounded-lg
              hover:bg-gray-100
              text-gray-500
            "
          >
            <Plus size={16} />
          </button>

          <button
            className="
              p-2
              rounded-lg
              hover:bg-gray-100
              text-gray-500
            "
          >
            <Edit size={16} />
          </button>

          <button
            className="
              p-2
              rounded-lg
              hover:bg-red-50
              text-red-400
            "
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Children */}
      {open &&
        category.children?.map((child) => (
          <CategoryNode key={child.id} category={child} level={level + 1} />
        ))}
    </div>
  );
};

const CategoryTree = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div
        className="
          flex items-center justify-between
          mb-6
        "
      >
        <div>
          <h1
            className="
              text-2xl
              font-semibold
              text-gray-900
            "
          >
            Category Tree
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your product category hierarchy
          </p>
        </div>

        <button
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-lg
            bg-black
            text-white
            text-sm
            hover:bg-gray-800
            transition
          "
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Tree Container */}
      <div
        className="
          bg-white
          border border-gray-200
          rounded-xl
          p-5
        "
      >
        {categoryTreeData.map((category) => (
          <CategoryNode key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryTree;
