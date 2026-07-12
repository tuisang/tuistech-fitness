"use client";

import { useState, FormEvent } from "react";
import { programs } from "@/lib/data";
import { waLink, siteConfig } from "@/lib/config";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState(programs[0].title);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, program, preferredDate, preferredTime, notes }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("done");
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  function sendViaWhatsAppInstead() {
    const message = [
      `New booking request — Tuistech Fitness`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Program: ${program}`,
      preferredDate ? `Preferred date: ${preferredDate}` : null,
      preferredTime ? `Preferred time: ${preferredTime}` : null,
      notes ? `Notes: ${notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  }

  if (status === "done") {
    return (
      <div className="border-2 border-ink p-8">
        <span className="text-mono-label text-xs text-green">Request received</span>
        <h3 className="text-display mt-3 text-2xl">We&apos;ll confirm shortly.</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/60">
          Your booking details have been saved and we&apos;ll reach out to
          confirm a time. Want a faster reply? Message us directly on{" "}
          <button
            onClick={sendViaWhatsAppInstead}
            className="text-green-dim underline underline-offset-2"
          >
            WhatsApp
          </button>{" "}
          or email{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-green-dim underline underline-offset-2">
            {siteConfig.email}
          </a>
          .
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setName("");
            setPhone("");
            setPreferredDate("");
            setPreferredTime("");
            setNotes("");
          }}
          className="text-mono-label mt-6 border-2 border-ink px-5 py-2.5 text-xs hover:border-green hover:text-green"
        >
          Book another session
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-2 border-ink p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-mono-label text-xs text-steel">Full name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-steel-line bg-paper px-4 py-3 outline-none focus:border-green"
            placeholder="Jane Wanjiru"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="text-mono-label text-xs text-steel">
            Phone (WhatsApp)
          </span>
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-steel-line bg-paper px-4 py-3 outline-none focus:border-green"
            placeholder="07XX XXX XXX"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm sm:col-span-2">
          <span className="text-mono-label text-xs text-steel">
            Program of interest
          </span>
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="border border-steel-line bg-paper px-4 py-3 outline-none focus:border-green"
          >
            {programs.map((p) => (
              <option key={p.slug} value={p.title}>
                {p.title}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet — free fit call</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="text-mono-label text-xs text-steel">
            Preferred date
          </span>
          <input
            type="date"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            className="border border-steel-line bg-paper px-4 py-3 outline-none focus:border-green"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="text-mono-label text-xs text-steel">
            Preferred time
          </span>
          <input
            type="time"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            className="border border-steel-line bg-paper px-4 py-3 outline-none focus:border-green"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm sm:col-span-2">
          <span className="text-mono-label text-xs text-steel">
            Anything we should know?
          </span>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border border-steel-line bg-paper px-4 py-3 outline-none focus:border-green"
            placeholder="Injury history, goals, equipment access, child's age..."
          />
        </label>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-green-dim" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="text-mono-label border-2 border-ink bg-ink px-6 py-4 text-xs text-paper transition-colors hover:border-green hover:bg-green disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Send booking request"}
        </button>
        <span className="text-mono-label text-[11px] text-steel">
          Saved directly — no WhatsApp required
        </span>
      </div>
    </form>
  );
}
