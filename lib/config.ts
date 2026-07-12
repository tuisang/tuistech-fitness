// TODO: replace placeholders with real contact details before launch.
export const siteConfig = {
  whatsappNumber: "254700000000", // digits only, no +
  email: "fitness@tuistech.co.ke",
  phone: "+254 700 000 000",
  instagram: "https://instagram.com/tuistechfitness",
  tiktok: "https://tiktok.com/@tuistechfitness",
  youtube: "https://youtube.com/@tuistechfitness",
  bookingUrl: "", // e.g. a Calendly / cal.com link
};

export function waLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}
