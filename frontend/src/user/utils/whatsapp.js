const WHATSAPP_NUMBER = "919876543210";

export const getWhatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
