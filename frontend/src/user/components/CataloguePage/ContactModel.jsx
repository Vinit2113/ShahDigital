import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  X,
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Loader2,
} from "lucide-react";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const fieldClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 py-2.5 text-sm outline-none transition-colors focus:border-[#0a54ff] focus:bg-white focus:ring-2 focus:ring-[#0a54ff]/15";

const ContactModal = ({ selectedProduct, setSelectedProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${baseURL}contact-form/submit`, {
        ...formData,
        ...(selectedProduct?.product_id
          ? { productId: selectedProduct.product_id }
          : {}),
      });

      toast(res.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      setSelectedProduct(null);
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedProduct) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={() => setSelectedProduct(null)}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <button
            type="button"
            onClick={() => setSelectedProduct(null)}
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a54ff]/10">
            <Send size={20} className="text-[#0a54ff]" />
          </div>

          <h3 className="mt-4 text-xl font-semibold text-gray-900">
            {selectedProduct?.name
              ? `Enquire about ${selectedProduct.name}`
              : "Get in Touch"}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Fill in your details and we'll get back to you shortly.
          </p>

          <form className="mt-6 space-y-3.5" onSubmit={handleSubmit}>
            <div className="relative">
              <User
                size={17}
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

            <div className="relative">
              <Mail
                size={17}
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
              <Phone
                size={17}
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

            <div className="relative">
              <MessageSquare
                size={17}
                className="pointer-events-none absolute left-3.5 top-3.5 text-gray-400"
              />
              <textarea
                rows={4}
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className={`${fieldClass} resize-none py-3`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a54ff] py-3 text-sm font-medium text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Enquiry"
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactModal;
