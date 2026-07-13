import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_BACKEND_URL;

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
      // USER DETAIL MODEL
      setLoading(true);
      const res = await axios.post(`${baseURL}contact-form/submit`, {
        ...formData,
        productId: selectedProduct.product_id,
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
      console.log(error);
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
          className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h3 className="text-xl font-semibold text-gray-900">
            Enquire about {selectedProduct.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Fill in your details and we'll get back to you shortly.
          </p>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-950"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-950"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-950"
            />

            <textarea
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-950"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                Close
              </button>

              <button
                type="submit"
                // onClick={() => setSelectedProduct(null)}
                disabled={loading}
                className="rounded-lg bg-blue-950 px-5 py-2 text-sm text-white hover:bg-blue-800 cursor-pointer"
              >
                {loading ? "Sending..." : "Send Enquiry"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactModal;
