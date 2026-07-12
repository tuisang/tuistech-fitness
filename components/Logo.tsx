import Image from "next/image";

export default function Logo({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const textColor = variant === "light" ? "text-ink" : "text-paper";

  return (
    <span className="flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper p-1.5 ring-1 ring-steel-line">
        <Image
          src="/images/tuistech-badge.png"
          alt="Tuistech Fitness & Wellness"
          width={44}
          height={50}
          className="h-full w-auto object-contain"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`text-display text-xl ${textColor}`}>
          TUISTECH<span className="text-green">.</span>
        </span>
        <span className="text-mono-label text-[10px] text-green">
          Fitness &amp; Wellness
        </span>
      </span>
    </span>
  );
}
