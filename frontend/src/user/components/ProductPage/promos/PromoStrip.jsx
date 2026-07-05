/* eslint-disable react-refresh/only-export-components */
const PromoStrip = () => {
  return (
    <div className="my-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="bg-linear-to-r from-[#0a54ff] to-blue-700 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          {/* Text */}
          <div>
            <h3 className="text-2xl font-bold">
              Bulk Order Discounts Available
            </h3>

            <p className="mt-2 text-blue-100">
              Get special pricing for corporate & wholesale IT hardware orders.
            </p>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition">
              Contact Sales
            </button>

            <button className="px-6 py-3 border border-white text-white rounded-xl hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HelpStrip = () => {
  return (
    <div className="my-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="bg-white border border-blue-100 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between shadow-sm">
          <div>
            <h3 className="text-xl font-bold text-blue-950">
              Not sure what to choose?
            </h3>

            <p className="text-gray-600 mt-2">
              Our experts can help you pick the right networking or IT hardware.
            </p>
          </div>

          <button className="mt-4 md:mt-0 px-6 py-3 bg-[#0a54ff] text-white rounded-xl hover:bg-blue-700 transition">
            Get Expert Help
          </button>
        </div>
      </div>
    </div>
  );
};

const FeaturedBrands = () => {
  const brands = [
    "TP-Link",
    "HP",
    "Dell",
    "Seagate",
    "Kingston",
    "Cisco",
    "Lenovo",
  ];

  return (
    <div className="my-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="bg-white border border-blue-100 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-blue-950 mb-4">
            Featured Brands
          </h3>

          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {brands.map((brand, i) => (
              <div
                key={i}
                className="min-w-30 px-4 py-3 bg-blue-50 rounded-xl text-center text-blue-900 font-medium hover:bg-blue-100 transition cursor-pointer"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default { PromoStrip, HelpStrip, FeaturedBrands };
