import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppLink } from "../utils/whatsapp";

export default function WhatsAppButton({ product }) {
  const handleWhatsApp = () => {
    let message;

    if (product) {
      message = `
Hello,

I am writing to inquire about your product.

Product Details:
Name: ${product.product_display_name}
Description: ${product.full_description}

Kindly share detailed specifications, pricing, and availability at your earliest convenience.

Looking forward to your response.
`;
    } else {
      message = `
Hello,

I would like to know more about your products and services.

Kindly share the details.

Thank you.
`;
    }

    window.open(getWhatsAppLink(message), "_blank");
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center animate-float hover:scale-110 transition"
    >
      <FaWhatsapp className="text-3xl sm:text-4xl" />
    </button>
  );
}
