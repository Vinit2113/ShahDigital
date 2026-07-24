const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export const getWhatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
