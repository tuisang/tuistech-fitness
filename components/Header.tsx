"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/Logo";

const navLinks = [
  { href: "/programs", label: "Programs" },
  { href: "/videos", label: "Videos" },
  { href: "/shop", label: "Shop" },
  { href: "/consulting", label: "Consulting" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-steel-line/70 bg-paper/90 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo variant="light" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-mono-label text-xs text-ink/70 transition-colors hover:text-green"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/consulting"
          className="hidden rounded-none border-2 border-ink bg-ink px-5 py-2.5 text-mono-label text-xs text-paper transition-colors hover:border-green hover:bg-green lg:block"
        >
          Book a session
        </Link>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`h-0.5 w-6 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-steel-line bg-paper lg:hidden">
          <nav className="container-x flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-mono-label border-b border-steel-line/60 py-3.5 text-xs text-ink/80"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/consulting"
              onClick={() => setOpen(false)}
              className="text-mono-label mt-4 border-2 border-ink bg-ink px-5 py-3 text-center text-xs text-paper"
            >
              Book a session
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
