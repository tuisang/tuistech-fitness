import { PageHero, SectionLabel, PrimaryButton } from "@/components/ui";
import { ebooks, equipment } from "@/lib/data";
import { waLink } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Tuistech Fitness",
  description: "Training ebooks on Gumroad and home fitness equipment.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Guides & gear."
        description="Downloadable training guides sold through Gumroad, plus a short list of equipment we actually recommend for home training."
      />

      {/* EBOOKS */}
      <section id="ebooks" className="scroll-mt-24 border-b border-steel-line py-20 md:py-24">
        <div className="container-x">
          <SectionLabel>Ebooks · delivered via Gumroad</SectionLabel>
          <h2 className="text-display mt-4 text-4xl md:text-6xl">
            Programs you keep.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {ebooks.map((e) => (
              <div
                key={e.slug}
                className="flex flex-col justify-between border-2 border-ink p-7"
              >
                <div>
                  <span className="text-mono-label text-xs text-steel">
                    {e.format}
                  </span>
                  <h3 className="text-display mt-3 text-2xl leading-tight">
                    {e.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
                    {e.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-steel-line pt-5">
                  <span className="text-mono-label text-sm text-green">
                    {e.price}
                  </span>
                  <a
                    href={e.gumroadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mono-label border-2 border-ink px-4 py-2.5 text-xs transition-colors hover:border-green hover:text-green"
                  >
                    Buy on Gumroad ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section id="equipment" className="scroll-mt-24 bg-paper-dim py-20 md:py-24">
        <div className="container-x">
          <SectionLabel>Equipment · order via WhatsApp</SectionLabel>
          <h2 className="text-display mt-4 text-4xl md:text-6xl">
            Kit for home training.
          </h2>
          <p className="mt-4 max-w-lg text-sm text-ink/60">
            Message us the item and we&apos;ll confirm price, delivery within
            Nairobi, and M-Pesa payment details directly.
          </p>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((item) => (
              <div
                key={item.slug}
                className="flex flex-col justify-between border border-steel-line bg-paper p-6"
              >
                <div>
                  <span className="text-mono-label text-xs text-green">
                    {item.category}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink/60">{item.description}</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-steel-line pt-4">
                  <span className="text-mono-label text-sm">{item.price}</span>
                  <a
                    href={waLink(`Hi! I'd like to order: ${item.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mono-label text-xs text-green hover:underline"
                  >
                    Order ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t-2 border-ink bg-ink py-20 text-paper">
        <div className="container-x flex flex-wrap items-center justify-between gap-6">
          <div>
            <SectionLabel>Buying for a group or a team?</SectionLabel>
            <h2 className="text-display mt-4 max-w-xl text-3xl md:text-4xl">
              Ask about bulk equipment pricing.
            </h2>
          </div>
          <PrimaryButton href="/contact">Get in touch</PrimaryButton>
        </div>
      </section>
    </>
  );
}
