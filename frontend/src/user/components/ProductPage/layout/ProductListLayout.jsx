// @ts-ignore
const ProductListLayout = ({ children, filters }) => {
  return (
    <div className="bg-linear-to-br from-blue-50 via-white to-blue-100">
      {/* <ProductControlsBar // @ts-ignore totalResults={128} /> */}

      <div className="max-w-full mx-auto pl-8 py-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* LEFT SIDEBAR - FILTERS */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">{filters}</div>
        </aside>

        {/* RIGHT GRID - PRODUCTS */}
        <main className="lg:col-span-4">{children}</main>
      </div>
    </div>
  );
};

export default ProductListLayout;
