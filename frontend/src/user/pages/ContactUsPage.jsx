import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaUser,
  FaCommentDots,
  FaPaperPlane,
} from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getWhatsAppLink } from "../utils/whatsapp";

gsap.registerPlugin(useGSAP);

const baseURL = import.meta.env.VITE_BACKEND_URL;

// Vite only exposes env vars prefixed with VITE_ to client-side code -
// import.meta.env.CONTACT_PHONE (no prefix) is always undefined in the
// browser, which is what crashed this page. Falls back to the same
// placeholder used in Footer.jsx if the env var isn't set - update both
// together with the real business info before launch.
const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE || "+91 98765 43210";
const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || "shahdigital18@gmail.com";
const CONTACT_ADDRESS = import.meta.env.VITE_CONTACT_ADDRESS;

const whatsappMessage = `Hello,

I'd like to get in touch with Shah Digital regarding your products and services.

Thank you.`;

const fieldClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 py-3 text-sm outline-none transition-colors focus:border-[#0a54ff] focus:bg-white focus:ring-2 focus:ring-[#0a54ff]/15";

const ContactInfoRow = ({ icon, label, children }) => (
  <div className="contact-info-row flex items-start gap-4 group">
    <div className="shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-lg shadow-sm group-hover:bg-[#0a54ff] group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30 group-hover:scale-110 group-hover:border-transparent transition-all duration-300">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-sm text-gray-500">{label}</p>
      {children}
    </div>
  </div>
);

const ContactUsPage = () => {
  const rootRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${baseURL}contact-form/submit`, formData);

      toast.success(res.data.message || "Your message has been sent");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again",
      );
    } finally {
      setLoading(false);
    }
  };

  useGSAP(
    () => {
      gsap
        .timeline()
        .from(".contact-badge", { y: -16, opacity: 0, duration: 0.5 })
        .from(".contact-title", { y: 24, opacity: 0, duration: 0.6 }, "-=0.25")
        .from(".contact-desc", { y: 16, opacity: 0, duration: 0.5 }, "-=0.35")
        .from(
          ".contact-info-card",
          { x: -30, opacity: 0, duration: 0.6 },
          "-=0.2",
        )
        .from(".contact-form-card", { x: 30, opacity: 0, duration: 0.6 }, "<")
        .from(
          ".contact-info-row",
          { y: 12, opacity: 0, duration: 0.4, stagger: 0.08 },
          "-=0.3",
        )
        .from(".contact-map", { y: 24, opacity: 0, duration: 0.6 }, "-=0.1");
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden px-4 sm:px-6 py-16 sm:py-20 bg-linear-to-br from-blue-50 via-white to-blue-100"
    >
      {/* Decorative blobs - same soft-glow language used across the site */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-20 w-96 h-96 rounded-full bg-blue-300/30 blur-3xl" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <span className="contact-badge inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase">
            Get In Touch
          </span>
          <h1 className="contact-title mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-950">
            Let's talk about your requirement
          </h1>
          <p className="contact-desc mt-3 text-gray-600 max-w-xl mx-auto">
            Have a requirement or a question? Send us a message or reach out
            directly - we're happy to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-6 sm:gap-8 items-start">
          {/* CONTACT INFO */}
          <div className="contact-info-card bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 space-y-7 h-fit">
            <ContactInfoRow icon={<FaPhone />} label="Call us">
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
                className="font-semibold text-blue-950 hover:text-[#0a54ff] transition-colors"
              >
                {CONTACT_PHONE}
              </a>
            </ContactInfoRow>

            <ContactInfoRow icon={<FaEnvelope />} label="Email us">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-blue-950 hover:text-[#0a54ff] break-all transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </ContactInfoRow>

            <ContactInfoRow icon={<FaMapMarkerAlt />} label="Visit us">
              <p className="font-semibold text-blue-950">{CONTACT_ADDRESS}</p>
            </ContactInfoRow>

            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-semibold shadow-lg shadow-green-500/20 hover:bg-[#1ebe5b] hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaWhatsapp size={20} />
              Chat on WhatsApp
            </a>
          </div>

          {/* CONTACT FORM */}
          <div className="contact-form-card bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-bold text-blue-950">
              Send us a message
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Fill in your details and we'll get back to you shortly.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <FaUser
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <FaEnvelope
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className={fieldClass}
                  />
                </div>

                <div className="relative">
                  <FaPhone
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="relative">
                <FaCommentDots
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-3.5 text-gray-400"
                />
                <textarea
                  rows={5}
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className={`${fieldClass} resize-none py-3`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a54ff] py-3.5 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:bg-blue-800 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
              >
                <FaPaperPlane size={14} />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* MAP - keyless embed (no Google Maps API key/billing needed).
            Driven by CONTACT_ADDRESS above, so updating that address also
            updates where the map is centered. */}
        <div className="contact-map mt-6 sm:mt-8">
          <div className="flex items-center gap-2 mb-4">
            <FaMapMarkerAlt className="text-blue-600" />
            <h2 className="text-lg sm:text-xl font-bold text-blue-950">
              Find Us
            </h2>
          </div>
          <div className="bg-white border border-blue-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
            <iframe
              title="Store location"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(CONTACT_ADDRESS)}&output=embed`}
              className="w-full h-64 sm:h-80"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
