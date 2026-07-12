"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Incorrect password.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-paper px-6 py-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border-2 border-ink p-8"
      >
        <span className="text-mono-label text-xs text-green">Admin</span>
        <h1 className="text-display mt-3 text-3xl">Sign in</h1>
        <p className="mt-3 text-sm text-ink/60">
          Enter the admin password to view booking and contact requests.
        </p>

        <label className="mt-6 flex flex-col gap-2 text-sm">
          <span className="text-mono-label text-xs text-steel">Password</span>
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-steel-line bg-paper px-4 py-3 outline-none focus:border-green"
          />
        </label>

        {error && (
          <p className="mt-4 text-sm text-green-dim" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="text-mono-label mt-6 w-full border-2 border-ink bg-ink px-6 py-3.5 text-xs text-paper transition-colors hover:border-green hover:bg-green disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
