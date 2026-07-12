"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
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

  if (status === "done") {
    return (
      <div className="border-2 border-ink p-8">
        <span className="text-mono-label text-xs text-green">Message sent</span>
        <h3 className="text-display mt-3 text-2xl">Thanks — we&apos;ll reply soon.</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/60">
          Your message has been received. We typically reply within a day.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setName("");
            setEmail("");
            setMessage("");
          }}
          className="text-mono-label mt-6 border-2 border-ink px-5 py-2.5 text-xs hover:border-green hover:text-green"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-2 border-ink p-6 md:p-8">
      <div className="grid gap-5">
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-mono-label text-xs text-steel">Name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-steel-line bg-paper px-4 py-3 outline-none focus:border-green"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-mono-label text-xs text-steel">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-steel-line bg-paper px-4 py-3 outline-none focus:border-green"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-mono-label text-xs text-steel">Message</span>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-steel-line bg-paper px-4 py-3 outline-none focus:border-green"
          />
        </label>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-green-dim" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="text-mono-label mt-7 w-full border-2 border-ink bg-ink px-6 py-4 text-xs text-paper transition-colors hover:border-green hover:bg-green disabled:opacity-50 sm:w-auto"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
