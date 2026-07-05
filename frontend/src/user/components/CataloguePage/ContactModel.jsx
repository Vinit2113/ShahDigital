import { AnimatePresence, motion } from "framer-motion";

const ContactModal = ({ selectedProduct, setSelectedProduct }) => {
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

          <form className="mt-5 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-950"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-950"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-950"
            />

            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-950"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
              >
                Close
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-950 px-5 py-2 text-sm text-white hover:bg-blue-800"
              >
                Send Enquiry
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactModal;
