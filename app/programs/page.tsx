import { PageHero, PrimaryButton, SectionLabel } from "@/components/ui";
import { programs } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs | Tuistech Fitness",
  description:
    "Strength, weight-loss, youth and children's fitness programs coached in Nairobi.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Five sets, one standard."
        description="Every program is written around a real training age and a real schedule — from first-time squatters to teens prepping for trials to Saturday sessions with the kids."
      />

      <section className="py-20 md:py-28">
        <div className="container-x space-y-20">
          {programs.map((p, i) => (
            <div
              key={p.slug}
              id={p.slug}
              className="grid scroll-mt-24 gap-10 border-b border-steel-line pb-20 last:border-b-0 last:pb-0 lg:grid-cols-[0.4fr_1fr]"
            >
              <div>
                <span className="text-mono-label text-xs text-green">
                  {p.set}
                </span>
                <h2 className="text-display mt-3 text-4xl md:text-5xl">
                  {p.title}
                </h2>
                <p className="text-mono-label mt-4 text-xs text-steel">
                  {p.audience} · {p.duration}
                </p>
              </div>

              <div>
                <p className="max-w-xl text-lg leading-relaxed text-ink/70">
                  {p.summary}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {p.focus.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 border border-steel-line px-4 py-3 text-sm"
                    >
                      <span className="text-green">◆</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-4">
                  <PrimaryButton href="/consulting">
                    Book this program
                  </PrimaryButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t-2 border-ink bg-ink py-20 text-paper">
        <div className="container-x">
          <SectionLabel>Not sure which set fits?</SectionLabel>
          <h2 className="text-display mt-4 max-w-2xl text-4xl md:text-5xl">
            Book a free 15-minute fit call before you commit.
          </h2>
          <div className="mt-8">
            <PrimaryButton href="/consulting">Book the call</PrimaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
