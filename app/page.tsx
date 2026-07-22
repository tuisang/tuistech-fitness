import Link from "next/link";
import Ticker from "@/components/Ticker";
import { SectionLabel, PrimaryButton, SecondaryButton } from "@/components/ui";
import { programs, videos, ebooks, testimonials } from "@/lib/data";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="grain relative overflow-hidden border-b-2 border-ink bg-ink text-paper">
        <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <SectionLabel>Strength · Weight loss · Family fitness</SectionLabel>
            <h1 className="text-display mt-6 text-6xl md:text-8xl lg:text-[7.5rem]">
              Train with
              <br />
              <span className="text-green">intent.</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-paper/70 md:text-lg">
              Coached programs for men, women, teens and kids — built in
              Nairobi, delivered on video, and backed by 1:1 consulting when
              you need a plan that actually fits your life.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <PrimaryButton href="/consulting">Book a consult</PrimaryButton>
              <SecondaryButton href="/programs" variant="dark">
                Explore programs
              </SecondaryButton>
            </div>
          </div>

          <div className="border-2 border-paper/20 p-6 md:p-8">
            <span className="text-mono-label text-xs text-green">
              Today&apos;s log
            </span>
            <dl className="mt-5 space-y-4">
              <div className="flex items-baseline justify-between border-b border-paper/10 pb-3">
                <dt className="text-sm text-paper/60">Sessions this week</dt>
                <dd className="text-display text-3xl">214</dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-paper/10 pb-3">
                <dt className="text-sm text-paper/60">Avg. session length</dt>
                <dd className="text-display text-3xl">42m</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-sm text-paper/60">Programs live</dt>
                <dd className="text-display text-3xl">05</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <Ticker />

      {/* PROGRAMS */}
      <section className="border-b border-steel-line py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>The programs</SectionLabel>
              <h2 className="text-display mt-4 text-4xl md:text-6xl">
                Five sets. Every body.
              </h2>
            </div>
            <SecondaryButton href="/programs">View all programs</SecondaryButton>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <Link
                key={p.slug}
                href={`/programs#${p.slug}`}
                className="group flex flex-col justify-between border-2 border-ink p-7 transition-colors hover:bg-ink hover:text-paper"
              >
                <div>
                  <span className="text-mono-label text-xs text-green">
                    {p.set}
                  </span>
                  <h3 className="text-display mt-3 text-2xl leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60 group-hover:text-paper/70">
                    {p.summary}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-steel-line pt-4 text-xs group-hover:border-paper/20">
                  <span className="text-mono-label text-ink/50 group-hover:text-paper/50">
                    {p.audience}
                  </span>
                  <span className="text-mono-label text-ink/50 group-hover:text-paper/50">
                    {p.duration}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO LIBRARY PREVIEW */}
      <section className="border-b-2 border-ink bg-paper-dim py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>Follow-along training</SectionLabel>
              <h2 className="text-display mt-4 text-4xl md:text-6xl">
                Daily exercise, on video.
              </h2>
            </div>
            <SecondaryButton href="/videos">Watch the library</SecondaryButton>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {videos.slice(0, 3).map((v) => (
              <div key={v.slug} className="group border border-steel-line bg-paper">
                <div className="relative flex aspect-video items-center justify-center border-b border-steel-line bg-ink">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-paper/40 text-paper transition-colors group-hover:border-green group-hover:text-green">
                    ▶
                  </div>
                  <span className="text-mono-label absolute bottom-3 right-3 text-xs text-paper/70">
                    {v.length}
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-mono-label text-xs text-green">
                    {v.category}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink/60">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EBOOKS */}
      <section className="border-b border-steel-line py-24">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionLabel>Guides & ebooks</SectionLabel>
            <h2 className="text-display mt-4 text-4xl md:text-6xl">
              Take the plan
              <br />
              home.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/60">
              Downloadable training and nutrition guides, sold on Gumroad.
              Pay once, keep it for good, and follow the program on your own
              schedule.
            </p>
            <div className="mt-8">
              <PrimaryButton href="/shop">Browse ebooks</PrimaryButton>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {ebooks.slice(0, 4).map((e) => (
              <div
                key={e.slug}
                className="flex flex-col justify-between border-2 border-ink p-5"
              >
                <div>
                  <span className="text-mono-label text-xs text-steel">
                    {e.format}
                  </span>
                  <h3 className="text-display mt-2 text-xl leading-tight">
                    {e.title}
                  </h3>
                </div>
                <span className="text-mono-label mt-6 text-sm text-green">
                  {e.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTING CTA */}
      <section className="grain border-b-2 border-ink bg-forest py-24 text-paper">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <SectionLabel>1:1 consulting</SectionLabel>
            <h2 className="text-display mt-4 text-4xl md:text-6xl">
              A plan built around you, not a template.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/70">
              Book a consult to build a program around your goals, schedule,
              injury history and equipment access — for yourself, your team,
              or your child.
            </p>
          </div>
          <PrimaryButton href="/consulting">Book a session</PrimaryButton>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="container-x">
          <SectionLabel>From the log</SectionLabel>
          <h2 className="text-display mt-4 text-4xl md:text-6xl">
            Results, in their words.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="border-t-2 border-green pt-6">
                <p className="text-lg leading-relaxed text-ink/80">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-mono-label mt-6 text-xs text-steel">
                  {t.name} — {t.program}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
