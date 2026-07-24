import { FaTruckFast, FaShieldHalved, FaHeadset } from "react-icons/fa6";

const TrustStrip = () => {
  const items = [
    {
      icon: <FaTruckFast />,
      title: "Fast Delivery",
      desc: "Quick shipping across locations",
    },
    {
      icon: <FaShieldHalved />,
      title: "Verified Products",
      desc: "100% genuine IT hardware",
    },
    {
      icon: <FaHeadset />,
      title: "Warranty Support",
      desc: "Dedicated after-sales service",
    },
  ];

  return (
    <div className="mt-16 border-t border-blue-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-2xl bg-blue-50/40 border border-blue-100 hover:bg-blue-50 transition"
            >
              {/* Icon */}
              <div className="text-2xl text-[#0a54ff]">{item.icon}</div>

              {/* Text */}
              <div>
                <h4 className="font-semibold text-blue-950">{item.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
