"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

type Status = "idle" | "form" | "sending" | "waiting" | "paid" | "failed" | "error";

export default function MpesaPayButton({
  ebookSlug,
  priceKes,
}: {
  ebookSlug: string;
  priceKes: number;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ebookSlug, phone, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("waiting");

      pollRef.current = setInterval(async () => {
        try {
          const statusRes = await fetch(
            `/api/mpesa/status/${data.checkoutRequestId}`
          );
          const statusData = await statusRes.json();

          if (statusData.status === "PAID") {
            if (pollRef.current) clearInterval(pollRef.current);
            setStatus("paid");
          } else if (
            statusData.status === "FAILED" ||
            statusData.status === "CANCELLED"
          ) {
            if (pollRef.current) clearInterval(pollRef.current);
            setStatus("failed");
          }
        } catch {
          // keep polling - a single failed check isn't fatal
        }
      }, 3000);

      // Stop polling after 2 minutes so the UI doesn't hang forever
      setTimeout(() => {
        if (pollRef.current) clearInterval(pollRef.current);
        setStatus((current) => (current === "waiting" ? "failed" : current));
      }, 120000);
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "idle") {
    return (
      <button
        onClick={() => setStatus("form")}
        className="text-mono-label border-2 border-green px-4 py-2.5 text-xs text-green-dim transition-colors hover:bg-green hover:text-paper"
      >
        Pay with M-Pesa (KES {priceKes.toLocaleString()})
      </button>
    );
  }

  if (status === "form") {
    return (
      <form onSubmit={handleSubmit} className="mt-3 space-y-2 border-t border-steel-line pt-3">
        <input
          required
          type="tel"
          placeholder="M-Pesa phone (07XX XXX XXX)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-steel-line bg-paper px-3 py-2 text-sm outline-none focus:border-green"
        />
        <input
          required
          type="email"
          placeholder="Email (for your download)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-steel-line bg-paper px-3 py-2 text-sm outline-none focus:border-green"
        />
        <button
          type="submit"
          className="text-mono-label w-full border-2 border-ink bg-ink px-4 py-2.5 text-xs text-paper transition-colors hover:border-green hover:bg-green"
        >
          Send payment request
        </button>
      </form>
    );
  }

  if (status === "sending" || status === "waiting") {
    return (
      <div className="mt-3 border-t border-steel-line pt-3 text-sm">
        <p className="text-green-dim">
          {status === "sending"
            ? "Sending payment request..."
            : "Check your phone and enter your M-Pesa PIN to complete payment."}
        </p>
      </div>
    );
  }

  if (status === "paid") {
    return (
      <div className="mt-3 border-t border-steel-line pt-3 text-sm">
        <p className="text-green-dim">
          Payment received! Check your email for the download.
        </p>
      </div>
    );
  }

  if (status === "failed" || status === "error") {
    return (
      <div className="mt-3 border-t border-steel-line pt-3 text-sm">
        <p className="text-green-dim">
          {status === "error"
            ? errorMessage
            : "Payment wasn't completed. You can try again."}
        </p>
        <button
          onClick={() => {
            setStatus("form");
            setErrorMessage("");
          }}
          className="text-mono-label mt-2 border-2 border-ink px-4 py-2 text-xs hover:border-green hover:text-green"
        >
          Try again
        </button>
      </div>
    );
  }

  return null;
}