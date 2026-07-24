// @ts-nocheck
import { useState } from "react";

const ProductControlsBar = () => {
  const totalResults = 128;

  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("popular");

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);
  };

  const handleViewChange = (mode) => {
    setView(mode);
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0
                    bg-white/80 backdrop-blur-md
                    border-b border-gray-100 shadow-sm"
    >
      {/* LEFT: Results */}
      <div className="text-gray-900 font-semibold text-base sm:text-lg">
        <span className="text-[#0a54ff]">{totalResults}</span> products
      </div>

      {/* RIGHT: Controls */}
      <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto flex-wrap">
        {/* Sort Dropdown */}
        <select
          value={sort}
          onChange={handleSortChange}
          className="text-sm px-4 py-2 rounded-xl border border-gray-200 
                     bg-white text-gray-900 shadow-sm
                     focus:bg-gray-50 focus:border-[#0a54ff] 
                     focus:ring-2 focus:ring-blue-100 outline-none transition"
        >
          <option value="popular">Popular</option>
          <option value="price_low">Price: Low → High</option>
          <option value="price_high">Price: High → Low</option>
          <option value="newest">Newest</option>
          <option value="featured">Featured</option>
        </select>

        {/* View Toggle */}
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => handleViewChange("grid")}
            className={`px-4 py-2 text-sm font-medium transition ${
              view === "grid"
                ? "bg-[#0a54ff] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Grid
          </button>

          <button
            onClick={() => handleViewChange("list")}
            className={`px-4 py-2 text-sm font-medium transition border-l border-gray-200 ${
              view === "list"
                ? "bg-[#0a54ff] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductControlsBar;
