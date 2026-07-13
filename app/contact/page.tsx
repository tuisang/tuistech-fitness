import { PageHero, SectionLabel } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import { siteConfig, waLink } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Tuistech Fitness",
  description: "Get in touch with Tuistech Fitness in Nairobi.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        description="Questions about programs, equipment, or partnering with a school or team — reach out and we'll respond within a day."
      />

      <section className="py-20 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Direct lines</SectionLabel>
            <h2 className="text-display mt-4 text-3xl">Reach us directly</h2>

            <div className="mt-8 space-y-6">
              <div>
                <span className="text-mono-label text-xs text-steel">
                  WhatsApp
                </span>
                <a
                  href={waLink("Hi! I have a question about Tuistech Fitness.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-lg font-semibold hover:text-green"
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <span className="text-mono-label text-xs text-steel">
                  Email
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-1 block text-lg font-semibold hover:text-green"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <span className="text-mono-label text-xs text-steel">
                  Based in
                </span>
                <p className="mt-1 text-lg font-semibold">Nairobi, Kenya</p>
              </div>
              <div className="flex gap-5 pt-2">
                <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="text-mono-label text-xs text-ink/60 hover:text-green">
                  Instagram
                </a>
                <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer" className="text-mono-label text-xs text-ink/60 hover:text-green">
                  TikTok
                </a>
                <a href={siteConfig.youtube} target="_blank" rel="noopener noreferrer" className="text-mono-label text-xs text-ink/60 hover:text-green">
                  YouTube
                </a>
                <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="text-mono-label text-xs text-ink/60 hover:text-green">
                  Facebook
                </a>
                <a href={siteConfig.x} target="_blank" rel="noopener noreferrer" className="text-mono-label text-xs text-ink/60 hover:text-green">
                  X
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
