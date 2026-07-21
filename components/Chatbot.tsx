"use client";

import { useState, useRef, useEffect, FormEvent } from "react";

type Message = {
  role: "user" | "model";
  text: string;
};

const GREETING: Message = {
  role: "model",
  text: "Hey! I'm Coach Tui. Ask me about our programs, ebooks, pricing, or how to book a session.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    const userMessage: Message = { role: "user", text: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setErrorMessage("");
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setIsStreaming(false);
        return;
      }

      setMessages((prev) => [...prev, { role: "model", text: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = { ...last, text: last.text + chunk };
          return updated;
        });
      }
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button onClick={() => setOpen(!open)} aria-label={open ? "Close chat" : "Open chat with Coach Tui"} className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-ink text-paper shadow-lg transition-colors hover:border-green hover:bg-green sm:bottom-6 sm:right-6">
        {open ? (
          <span className="text-xl">&times;</span>
        ) : (
          <span className="text-mono-label text-[10px] leading-tight">
            Ask
            <br />
            Tui
          </span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[70vh] max-h-[520px] w-[calc(100vw-2.5rem)] max-w-sm flex-col border-2 border-ink bg-paper shadow-2xl sm:right-6">
          <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-3 text-paper">
            <div>
              <span className="text-mono-label text-xs text-green">Coach Tui</span>
              <p className="text-xs text-paper/60">Usually replies instantly</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded px-3 py-2 text-sm leading-relaxed ${m.role === "user" ? "ml-auto border-2 border-ink bg-ink text-paper" : "border border-steel-line bg-paper-dim text-ink"}`}>
                {m.text || (isStreaming && i === messages.length - 1 ? "..." : "")}
              </div>
            ))}
            {errorMessage && (
              <div className="border border-steel-line bg-paper-dim px-3 py-2 text-sm text-green-dim">
                {errorMessage}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-steel-line p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about programs, pricing..." disabled={isStreaming} className="flex-1 border border-steel-line bg-paper px-3 py-2 text-sm outline-none focus:border-green disabled:opacity-50" />
            <button type="submit" disabled={isStreaming || !input.trim()} className="text-mono-label border-2 border-ink bg-ink px-3 py-2 text-xs text-paper transition-colors hover:border-green hover:bg-green disabled:opacity-50">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}