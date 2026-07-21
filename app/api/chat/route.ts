import { NextResponse } from "next/server";
import { streamGeminiResponse, isGeminiConfigured } from "@/lib/gemini";
import { getRelevantContext } from "@/lib/chatbot-knowledge";

export async function POST(request: Request) {
  try {
    if (!isGeminiConfigured()) {
      return NextResponse.json(
        { error: "Chat isn't set up yet. Please reach out on WhatsApp instead." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    // Basic shape/length guards so a malformed or huge payload can't be
    // used to abuse the Gemini API through this endpoint.
    const cleanMessages: { role: "user" | "model"; text: string }[] = messages
      .slice(-20)
      .map((m: { role: string; text: string }) => ({
        role: m.role === "model" ? ("model" as const) : ("user" as const),
        text: String(m.text ?? "").slice(0, 2000),
      }));

    const lastUserMessage = [...cleanMessages].reverse().find((m) => m.role === "user");
    const context = getRelevantContext(lastUserMessage?.text ?? "");

    const stream = await streamGeminiResponse({ messages: cleanMessages, context });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat request failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or message us on WhatsApp." },
      { status: 500 }
    );
  }
}