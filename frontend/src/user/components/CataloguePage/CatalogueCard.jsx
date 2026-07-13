import { useEffect, useState } from "react";
import BreadCrumbs from "../../layouts/BreadCrumbs";
import CatalogueFilter from "./CatalogueFilter";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import baseURL, { fetchCatalogue } from "./CatalogueAPI";
import ContactModal from "./ContactModel";

// const backendURL = import.meta.env.VITE_BACKEND_URL;
const backendImgURL = import.meta.env.VITE_BACKEND_IMG_URL;
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

const CatalogueCard = () => {
  const [catalogues, setCatalogues] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const getCatalogues = async () => {
      try {
        const res = await fetchCatalogue();

        setCatalogues(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCatalogues();
  }, []);

  // WHATSAPP ONCLICK MSG SENIDNG
  const handleWhatsApp = async (product) => {
    const message = `
Hello,

I am writing to inquire about your product.

Product Details:
Name: ${product.product_display_name}
Description: ${product.full_description}

Kindly share detailed specifications, pricing, and availability at your earliest convenience.

Looking forward to your response.
`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
  };
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
              placeholder="Search products, SKU, category..."
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {catalogues.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found matching your search.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {catalogues.map((catProduct) => (
              <div
                key={catProduct.product_id}
                className="group rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden rounded-t-2xl bg-linear-to-br from-blue-950 to-blue-800 p-4">
                  <img
                    aria-label="true"
                    role="dialog"
                    // src={catProduct.media_url}
                    src={`${backendImgURL}${catProduct.media_url}`}
                    alt={catProduct.product_display_name}
                    className="h-44 w-full rounded-xl object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-900">
                      {catProduct.brand_display_name}
                    </span>

                    <span className="text-[11px] text-gray-400">
                      {catProduct.cat_display_name}
                    </span>
                  </div>

                  <h3 className="mt-3 line-clamp-1 text-base font-semibold text-gray-900">
                    {catProduct.product_display_name}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                    {catProduct.full_description}
                  </p>

                  {/* FEATURES */}
                  <div className="mt-3 space-y-4">
                    {catProduct.features?.map((features, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FaCheckCircle className="text-xs text-green-500" />
                        <span className="text-xs text-gray-600">
                          {features}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* ACTION */}
                  <div className="mt-4 flex justify-center gap-10 border-t pt-3">
                    {/* CONTACT US */}
                    <button
                      onClick={() => setSelectedProduct(catProduct)}
                      className="text-sm font-medium text-blue-950 transition cursor-pointer hover:text-blue-700"
                    >
                      Enquire Now
                    </button>

                    {/* WHATSAPP */}
                    <button
                      onClick={() => handleWhatsApp(catProduct)}
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
        )}

        {/* PRODUCT GRID */}

        {/* PAGINATION */}
        {/* <CataloguePagination /> */}
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
