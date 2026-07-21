// Streams responses from Google's Gemini API using the raw REST endpoint
// (no SDK dependency needed). Uses gemini-3.5-flash - gemini-2.0-flash and
// earlier models were retired in 2026, so don't downgrade this without
// checking https://ai.google.dev/gemini-api/docs/changelog first.

const MODEL = "gemini-3.5-flash";

export const COACH_TUI_SYSTEM_PROMPT = `You are Coach Tui, the friendly virtual assistant for Tuistech Fitness & Wellness, a Nairobi-based fitness coaching business. Your tone is warm, encouraging, and knowledgeable - like a real coach, not a generic chatbot.

Rules:
- Answer using ONLY the context provided below each user message. If the context doesn't cover something, say you're not sure and suggest they message the team directly on WhatsApp or check the relevant page on the site.
- Keep answers concise - 2-4 sentences for most questions, unless the person asks for detail.
- Never invent prices, program details, or contact information that isn't in the provided context.
- You cannot book sessions, process payments, or access personal account data - direct people to the Consulting page (booking) or Shop page (ebooks/equipment/payment) for those actions.
- If someone describes a medical concern or injury, encourage them to consult a doctor before starting any program - don't give medical advice yourself.
- Stay focused on Tuistech Fitness topics. For unrelated questions, politely redirect to how you can help with fitness programs, bookings, or products.`;

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

export async function streamGeminiResponse({
  messages,
  context,
}: {
  messages: ChatMessage[];
  context: string;
}): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  // Attach the retrieved context to the latest user message so Gemini has
  // grounded, current site information without needing a vector DB.
  const contents = messages.map((m, i) => {
    const isLastUserMessage = i === messages.length - 1 && m.role === "user";
    const text = isLastUserMessage
      ? `${m.text}\n\n[Context from the Tuistech Fitness website - use this to answer, don't mention "context" to the user]:\n${context}`
      : m.text;
    return {
      role: m.role,
      parts: [{ text }],
    };
  });

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse&key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: COACH_TUI_SYSTEM_PROMPT }],
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      }),
    }
  );

  if (!res.ok || !res.body) {
    const errorText = await res.text().catch(() => "");
    throw new Error(`Gemini API error (${res.status}): ${errorText}`);
  }

  // Re-parse Gemini's SSE stream and re-emit just the plain text deltas,
  // so the frontend doesn't need to know anything about Gemini's format.
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.slice(6).trim();
            if (!jsonStr) continue;

            try {
              const parsed = JSON.parse(jsonStr);
              const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                controller.enqueue(encoder.encode(text));
              }
            } catch {
              // Skip malformed SSE chunks rather than breaking the stream
            }
          }
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}

export function isGeminiConfigured() {
  return Boolean(process.env.GEMINI_API_KEY);
}