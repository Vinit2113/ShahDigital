// @ts-nocheck
// NOTE: this Home page showcase is a separate, hardcoded list of 8
// categories with icons - it is NOT fetched from the admin-managed
// categories table (backend/routes/category.routes.js), so changes made
// in the admin Categories section have no effect here. This may be
// intentional (a curated marketing list can legitimately differ from the
// internal product categories used for SKU organization), but it's worth
// a deliberate decision rather than an assumption - flagged here so it's
// not mistaken for a bug later.
import { useRef } from "react";
import { FaHdd, FaPrint, FaShieldAlt, FaSitemap } from "react-icons/fa";
import {
  FaCableCar,
  FaKeyboard,
  FaNetworkWired,
  FaPlug,
  FaServer,
} from "react-icons/fa6";
import { useNavigate } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

const Categories = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const treeRef = useRef(null);
  const trunkRef = useRef(null);
  const mobileLineRef = useRef(null);

  const handleClick = () => {
    // FIX: was navigating to /products/:slug, a route that doesn't exist
    // (App.jsx only has a plain /products placeholder) - every category
    // click landed on a blank page. Points at the real placeholder route
    // until per-category product pages exist.
    navigate("/products");
  };

  useGSAP(
    () => {
      // Trunk "grows" downward as the tree scrolls into view (desktop
      // centered trunk + the simpler left-hand mobile line both use the
      // same grow animation).
      [trunkRef.current, mobileLineRef.current].forEach((line) => {
        if (!line) return;
        gsap.set(line, { scaleY: 0, transformOrigin: "top" });
        gsap.to(line, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: treeRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        });
      });

      // Hub pops in first, with its glow rings trailing slightly behind.
      gsap.from(".cat-hub", {
        scale: 0.6,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: treeRef.current, start: "top 75%" },
      });
      gsap.from(".cat-hub-glow", {
        scale: 0.4,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: treeRef.current, start: "top 75%" },
      });

      // Each branch (connector + node) slides in from its own side, one at
      // a time as it's reached - a stagger()'d single from() call on a
      // live collection was found to silently never render its end state
      // (see AboutUsPage history), so each branch gets its own independent
      // scrollTrigger instead of a single staggered call.
      gsap.utils.toArray(".cat-branch").forEach((branch) => {
        const fromSide = branch.dataset.side === "left" ? -30 : 30;
        gsap.from(branch, {
          x: fromSide,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: branch,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-24 bg-linear-to-br from-blue-50 via-white to-blue-100"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-950">
            Categories we sell
          </h2>
          <p className="text-gray-600 mt-2 sm:mt-3 text-base sm:text-lg">
            Everything we supply, branching from one trusted source
          </p>
        </div>

        {/* Hub */}
        <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28">
          <span className="cat-hub-glow absolute inset-0 rounded-full bg-blue-400/40 animate-ping" />
          <span className="cat-hub-glow absolute -inset-3 rounded-full bg-blue-300/20" />
          <div className="cat-hub relative z-10 w-full h-full rounded-full bg-linear-to-br from-[#3b82f6] to-[#0a1a4d] shadow-xl shadow-blue-900/30 ring-4 ring-white flex flex-col items-center justify-center gap-1">
            <FaSitemap className="text-white text-xl sm:text-2xl" />
            <span className="text-white text-[10px] sm:text-xs font-semibold tracking-wide">
              Shah Digital
            </span>
          </div>
        </div>

        {/* Tree */}
        <div ref={treeRef} className="relative mt-2">
          {/* Desktop trunk line */}
          <div
            ref={trunkRef}
            className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-300"
          />
          {/* Mobile trunk line (simple left-hand timeline) */}
          <div
            ref={mobileLineRef}
            className="sm:hidden absolute left-6 top-6 bottom-6 w-0.5 bg-blue-300"
          />

          <div className="space-y-6 sm:space-y-5 pt-8 sm:pt-10">
            {categories.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.name}
                  className="relative sm:grid sm:grid-cols-[1fr_3rem_1fr] sm:items-center"
                >

                  <div className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#0a54ff] ring-4 ring-blue-50 z-10" />
                  <div
                    className={`hidden sm:block absolute top-1/2 -translate-y-1/2 h-0.5 w-6 bg-blue-300 ${
                      isLeft ? "right-1/2" : "left-1/2"
                    }`}
                  />

                  <div
                    className={
                      isLeft
                        ? "sm:col-start-1 sm:flex sm:items-center sm:justify-end"
                        : "sm:col-start-3"
                    }
                  >
                    <CategoryNode
                      item={item}
                      isLeft={isLeft}
                      onClick={() => handleClick(item.name)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const CategoryNode = ({ item, isLeft, onClick }) => (
  <button
    type="button"
    data-side={isLeft ? "left" : "right"}
    onClick={onClick}
    className={`cat-branch group inline-flex items-center gap-3 sm:gap-4 text-left ${
      isLeft ? "sm:flex-row-reverse sm:text-right" : ""
    }`}
  >
    <span className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-lg sm:text-xl shadow-sm group-hover:bg-[#0a54ff] group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30 group-hover:scale-110 group-hover:border-transparent transition-all duration-300">
      {item.icon}
    </span>
    <span>
      <span className="block font-semibold text-blue-900 text-sm sm:text-base group-hover:text-[#0a54ff] transition-colors">
        {item.name}
      </span>
      <span className="block text-xs sm:text-sm text-gray-500 mt-0.5">
        Explore products →
      </span>
    </span>
  </button>
);

export default Categories;
