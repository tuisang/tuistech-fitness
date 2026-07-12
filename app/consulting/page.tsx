import { PageHero, SectionLabel } from "@/components/ui";
import BookingForm from "@/components/BookingForm";
import type { Metadata } from "next";

const tiers = [
  {
    name: "Fit Call",
    price: "Free",
    length: "15 min",
    description: "A short call to point you at the right program before you commit to anything.",
  },
  {
    name: "Single Consult",
    price: "KES 3,500",
    length: "60 min",
    description: "One deep-dive session: goals, movement screen, and a written 4-week plan.",
  },
  {
    name: "Monthly Coaching",
    price: "KES 12,000 / mo",
    length: "Ongoing",
    description: "Weekly check-ins, program updates, and direct WhatsApp access between sessions.",
  },
];

export const metadata: Metadata = {
  title: "Consulting | Tuistech Fitness",
  description: "Book 1:1 fitness consulting and coaching sessions in Nairobi.",
};

export default function ConsultingPage() {
  return (
    <>
      <PageHero
        eyebrow="Consulting"
        title="Book time on the calendar."
        description="1:1 consulting for individuals, parents booking on behalf of a child, or teams looking for a group program. Tell us what you're working with and we'll build the plan around it."
      />

      <section className="border-b border-steel-line py-20 md:py-24">
        <div className="container-x">
          <SectionLabel>Session types</SectionLabel>
          <h2 className="text-display mt-4 text-4xl md:text-6xl">
            Pick a starting point.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <div key={t.name} className="border-2 border-ink p-7">
                <span className="text-mono-label text-xs text-steel">
                  {t.length}
                </span>
                <h3 className="text-display mt-3 text-2xl">{t.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {t.description}
                </p>
                <p className="text-mono-label mt-6 border-t border-steel-line pt-4 text-sm text-green">
                  {t.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-dim py-20 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Book now</SectionLabel>
            <h2 className="text-display mt-4 text-4xl">
              Tell us what you need.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink/60">
              Fill in the form and it opens a pre-filled WhatsApp message —
              send it and we&apos;ll confirm a slot within a day. Payment for
              paid sessions is by M-Pesa, confirmed after booking.
            </p>
          </div>
          <BookingForm />
        </div>
      </section>
    </>
  );
}
