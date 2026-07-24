import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Amit Shah",
      role: "IT Manager, TechNova Solutions",
      text: "Reliable supplier for all our hardware needs. Fast delivery and genuine products every time.",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Mehta",
      role: "Procurement Head, Nexa Systems",
      text: "Excellent service and wide range of IT products. Their support team is very responsive.",
      rating: 5,
    },
    {
      id: 3,
      name: "Rahul Patel",
      role: "Admin, Vertex Enterprises",
      text: "Best pricing in the market with consistent quality. We trust them for bulk IT procurement.",
      rating: 4,
    },
    {
      id: 4,
      name: "Sneha Joshi",
      role: "Operations Manager, CloudCore",
      text: "Smooth experience from inquiry to delivery. Highly recommended for enterprise IT supply.",
      rating: 5,
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-blue-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-950">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
            Trusted by businesses for reliable IT hardware supply, fast service,
            and genuine products.
          </p>
        </div>

        {/* Marquee Testimonials */}
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-4 sm:gap-6">
            {[...testimonials, ...testimonials].map((t, index) => (
              <div
                key={index}
                className="min-w-[260px] max-w-[260px] sm:min-w-[320px] sm:max-w-[320px] bg-white border border-blue-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all"
              >
                {/* Quote Icon */}
                <FaQuoteLeft className="text-blue-200 text-2xl mb-3" />

                {/* Text */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  "{t.text}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-4 text-yellow-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                {/* User */}
                <div className="mt-4">
                  <p className="font-semibold text-blue-950">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation */}
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

export default Testimonials;
