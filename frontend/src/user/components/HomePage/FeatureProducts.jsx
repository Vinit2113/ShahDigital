import { FaBolt, FaShoppingCart } from "react-icons/fa";

// RANDOM PRODUCT API FROM BACKEND TO DISPLAY RANDOM PRODUCT EVERYTIME THE PAGE REFRESH !

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Cisco Gigabit Router",
      price: "₹4,999",
      tag: "Best Seller",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
    },
    {
      id: 2,
      name: "Seagate 1TB External HDD",
      price: "₹3,499",
      tag: "Trending",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    },
    {
      id: 3,
      name: "HP Laser Printer",
      price: "₹9,999",
      tag: "Recently Added",
      image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6",
    },
    {
      id: 4,
      name: "TP-Link Network Switch",
      price: "₹2,299",
      tag: "Best Seller",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-blue-950">
              🔥 Featured Products
            </h2>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
              Trending, best-selling & recently added items
            </p>
          </div>

          <button className="text-blue-600 font-semibold hover:underline w-fit">
            View All →
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 sm:h-44 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badge */}
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full flex items-center gap-1">
                  <FaBolt size={10} />
                  {item.tag}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <h3 className="font-semibold text-blue-950 text-sm sm:text-base">
                  {item.name}
                </h3>

                {/* <p className="text-base sm:text-lg font-bold text-blue-600 mt-1 sm:mt-2">
                  {item.price}
                </p> */}

                {/* CTA */}
                <button className="mt-3 cursor-pointer sm:mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition text-sm sm:text-base">
                  <FaShoppingCart />
                  Shop
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
