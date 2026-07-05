import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

const selectBase =
  "w-full cursor-pointer rounded-xl border border-gray-300 px-4 py-3 pr-10 text-sm text-gray-900 shadow-sm outline-none transition hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20";

const Dropdown = ({ label, options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-700">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`${selectBase} flex items-center justify-between`}
      >
        <span className="truncate">{value || placeholder}</span>
        <span className="text-gray-500 shrink-0">▾</span>
      </button>

      <div
        className={`absolute z-50 mt-2 w-full min-w-0 rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-200 ${
          open
            ? "opacity-100 scale-100"
            : "pointer-events-none opacity-0 scale-95"
        }`}
      >
        <div className="max-h-48 overflow-y-auto py-1">
          <div
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
          >
            {placeholder}
          </div>

          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 wrap-break-word"
            >
              {opt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CatalogueFilter = () => {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      const toastId = toast.loading("Loading filters...");
 
      try {
        setLoading(true);

        const [brandRes, catRes] = await Promise.all([
          axios.get("http://localhost:14892/brand/list"),
          axios.get("http://localhost:14892/cat/list"),
        ]);

        setBrands(brandRes.data.Brands?.map((i) => i.brand_name) || []);
        setCategories(catRes.data.categories?.map((i) => i.cat_name) || []);

        toast.success("Filters loaded", { id: toastId });
      } catch (error) {
        toast.error("Failed to fetch filters", { id: toastId });
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  return (
    <div className="rounded-2xl p-4 sm:p-6 w-full">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3 w-full">
        <Dropdown
          label="Category"
          value={category}
          onChange={setCategory}
          placeholder="All Categories"
          options={categories}
        />

        <Dropdown
          label="Brand"
          value={brand}
          onChange={setBrand}
          placeholder="All Brands"
          options={brands}
        />

        <Dropdown
          label="Sort By Name"
          value={sort}
          onChange={setSort}
          placeholder="Default"
          options={["Name (A - Z)", "Name (Z - A)"]}
        />
      </div>

      {loading && (
        <p className="mt-3 text-sm text-gray-500 text-center sm:text-left">
          Loading filters...
        </p>
      )}
    </div>
  );
};

export default CatalogueFilter;
