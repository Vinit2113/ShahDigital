// @ts-nocheck
import Filters from "../components/ProductPage/filters/Filters.jsx";
import ProductGrid from "../components/ProductPage/gird/ProductGrid.jsx";
import ProductListHeader from "../components/ProductPage/header/ProductListHeader";
import ProductListLayout from "../components/ProductPage/layout/ProductListLayout.jsx";
import Pagination from "../components/ProductPage/pagination/Pagination.jsx";
import TrustStrip from "../components/ProductPage/trust/TrustStrip.jsx";

const ProductPage = () => {
  return (
    <>
      <ProductListHeader />

      <ProductListLayout filters={<Filters />}>
        <ProductGrid />
      </ProductListLayout>

      <Pagination />

      <TrustStrip />
    </>
  );
};

export default ProductPage;
