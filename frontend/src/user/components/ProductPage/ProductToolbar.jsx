import { FaFilter, FaSort, FaSliders, FaXmark } from "react-icons/fa6";

const ProductToolbar = () => {
  return (
    <section className="sticky top-0 z-20 bg-white border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left */}
          <div>
            <h2 className="text-2xl font-bold text-blue-950">
              Networking Products
            </h2>

            <p className="text-gray-500 mt-1">Showing 120 products</p>
          </div>

          {/* Right Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search products..."
              className="h-11 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Filter Button */}
            <button className="flex items-center gap-2 px-5 h-11 rounded-xl border border-gray-200 hover:bg-blue-50">
              <FaFilter />
              Filters
            </button>

            {/* Sort */}
            <select className="h-11 px-4 rounded-xl border border-gray-200 bg-white">
              <option>Newest First</option>
              <option>Name A-Z</option>
              <option>Name Z-A</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductToolbar;
