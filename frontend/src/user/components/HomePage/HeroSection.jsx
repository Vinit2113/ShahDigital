import { useEffect } from "react";
import { Link } from "react-router";
import { fetchHeroSec } from "../CataloguePage/CatalogueAPI";

const HeroSection = () => {
  useEffect(() => {
    const loadHero = async () => {
      try {
        const resData = await fetchHeroSec();
        console.log("Hero Section: ", resData);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    loadHero();
  }, []);

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-12">
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-6">
              Trusted Product Catalogue
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-950 leading-tight">
              Discover Products
              <span className="block text-[#0a54ff]">Faster & Smarter</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              Explore our complete catalogue of premium products. Easily search,
              compare and find exactly what you need across multiple categories.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <Link
                to={"/"}
                className="px-8 py-4 rounded-xl bg-[#0a54ff] text-white font-semibold hover:bg-blue-700 transition text-center"
              >
                Browse Catalogue
              </Link>

              <Link
                to={"/"}
                className="px-8 py-4 rounded-xl border border-blue-200 text-blue-900 font-semibold hover:bg-blue-50 transition text-center"
              >
                Contact Us
              </Link>
            </div>

            {/* STATS */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 sm:gap-12 mt-10 sm:mt-12">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-blue-900">
                  500+
                </h3>
                <p className="text-gray-500">Products</p>
              </div>

              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-blue-900">
                  50+
                </h3>
                <p className="text-gray-500">Categories</p>
              </div>

              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-blue-900">
                  10K+
                </h3>
                <p className="text-gray-500">Customers</p>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative flex justify-center mt-10 lg:mt-0">
            {/* Main Catalogue Card */}
            <div className="w-full max-w-sm sm:max-w-md lg:w-112.5 lg:h-125 bg-white rounded-3xl shadow-2xl p-4 sm:p-6 border border-blue-100">
              <div className="h-40 sm:h-48 lg:h-56 rounded-2xl bg-linear-to-r from-blue-700 to-blue-900"></div>

              <div className="mt-6">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-900">
                  Product Catalogue
                </h3>

                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                  Complete collection of our latest products.
                </p>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
                  <div className="h-20 sm:h-24 bg-blue-50 rounded-xl"></div>
                  <div className="h-20 sm:h-24 bg-blue-50 rounded-xl"></div>
                  <div className="h-20 sm:h-24 bg-blue-50 rounded-xl"></div>
                  <div className="h-20 sm:h-24 bg-blue-50 rounded-xl"></div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -left-2 sm:-left-6 top-8 sm:top-12 bg-white p-3 sm:p-4 rounded-2xl shadow-lg">
              <h4 className="font-semibold text-blue-900 text-sm sm:text-base">
                500+ Products
              </h4>
            </div>

            <div className="absolute -right-2 sm:-right-6 bottom-10 sm:bottom-16 bg-white p-3 sm:p-4 rounded-2xl shadow-lg">
              <h4 className="font-semibold text-blue-900 text-sm sm:text-base">
                Instant Search
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
