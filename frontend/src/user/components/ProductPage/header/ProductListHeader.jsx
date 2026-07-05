const ProductListHeader = ({ categoryName = "Products" }) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-20">


        {/* Title + Description */}
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {categoryName === "Products" ? "All Products" : categoryName}
          </h1>

          <p className="mt-5 text-lg text-gray-600 leading-relaxed">
            Explore high-quality IT hardware and networking solutions. Find
            reliable products tailored for your business and personal needs.
          </p>

          {/* Accent line */}
          <div className="mt-6 h-1 w-20 bg-[#0a54ff] rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default ProductListHeader;
