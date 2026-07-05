import {
  FaShippingFast,
  FaCheckCircle,
  FaShieldAlt,
  FaBoxes,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Fast Delivery",
      desc: "Quick dispatch & reliable shipping across locations.",
      icon: <FaShippingFast />,
    },
    {
      id: 2,
      title: "Verified Products",
      desc: "All IT hardware is quality-checked and authentic.",
      icon: <FaCheckCircle />,
    },
    {
      id: 3,
      title: "Warranty & Support",
      desc: "Dedicated support with manufacturer warranty coverage.",
      icon: <FaShieldAlt />,
    },
    {
      id: 4,
      title: "Large Inventory",
      desc: "Wide range of networking, storage & IT equipment.",
      icon: <FaBoxes />,
    },
  ];

  return (
    <section className="py-20 bg-linear-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-950">⭐ Why Choose Us</h2>
          <p className="text-gray-600 mt-3">
            Trusted by IT professionals for reliable hardware sourcing
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 text-center"
            >
              {/* Icon */}
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl group-hover:bg-blue-600 group-hover:text-white transition">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="mt-4 font-semibold text-blue-950 text-lg">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
