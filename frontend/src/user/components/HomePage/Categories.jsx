// @ts-nocheck
import { FaHdd, FaPrint, FaShieldAlt } from "react-icons/fa";
import {
  FaCableCar,
  FaKeyboard,
  FaNetworkWired,
  FaPlug,
  FaServer,
} from "react-icons/fa6";
import { useNavigate } from "react-router";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Networking", icon: <FaNetworkWired /> },
    { name: "Storage Devices", icon: <FaHdd /> },
    { name: "Computer Accessories", icon: <FaKeyboard /> },
    { name: "Cables & Connectors", icon: <FaCableCar /> },
    { name: "Servers", icon: <FaServer /> },
    { name: "Security Devices", icon: <FaShieldAlt /> },
    { name: "Printers", icon: <FaPrint /> },
    { name: "Power Solutions", icon: <FaPlug /> },
  ];

  const handleClick = (category) => {
    const slug = category.toLowerCase().replace(/\s+/g, "-");
    navigate(`/products/${slug}`);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-950">
            Categories we sell
          </h2>
          <p className="text-gray-600 mt-2 sm:mt-3 text-base sm:text-lg">
            Find IT & hardware products by category
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((item, i) => (
            <div
              key={i}
              onClick={() => handleClick(item.name)}
              className="group p-5 sm:p-6 rounded-2xl bg-white border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 "
            >
              {/* Icon */}
              <div className="text-xl sm:text-2xl text-blue-600 mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <h3 className="font-semibold text-blue-900 text-sm sm:text-base">
                {item.name}
              </h3>

              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                Explore products
              </p>

              {/* Accent line */}
              <div className="mt-3 sm:mt-4 h-1 w-0 bg-[#0a54ff] rounded-full group-hover:w-16 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
