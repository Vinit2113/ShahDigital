import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dell from "../../../assets/Brand_logos/DellLogo.png";
import hp from "../../../assets/Brand_logos/HPLogo.png";
import lenovo from "../../../assets/Brand_logos/lenovoLogo.jpg";
import nvidia from "../../../assets/Brand_logos/Nvidia_logo.png";
import samsung from "../../../assets/Brand_logos/Samsung_logo.jpeg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const brands = [
  { id: 1, name: "Dell", logo: dell },
  { id: 2, name: "HP", logo: hp },
  { id: 3, name: "Lenovo", logo: lenovo },
  { id: 4, name: "Nvidia", logo: nvidia },
  { id: 5, name: "Samsung", logo: samsung },
];

const BrandLogos = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".brand-logos-heading", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="py-10 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="brand-logos-heading text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-950">
            All Leading IT Brands Available
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm">
            We supply and source IT hardware from trusted global manufacturers
            including storage, peripherals, printing, and enterprise solutions.
          </p>
        </div>

        {/* Logo wall - plain marquee, no boxes */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-14 sm:gap-20">
            {[...brands, ...brands].map((brand, index) => (
              <img
                key={index}
                src={brand.logo}
                alt={brand.name}
                title={brand.name}
                className="h-8 sm:h-10 max-w-32 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            ))}
          </div>

          {/* Fade edges so logos scroll in/out smoothly instead of clipping */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-white to-transparent" />
        </div>

        {/* Bottom Text */}
        <p className="text-center text-gray-500 text-xs mt-10">
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
