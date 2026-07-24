import { useRef, useState } from "react";
import {
  FaWhatsapp,
  FaBoxes,
  FaHandshake,
  FaHeadset,
  FaTruck,
  FaTools,
  FaVideo,
  FaNetworkWired,
  FaClipboardCheck,
  FaCheckCircle,
  FaComments,
  FaClipboardList,
  FaShippingFast,
  FaLifeRing,
} from "react-icons/fa";
import { Link } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BrandLogos from "../components/HomePage/BrandLogos";
import { getWhatsAppLink } from "../utils/whatsapp";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const enquiryMessage = `Hello,

I came across Shah Digital and would like to know more about your products and services.

Kindly share the details.

Thank you.`;

const trustStats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Products" },
  { value: "10K+", label: "Customers" },
];

const capabilities = [
  "Direct sourcing from authorized distributors",
  "Competitive pricing on bulk and retail orders",
  "On-site repairing and installation",
  "CCTV and networking setup and support",
  "Post-sale maintenance and AMC support",
];

const highlights = [
  {
    icon: <FaBoxes />,
    title: "Wide Product Range",
    desc: "Networking, storage, peripherals and enterprise IT hardware under one roof.",
  },
  {
    icon: <FaHandshake />,
    title: "Genuine Products",
    desc: "Sourced directly from authorized distributors of leading global brands.",
  },
  {
    icon: <FaTruck />,
    title: "Reliable Supply",
    desc: "Consistent stock availability and prompt dispatch for bulk and retail orders.",
  },
  {
    icon: <FaHeadset />,
    title: "Dedicated Support",
    desc: "Personalized assistance before and after every purchase.",
  },
];

const services = [
  {
    icon: <FaTools />,
    title: "Repairing",
    desc: "Diagnosis and repair for computers, laptops and IT hardware, backed by genuine spare parts.",
  },
  {
    icon: <FaVideo />,
    title: "CCTV Installation",
    desc: "Site survey, supply and installation of CCTV and surveillance systems for homes and offices.",
  },
  {
    icon: <FaNetworkWired />,
    title: "Networking",
    desc: "Structured cabling, Wi-Fi and networking infrastructure setup for homes and businesses.",
  },
  {
    icon: <FaClipboardCheck />,
    title: "AMC & Maintenance",
    desc: "Annual maintenance contracts for offices to keep systems running with minimal downtime.",
  },
];

const process = [
  {
    icon: <FaComments />,
    step: "01",
    title: "Enquire",
    desc: "Reach out over WhatsApp or call with your requirement.",
  },
  {
    icon: <FaClipboardList />,
    step: "02",
    title: "Consult",
    desc: "We understand your needs and recommend the right products.",
  },
  {
    icon: <FaShippingFast />,
    step: "03",
    title: "Supply & Install",
    desc: "Genuine products delivered, installed and set up on-site.",
  },
  {
    icon: <FaLifeRing />,
    step: "04",
    title: "Ongoing Support",
    desc: "Repairing, AMC and networking support whenever you need it.",
  },
];

const AboutUsPage = () => {
  const rootRef = useRef(null);

  const handleEnquiry = () => {
    window.open(getWhatsAppLink(enquiryMessage), "_blank");
  };

  useGSAP(
    () => {
      // Hero entrance
      const heroTl = gsap.timeline();
      heroTl
        .from(".about-hero-badge", { y: -20, opacity: 0, duration: 0.6 })
        .from(
          ".about-hero-title",
          { y: 30, opacity: 0, duration: 0.8 },
          "-=0.3",
        )
        .from(
          ".about-hero-desc",
          { y: 20, opacity: 0, duration: 0.7 },
          "-=0.5",
        )
        .from(
          ".about-hero-cta",
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.15 },
          "-=0.4",
        )
        .from(
          ".about-hero-stat",
          { y: 15, opacity: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3",
        );

      // Section headings that sit above a card grid (heading fades in on its
      // own; the grid below handles its own staggered reveal, so the two
      // never overlap and fight over the same elements).
      gsap.utils.toArray(".reveal-heading").forEach((heading) => {
        gsap.from(heading, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // Whole-section reveals, only used on sections with no card grid.
      gsap.utils.toArray(".reveal-section").forEach((section) => {
        gsap.from(section, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // Numbered index rows (What We Offer / Our Services / How We Work).
      // Each row gets its own independent scrollTrigger + timeline - one
      // element per trigger, never a stagger()'d call across a live
      // collection (that combination was found to silently never render
      // its end state - see the ScrollTrigger.batch note this replaced).
      gsap.utils.toArray(".index-row").forEach((row) => {
        const line = row.querySelector(".index-line");
        const content = row.querySelector(".index-content");
        gsap
          .timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          })
          .from(content, { y: 24, opacity: 0, duration: 0.5, ease: "power2.out" })
          .fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.5, ease: "power2.out" },
            "-=0.3",
          );
      });

      // Brand logo images load after mount and shift page layout, which can
      // leave earlier ScrollTrigger start positions stale - recompute once
      // everything has actually loaded.
      const refresh = () => ScrollTrigger.refresh();
      const images = rootRef.current.querySelectorAll("img");
      images.forEach((img) => {
        if (!img.complete) img.addEventListener("load", refresh);
      });
      window.addEventListener("load", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        images.forEach((img) => img.removeEventListener("load", refresh));
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef}>
      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-blue-100">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <span className="about-hero-badge inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-6">
            About Shah Digital
          </span>

          <h1 className="about-hero-title text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-950 leading-tight">
            Your Trusted Partner for
            <span className="block text-[#0a54ff]">IT Hardware & Services</span>
          </h1>

          <p className="about-hero-desc mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Shah Digital procures genuine computer hardware and IT equipment
            from authorized distributors and supplies it directly to
            businesses and individuals — along with repairing, CCTV and
            networking services to keep it all running.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <button
              onClick={handleEnquiry}
              className="about-hero-cta inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#1ebe5b] transition"
            >
              <FaWhatsapp size={20} />
              Enquire on WhatsApp
            </button>

            <Link
              to="/catalogue"
              className="about-hero-cta px-8 py-4 rounded-xl border border-blue-200 text-blue-900 font-semibold hover:bg-blue-50 transition text-center"
            >
              Browse Catalogue
            </Link>
          </div>

          {/* TRUST STATS */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-14 mt-14">
            {trustStats.map((stat) => (
              <div key={stat.label} className="about-hero-stat text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-blue-900">
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="reveal-section py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-950">
              Who We Are
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              With years of experience in the IT hardware trade, Shah Digital
              has built strong relationships with leading distributors. We
              procure networking equipment, storage devices, peripherals and
              enterprise infrastructure and supply it directly to our clients
              — businesses and individuals alike.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Beyond supply, we also provide on-ground services including
              repairing, CCTV installation and networking setup — so our
              clients get both the hardware and the support to keep it
              running, from a single trusted partner.
            </p>
          </div>

          <ul className="space-y-4">
            {capabilities.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <FaCheckCircle className="text-[#0a54ff] mt-1 shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="py-16 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="reveal-heading text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-950">
              What We Offer
            </h2>
            <p className="text-gray-600 mt-3">
              Everything you need from a single sourcing partner
            </p>
          </div>

          <div>
            {highlights.map((item, i) => (
              <IndexRow
                key={item.title}
                index={String(i + 1).padStart(2, "0")}
                icon={item.icon}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="reveal-heading text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-950">
              Our Services
            </h2>
            <p className="text-gray-600 mt-3">
              Installation and support services alongside every sale
            </p>
          </div>

          <ServicesShowcase services={services} />
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-16 sm:py-20 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="reveal-heading text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-950">
              How We Work
            </h2>
            <p className="text-gray-600 mt-3">
              From first message to ongoing support, in four simple steps
            </p>
          </div>

          <ProcessStepper steps={process} />
        </div>
      </section>

      {/* BRANDS */}
      <div className="reveal-section">
        <BrandLogos />
      </div>

      {/* ENQUIRY CTA */}
      <section className="reveal-section py-16 bg-[#0a54ff]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Have a requirement in mind?
          </h2>
          <p className="mt-4 text-blue-100">
            Chat with us directly on WhatsApp and we&apos;ll help you find the
            right product, pricing and availability.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleEnquiry}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#1ebe5b] transition"
            >
              <FaWhatsapp size={20} />
              Enquire Now
            </button>

            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const IndexRow = ({ index, icon, title, desc }) => (
  <div className="index-row group relative border-b border-gray-100 last:border-b-0">
    <span className="index-line absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#0a54ff]" />
    <div className="index-content flex items-center gap-4 sm:gap-6 py-6 sm:py-7 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xl transition-colors duration-300 group-hover:bg-blue-50/60">
      <span className="text-3xl sm:text-4xl font-bold text-blue-100 group-hover:text-blue-200 transition-colors w-14 sm:w-16 shrink-0 tabular-nums">
        {index}
      </span>

      <span className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-lg sm:text-xl group-hover:bg-[#0a54ff] group-hover:text-white transition-all duration-300">
        {icon}
      </span>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-blue-950 text-base sm:text-lg group-hover:text-[#0a54ff] transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base mt-1">{desc}</p>
      </div>

      <span className="hidden sm:inline-block text-blue-300 text-lg group-hover:text-[#0a54ff] group-hover:translate-x-1 transition-all duration-300">
        →
      </span>
    </div>
  </div>
);

// Interactive tab list + detail panel - click a service to see it front and
// center, instead of another scanned list. Deliberately unlike IndexRow
// (click-driven, not scroll-revealed) and unlike Home's tree/connector
// sections, so all three About sections read as distinct treatments.
const ServicesShowcase = ({ services }) => {
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const panelRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(wrapRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: wrapRef },
  );

  useGSAP(
    () => {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      );
    },
    { dependencies: [active], scope: wrapRef },
  );

  const current = services[active];

  return (
    <div
      ref={wrapRef}
      className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-3 md:gap-10"
    >
      {/* Tab list */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
        {services.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActive(i)}
            className={`shrink-0 text-left flex items-center gap-3 px-4 py-3 md:py-4 rounded-xl border-l-4 transition-all duration-300 ${
              active === i
                ? "bg-blue-50 border-[#0a54ff]"
                : "border-transparent hover:bg-gray-50"
            }`}
          >
            <span
              className={`text-lg shrink-0 ${
                active === i ? "text-[#0a54ff]" : "text-blue-400"
              }`}
            >
              {item.icon}
            </span>
            <span
              className={`font-semibold text-sm sm:text-base whitespace-nowrap md:whitespace-normal ${
                active === i ? "text-[#0a54ff]" : "text-blue-950"
              }`}
            >
              {item.title}
            </span>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div className="relative bg-linear-to-br from-blue-50 to-white rounded-3xl p-8 sm:p-12 min-h-64 flex flex-col justify-center overflow-hidden">
        <div ref={panelRef}>
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0a54ff] text-white flex items-center justify-center text-2xl sm:text-3xl mb-6 shadow-lg shadow-blue-500/20">
            {current.icon}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-blue-950">
            {current.title}
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed max-w-md">
            {current.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

// Horizontal step path whose connector fills - and whose step markers
// activate - as you scroll through the section (scrubbed to scroll
// position, not a one-time reveal). A third distinct treatment: What We
// Offer is a static scanned list, Our Services is click-driven, this one
// is continuously tied to scroll progress.
const ProcessStepper = ({ steps }) => {
  const wrapRef = useRef(null);

  useGSAP(
    () => {
      const fill = wrapRef.current.querySelector(".stepper-fill");
      const dots = gsap.utils.toArray(".stepper-dot", wrapRef.current);

      gsap.set(fill, { scaleX: 0, transformOrigin: "left" });

      gsap.to(fill, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 60%",
          end: "bottom 70%",
          scrub: 0.5,
          onUpdate: (self) => {
            // Inline styles (not class toggles) so this reliably wins over
            // the static Tailwind classes regardless of stylesheet order -
            // two classes of equal specificity (bg-white vs bg-[#0a54ff])
            // otherwise fight based on generated CSS order, not DOM order.
            const activeIdx = Math.floor(self.progress * dots.length);
            dots.forEach((dot, i) => {
              const isActive = i <= activeIdx;
              gsap.set(dot, {
                backgroundColor: isActive ? "#0a54ff" : "#ffffff",
                borderColor: isActive ? "#0a54ff" : "#bfdbfe",
                color: isActive ? "#ffffff" : "#60a5fa",
              });
            });
          },
        },
      });
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} className="relative">
      {/* Track + scroll-filled progress line (desktop only) */}
      <div className="hidden sm:block absolute left-0 right-0 top-7 h-1 bg-blue-100 rounded-full" />
      <div className="stepper-fill hidden sm:block absolute left-0 right-0 top-7 h-1 bg-[#0a54ff] rounded-full" />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 sm:gap-4">
        {steps.map((item) => (
          <div
            key={item.step}
            className="relative flex sm:flex-col items-center sm:text-center gap-4 sm:gap-3"
          >
            <div className="stepper-dot shrink-0 relative z-10 w-14 h-14 rounded-full border-2 border-blue-200 bg-white flex items-center justify-center text-blue-400 text-xl transition-colors duration-300">
              {item.icon}
            </div>
            <div>
              <span className="text-xs font-bold text-blue-400">
                {item.step}
              </span>
              <h3 className="font-semibold text-blue-950 text-base sm:text-lg">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
