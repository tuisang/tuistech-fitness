import { PageHero, SectionLabel, PrimaryButton } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Tuistech Fitness",
  description: "The coaching philosophy and story behind Tuistech Fitness.",
};

const values = [
  {
    title: "Programming over hype",
    body: "Every plan is periodised — progressive overload and planned recovery, not a random circuit pulled from a video.",
  },
  {
    title: "Built for real life",
    body: "Sessions fit a Nairobi schedule, kitchen and budget. No imported meal kits, no equipment you can't access.",
  },
  {
    title: "Every age, every stage",
    body: "From a first-timer's squat to a teen's trial prep to a Saturday game with an 8-year-old — coached with the same care.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Coaching, not guesswork."
        description="Tuistech Fitness was built around one idea: a good program is written for the person doing it, not copied from a template."
      />

      <section className="border-b border-steel-line py-20 md:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <SectionLabel>The coach</SectionLabel>
            <h2 className="text-display mt-4 text-4xl">
              Years on the floor, not just behind a desk.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/70">
              Tuistech Fitness runs on hands-on coaching experience across
              strength training, weight management and youth athletic
              development — working with everyone from first-time gym-goers
              to teens preparing for school sport trials, and parents looking
              for a safe, structured way to get their kids moving.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              Every program on this site — the videos, the ebooks, the
              consulting sessions — comes out of the same coaching notebook
              used with in-person clients in Nairobi.
            </p>
          </div>

          <div className="border-2 border-ink p-8">
            <span className="text-mono-label text-xs text-green">
              Coaching focus
            </span>
            <ul className="mt-5 space-y-4">
              {[
                "Strength & hypertrophy programming",
                "Weight-loss coaching & habit change",
                "Youth athletic development",
                "Children's movement & coordination",
                "Injury-aware training design",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 border-b border-steel-line pb-4 text-sm last:border-b-0 last:pb-0">
                  <span className="text-green">◆</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-paper-dim py-20 md:py-24">
        <div className="container-x">
          <SectionLabel>How we work</SectionLabel>
          <h2 className="text-display mt-4 text-4xl md:text-5xl">
            Three things every program shares.
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="border-t-2 border-green pt-6">
                <h3 className="text-lg font-semibold">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t-2 border-ink bg-ink py-20 text-paper">
        <div className="container-x flex flex-wrap items-center justify-between gap-6">
          <div>
            <SectionLabel>Ready to start?</SectionLabel>
            <h2 className="text-display mt-4 text-3xl md:text-4xl">
              Book a free fit call.
            </h2>
          </div>
          <PrimaryButton href="/consulting">Book now</PrimaryButton>
        </div>
      </section>
    </>
  );
}
