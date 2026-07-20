import { useRef } from "react";
import { FaBolt, FaShoppingCart } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import routerImg from "../../../assets/FeaturedProducts/router.jpg";
import hddImg from "../../../assets/FeaturedProducts/hdd.jpg";
import printerImg from "../../../assets/FeaturedProducts/printer.jpg";
import switchImg from "../../../assets/FeaturedProducts/switch.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// RANDOM PRODUCT API FROM BACKEND TO DISPLAY RANDOM PRODUCT EVERYTIME THE PAGE REFRESH !

const products = [
  {
    id: 1,
    name: "Cisco Gigabit Router",
    price: "₹4,999",
    tag: "Best Seller",
    image: routerImg,
  },
  {
    id: 2,
    name: "Seagate 1TB External HDD",
    price: "₹3,499",
    tag: "Trending",
    image: hddImg,
  },
  {
    id: 3,
    name: "HP Laser Printer",
    price: "₹9,999",
    tag: "Recently Added",
    image: printerImg,
  },
  {
    id: 4,
    name: "TP-Link Network Switch",
    price: "₹2,299",
    tag: "Best Seller",
    image: switchImg,
  },
];

const FeaturedProducts = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray(".product-tile").forEach((tile) => {
        gsap.from(tile, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tile,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-white">
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

        {/* Full-bleed image filmstrip */}
        <div className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {products.map((item) => (
            <div
              key={item.id}
              className="product-tile group relative shrink-0 w-60 sm:w-72 h-80 sm:h-96 rounded-2xl overflow-hidden snap-start"
            >
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Gradient scrim so text sits directly on the image */}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />

              {/* Badge */}
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full flex items-center gap-1">
                <FaBolt size={10} />
                {item.tag}
              </div>

              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3 className="font-semibold text-white text-sm sm:text-base">
                  {item.name}
                </h3>

                <button className="mt-3 cursor-pointer w-full flex items-center justify-center gap-2 bg-white text-blue-700 py-2 rounded-xl hover:bg-blue-50 transition text-sm sm:text-base font-medium opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 duration-300">
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
