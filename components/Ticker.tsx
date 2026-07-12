import { stats } from "@/lib/data";

export default function Ticker() {
  const row = [...stats, ...stats];

  return (
    <div className="overflow-hidden border-y-2 border-ink bg-forest py-3">
      <div className="flex w-max animate-ticker">
        {row.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-3 whitespace-nowrap px-8"
          >
            <span className="text-mono-label text-lg text-sage">{s.value}</span>
            <span className="text-mono-label text-xs text-paper/70">
              {s.label}
            </span>
            <span className="text-green">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
