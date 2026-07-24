import { useRef } from "react";
import {
  FaShippingFast,
  FaCheckCircle,
  FaShieldAlt,
  FaBoxes,
} from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      // Connector line grows left-to-right as the row scrolls into view.
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left" });
      gsap.to(lineRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 0.6,
        },
      });

      // Each node pops in on its own trigger, left to right.
      gsap.utils.toArray(".why-node").forEach((node) => {
        gsap.from(node, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: node,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-linear-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-950">⭐ Why Choose Us</h2>
          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Trusted by IT professionals for reliable hardware sourcing
          </p>
        </div>

        {/* Connected flow */}
        <div className="relative">
          {/* Connector line - desktop only */}
          <div
            ref={lineRef}
            className="hidden md:block absolute top-8 left-8 right-8 h-0.5 bg-blue-200"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
            {features.map((item) => (
              <div
                key={item.id}
                className="why-node relative z-10 flex md:flex-col items-center md:text-center gap-4"
              >
                {/* Icon node */}
                <div className="shrink-0 w-16 h-16 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center text-blue-600 text-2xl shadow-sm hover:border-[#0a54ff] hover:text-[#0a54ff] hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-blue-950 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
