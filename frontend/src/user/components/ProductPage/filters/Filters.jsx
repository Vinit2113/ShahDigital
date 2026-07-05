// @ts-nocheck
import { useState } from "react";
import FilterSection from "./FilterSection";

const Filters = () => {
  const [categorySearch, setCategorySearch] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categoriesData = [
    "Mouse",
    "Keyboard",
    "Monitor",
    "Laptop",
    "Desktop PC",
    "Server",
    "Storage Device",
    "SSD",
    "HDD",
    "RAM",
    "Processor (CPU)",
    "Motherboard",
    "Graphics Card (GPU)",
    "Router",
    "Switch",
    "Access Point",
    "CCTV Camera",
    "DVR",
    "NVR",
    "Printer",
    "Scanner",
    "UPS",
    "IP Phone",
    "Biometric Device",
    "POS Machine",
    "Gaming Accessories",
    "Networking Accessories",
    "Server Accessories",
    "CCTV Accessories",
  ];

  const brands = [
    "HP",
    "Dell",
    "Lenovo",
    "Asus",
    "Acer",
    "TP-Link",
    "D-Link",
    "Seagate",
    "Western Digital",
    "Kingston",
  ];

  const ratings = ["4★ & Above", "3★ & Above"];

  const specifications = [
    "SSD",
    "HDD",
    "1TB Storage",
    "2TB Storage",
    "8GB RAM",
    "16GB RAM",
    "32GB RAM",
    "1 Gbps+ Speed",
    "8+ Port Switch",
    "WiFi 6",
  ];

  const filteredCategories = categoriesData.filter((category) =>
    category.toLowerCase().includes(categorySearch.toLowerCase()),
  );

  const displayedCategories = showAllCategories
    ? filteredCategories
    : filteredCategories.slice(0, 8);

  return (
    <div className="space-y-4">
      {/* CATEGORY */}
      <FilterSection title="Category">
        <input
          type="text"
          placeholder="Search category..."
          value={categorySearch}
          onChange={(e) => setCategorySearch(e.target.value)}
          className="w-full border rounded-md p-2 text-sm mb-3"
        />

        {/* ✅ SCROLL FIXED HERE */}
        <div className="space-y-2 h-64 overflow-y-auto pr-2  rounded-md p-2">
          {displayedCategories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 text-sm text-blue-900 "
            >
              <input type="checkbox" />
              {category}
            </label>
          ))}
        </div>

        {filteredCategories.length > 8 && (
          <button
            type="button"
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="mt-3 text-sm text-blue-600 cursor-pointer hover:text-blue-800"
          >
            {showAllCategories ? "Show Less" : "Show More"}
          </button>
        )}
      </FilterSection>

      {/* PRICE */}
      <FilterSection title="Price Range">
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full border rounded-md p-2 text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>
      </FilterSection>

      {/* BRAND */}
      <FilterSection title="Brand">
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 text-sm text-blue-900"
            >
              <input type="checkbox" />
              {brand}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* AVAILABILITY */}
      <FilterSection title="Availability">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-blue-900">
            <input type="checkbox" />
            In Stock
          </label>

          <label className="flex items-center gap-2 text-sm text-blue-900">
            <input type="checkbox" />
            Out of Stock
          </label>
        </div>
      </FilterSection>

      {/* ADVANCED FILTERS */}
      <div className=" rounded-lg bg-white">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between p-4 font-medium text-blue-900"
        >
          <span>Advanced Filters</span>
          <span>{showAdvanced ? "−" : "+"}</span>
        </button>

        {showAdvanced && (
          <div className="p-4 border-t border-gray-200 space-y-4">
            {/* RATINGS */}
            <FilterSection title="Ratings">
              <div className="space-y-2">
                {ratings.map((rating) => (
                  <label
                    key={rating}
                    className="flex items-center gap-2 text-sm text-blue-900"
                  >
                    <input type="checkbox" />
                    {rating}
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* SPECIFICATIONS */}
            <FilterSection title="Specifications">
              <div className="space-y-2">
                {specifications.map((spec) => (
                  <label
                    key={spec}
                    className="flex items-center gap-2 text-sm text-blue-900"
                  >
                    <input type="checkbox" />
                    {spec}
                  </label>
                ))}
              </div>
            </FilterSection>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
