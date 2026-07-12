"use client";

import { useState } from "react";
import { videos } from "@/lib/data";

const categories = ["All", ...Array.from(new Set(videos.map((v) => v.category)))];

export default function VideoLibrary() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? videos : videos.filter((v) => v.category === active);

  return (
    <section className="py-20 md:py-24">
      <div className="container-x">
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`text-mono-label border-2 px-4 py-2 text-xs transition-colors ${
                active === c
                  ? "border-ink bg-ink text-paper"
                  : "border-steel-line text-ink/60 hover:border-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <div key={v.slug} className="group border border-steel-line bg-paper">
              <div className="relative flex aspect-video items-center justify-center border-b border-steel-line bg-ink">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-paper/40 text-paper transition-colors group-hover:border-green group-hover:text-green">
                  ▶
                </div>
                <span className="text-mono-label absolute bottom-3 right-3 text-xs text-paper/70">
                  {v.length}
                </span>
                <span className="text-mono-label absolute left-3 top-3 border border-paper/30 px-2 py-1 text-[10px] text-paper/80">
                  {v.level}
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

        {filtered.length === 0 && (
          <p className="mt-10 text-sm text-ink/50">
            No sessions in this category yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
