import { useRef, useState } from "react";
import { Link } from "react-router";
import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaChevronDown,
  FaHeadset,
} from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getWhatsAppLink } from "../utils/whatsapp";

gsap.registerPlugin(useGSAP);

// TODO: same placeholder phone/email used in ContactUsPage.jsx and
// Footer.jsx - update all three together before launch.
const SUPPORT_PHONE = "+91 98765 43210";
const SUPPORT_EMAIL = "shahdigital18@gmail.com";

const whatsappMessage = `Hello,

I need some support regarding an order / product from Shah Digital.

Thank you.`;

const faqs = [
  {
    question: "How can I check the status of my order?",
    answer:
      "Reach out to us on WhatsApp or call our support line with your order details, and our team will share the latest status with you right away.",
  },
  {
    question: "Do you supply IT hardware in bulk for businesses?",
    answer:
      "Yes, bulk and enterprise hardware supply is one of our core services. Contact us with your requirement and we'll get back to you with pricing and availability.",
  },
  {
    question: "What is your warranty and returns policy?",
    answer:
      "All products are covered under the respective manufacturer warranty. For return or replacement requests, get in touch with our support team within the applicable warranty window.",
  },
  {
    question: "Which areas do you deliver to?",
    answer:
      "We primarily serve Ahmedabad and Gujarat, with pan-India delivery available for bulk and enterprise orders. Contact us to confirm delivery to your location.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We support standard bank transfers and other common business payment methods. Speak with our team to set up the option that works best for your order.",
  },
  {
    question: "I have an issue that isn't listed here - what do I do?",
    answer:
      "No problem - use the contact options below, or head over to our Contact Us page and send us a message. We'll get back to you as soon as possible.",
  },
];

const FaqItem = ({ item, isOpen, onToggle }) => (
  <div className="faq-item border border-blue-100 rounded-2xl bg-white overflow-hidden">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 cursor-pointer"
    >
      <span className="font-semibold text-blue-950 text-sm sm:text-base">
        {item.question}
      </span>
      <FaChevronDown
        className={`shrink-0 text-blue-500 transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>

    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        <p className="px-5 sm:px-6 pb-4 sm:pb-5 text-sm text-gray-600 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  </div>
);

const SupportCard = ({ icon, label, children }) => (
  <div className="support-card bg-white border border-blue-100 rounded-2xl p-5 sm:p-6 text-center shadow-sm hover:shadow-xl transition-shadow duration-300">
    <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-lg mb-3">
      {icon}
    </div>
    <p className="text-sm text-gray-500">{label}</p>
    {children}
  </div>
);

const SupportPage = () => {
  const rootRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  useGSAP(
    () => {
      gsap
        .timeline()
        .from(".support-badge", { y: -16, opacity: 0, duration: 0.5 })
        .from(
          ".support-title",
          { y: 24, opacity: 0, duration: 0.6 },
          "-=0.25",
        )
        .from(".support-desc", { y: 16, opacity: 0, duration: 0.5 }, "-=0.35")
        .from(
          ".support-card",
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
          "-=0.2",
        )
        .from(
          ".faq-item",
          { y: 16, opacity: 0, duration: 0.4, stagger: 0.08 },
          "-=0.2",
        );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden px-4 sm:px-6 py-16 sm:py-20 bg-linear-to-br from-blue-50 via-white to-blue-100"
    >
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-20 w-96 h-96 rounded-full bg-blue-300/30 blur-3xl" />

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <span className="support-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase">
            <FaHeadset />
            Support Center
          </span>
          <h1 className="support-title mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-950">
            How can we help you?
          </h1>
          <p className="support-desc mt-3 text-gray-600 max-w-xl mx-auto">
            Browse quick answers below, or reach our support team directly -
            we're happy to help with orders, products, and anything else.
          </p>
        </div>

        {/* QUICK CONTACT OPTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
          <SupportCard icon={<FaPhone />} label="Call us">
            <a
              href={`tel:${SUPPORT_PHONE.replace(/\s+/g, "")}`}
              className="font-semibold text-blue-950 hover:text-[#0a54ff] transition-colors"
            >
              {SUPPORT_PHONE}
            </a>
          </SupportCard>

          <SupportCard icon={<FaEnvelope />} label="Email us">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-semibold text-blue-950 hover:text-[#0a54ff] break-all transition-colors"
            >
              {SUPPORT_EMAIL}
            </a>
          </SupportCard>

          <SupportCard icon={<FaWhatsapp />} label="Chat with us">
            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#25D366] hover:text-[#1ebe5b] transition-colors"
            >
              WhatsApp Support
            </a>
          </SupportCard>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-blue-950 mb-4 sm:mb-6">
            Frequently asked questions
          </h2>

          <div className="space-y-3">
            {faqs.map((item, index) => (
              <FaqItem
                key={item.question}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => toggleFaq(index)}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600">Still need help?</p>
          <Link
            to="/contact-us"
            className="mt-3 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0a54ff] text-white font-semibold shadow-lg shadow-blue-500/20 hover:bg-blue-800 hover:-translate-y-0.5 transition-all duration-300"
          >
            Go to Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SupportPage;
