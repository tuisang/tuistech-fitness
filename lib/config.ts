// TODO: add real Instagram/TikTok/YouTube handles here once you have them.
export const siteConfig = {
  whatsappNumber: "254726461196", // digits only, no +
  email: "fitness@tuistech.co.ke",
  phone: "+254 726 461 196",
  instagram: "https://instagram.com/tuistechfitness",
  tiktok: "https://tiktok.com/@tuistechfitness",
  youtube: "https://youtube.com/@tuistechfitness",
  facebook: "https://facebook.com/tuistechfitness",
  x: "https://x.com/tuistechfitness",
  bookingUrl: "", // e.g. a Calendly / cal.com link
};

export function waLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}
