import Link from "next/link";
import { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-green" />
      <span className="text-mono-label text-xs text-green">{children}</span>
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const cls =
    "text-mono-label inline-block border-2 border-ink bg-ink px-6 py-3.5 text-xs text-paper transition-colors hover:border-green hover:bg-green text-center";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
  variant = "light",
}: {
  href: string;
  children: ReactNode;
  variant?: "light" | "dark";
}) {
  const cls =
    variant === "dark"
      ? "text-mono-label inline-block border-2 border-paper/40 px-6 py-3.5 text-xs text-paper transition-colors hover:border-green hover:text-green text-center"
      : "text-mono-label inline-block border-2 border-ink px-6 py-3.5 text-xs text-ink transition-colors hover:border-green hover:text-green text-center";
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="grain border-b-2 border-ink bg-ink py-20 text-paper md:py-28">
      <div className="container-x">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="text-display mt-5 text-5xl md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/70 md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
