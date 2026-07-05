import { useState, useEffect } from "react";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import BreadCrumbs from "../../layouts/BreadCrumbs";
import CatalogueFilter from "./CatalogueFilter";
import toast from "react-hot-toast";
import ContactModal from "./ContactModel";
import CataloguePagination from "./CataloguePagination";
import { useSearchParams } from "react-router";
import { fetchCatalogue } from "./CatalogueAPI";

// LATER ON MUST USE TANSTACK INSTEAD OF USEEFFECT , LOADING SKELETONS, ERROR BOUNDRIES, IMAGE OPTIMIZATION, SEARCH DEBOUNCING, URL STATE MANAGEMENT , EMPTY STATE
/**
 * CataloguePage
│
├── CatalogueHeader
├── CatalogueSearch
├── CatalogueGrid
│
├── ProductCard
│
├── CataloguePagination
│
└── ContactModal
 */

const CatalogueCard = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [catalogue, setCatalogue] = useState({
    data: [],
    totalPages: 1,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        if (search) params.set("search", search);
        else params.delete("search");
        return params;
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const currentPage = pageFromUrl;

  const limit = 20;

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    // AbortController(): IT ALLOWS TO CANCEL AN ONGOING ASYNCHRONOUS OPERATIONS, most commonly an HTTP request
    const controller = new AbortController();

    const productFetch = async () => {
      const toastId = toast.loading("Loading products...");

      try {
        setLoading(true);

        const data = await fetchCatalogue(
          currentPage,
          limit,
          controller.signal,
          search,
        );

        console.log(data.data);

        setCatalogue({
          data: data.data,
          totalPages: data.pagination.totalPages,
          loading: false,
          error: null,
        });

        toast.success("Products loaded", { id: toastId });
      } catch (error) {
        toast.error("Failed to fetch Data", { id: toastId });
      } finally {
        setLoading(false);
      }
    };

    productFetch();
    return () => {
      controller.abort();
    };
  }, [currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ page: String(page) });
  };

  const buildWhatsAppMessage = (product) => {
    try {
      console.log("Heree is product whatsapp sku", product.sku);

      return `Hello,

I am writing to inquire about your product.

Product Details:
Name: ${product.catalogue_name}
SKU: ${product.sku}
Category: ${product.category?.cat_name}
Description: ${product.description || "N/A"}

Kindly share detailed specifications, pricing, and availability at your earliest convenience.

Looking forward to your response.`;
    } catch (error) {
      console.log(error);

      toast.error("Error connecting whatsapp");
    }
  };

  const handleWhatsAppClick = (product) => {
    const message = buildWhatsAppMessage(product);
    const cleanNumber =
      import.meta.env.VITE_WHATSAPP_NUMBER?.toString().replace(/[^\d]/g, "");
    // const url = ``
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredProducts = catalogue.data.filter((product) => {
    const query = debouncedSearch.toLowerCase();

    return (
      product.catalogue_name?.toLowerCase().includes(query) ||
      product.sku?.toLowerCase().includes(query) ||
      product.category?.cat_name?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    );
  });

  return (
    <section className="bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* BREADCRUMBS */}
        <div className="mb-4">
          <BreadCrumbs />
        </div>

        <CatalogueFilter />

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-blue-950">
            Product Catalogue
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Explore enterprise IT hardware, networking, servers, and business
            systems
          </p>

          <div className="mx-auto mt-6 max-w-xl">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search products, SKU, category..."
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {filteredProducts.length === 0 && !loading && (
          <p className="text-center text-gray-500">
            No products found matching your search.
          </p>
        )}

        {/* PRODUCT GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.catalogue_id}
              className="group rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-t-2xl bg-linear-to-br from-blue-950 to-blue-800 p-4">
                <img
                  src={`http://localhost:14892${product.image_url}`}
                  alt={`${product.catalogue_name} product image`}
                  aria-label="true"
                  role="dialog"
                  className="h-44 w-full rounded-xl object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-900">
                    {product.category?.cat_name}
                  </span>

                  <span className="text-[11px] text-gray-400">
                    {product.sku}
                  </span>
                </div>

                <h3 className="mt-3 line-clamp-1 text-base font-semibold text-gray-900">
                  {product.catalogue_name}
                </h3>

                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                  {product.description}
                </p>

                {/* FEATURES */}
                <div className="mt-3 space-y-2">
                  {product.features?.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FaCheckCircle className="text-xs text-green-500" />
                      <span className="text-xs text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* ACTION */}
                <div className="mt-4 flex justify-center gap-10 border-t pt-3">
                  {/* CONTACT US */}
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="text-sm font-medium text-blue-950 transition cursor-pointer hover:text-blue-700"
                  >
                    Contact Us
                  </button>

                  {/* WHATSAPP */}
                  <button
                    onClick={() => handleWhatsAppClick(product)}
                    className="flex cursor-pointer items-center gap-1 text-sm font-medium text-green-600 transition hover:text-green-700"
                  >
                    <FaWhatsapp />
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <CataloguePagination
          currentPage={currentPage}
          totalPages={catalogue.totalPages}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </div>

      {/* CONTACT MODAL */}
      <ContactModal
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </section>
  );
};

export default CatalogueCard;
