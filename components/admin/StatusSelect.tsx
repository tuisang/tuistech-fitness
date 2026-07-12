"use client";

import { useTransition } from "react";

export default function StatusSelect<T extends string>({
  id,
  value,
  options,
  onUpdate,
}: {
  id: string;
  value: T;
  options: T[];
  onUpdate: (id: string, status: T) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={isPending}
      onChange={(e) =>
        startTransition(() => {
          onUpdate(id, e.target.value as T);
        })
      }
      className="text-mono-label border border-steel-line bg-paper px-2 py-1.5 text-[11px] outline-none focus:border-green disabled:opacity-50"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
