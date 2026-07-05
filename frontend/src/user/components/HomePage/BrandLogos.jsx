import React from "react";
import kingston from "../../../assets/Brand_logos/DellLogo.png";
import sandisk from "../../../assets/Brand_logos/HPLogo.png";
import zebronics from "../../../assets/Brand_logos/lenovoLogo.jpg";
import brother from "../../../assets/Brand_logos/Nvidia_logo.png";
import corprix from "../../../assets/Brand_logos/Samsung_logo.jpeg";

const BrandLogos = () => {
  const brands = [
    { id: 1, name: "Kingston", logo: kingston },
    { id: 2, name: "SanDisk", logo: sandisk },
    { id: 3, name: "Zebronics", logo: zebronics },
    { id: 4, name: "Brother", logo: brother },
    { id: 5, name: "CorpRix", logo: corprix },
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-950">
            All Leading IT Brands Available
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm">
            We supply and source IT hardware from trusted global manufacturers
            including storage, peripherals, printing, and enterprise solutions.
          </p>
        </div>

        {/* Marquee */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee gap-5">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center min-w-40 bg-blue-50 border border-blue-100 rounded-xl py-5 px-4 shadow-sm hover:shadow-md transition-all"
              >
                {/* Logo Box */}
                <div className="h-12 w-full flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-8 max-w-22.5 object-contain"
                  />
                </div>

                {/* Name */}
                <p className="mt-3 text-sm font-semibold text-blue-950">
                  {brand.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-gray-500 text-xs mt-8">
          We provide hardware solutions across storage, printing, networking
          accessories, and enterprise IT infrastructure.
        </p>
      </div>

      {/* Marquee Animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            animation: marquee 18s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default BrandLogos;
