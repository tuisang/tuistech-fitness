// TODO: add real Instagram/TikTok/YouTube handles here once you have them.
export const siteConfig = {
  whatsappNumber: "254726461196", // digits only, no +
  email: "fitness@tuistech.co.ke",
  phone: "+254 726 461 196",
  instagram: "",
  tiktok: "",
  youtube: "",
  bookingUrl: "", // e.g. a Calendly / cal.com link
};

export function waLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}
