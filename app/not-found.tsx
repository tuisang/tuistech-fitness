import { SectionLabel, PrimaryButton, SecondaryButton } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Tuistech Fitness & Wellness",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="grain flex min-h-[70vh] items-center border-b-2 border-ink bg-ink text-paper">
      <div className="container-x py-20">
        <SectionLabel>404</SectionLabel>
        <h1 className="text-display mt-5 text-6xl md:text-8xl">
          This page skipped
          <br />
          <span className="text-green">leg day.</span>
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/70 md:text-lg">
          We couldn't find the page you were looking for - it may have
          moved, or the link might be off. Let's get you back on track.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <PrimaryButton href="/">Back to home</PrimaryButton>
          <SecondaryButton href="/contact" variant="dark">
            Contact us
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
}