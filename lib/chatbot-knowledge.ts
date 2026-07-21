import { programs, ebooks, equipment } from "@/lib/data";
import { siteConfig } from "@/lib/config";

// Simple keyword-based retrieval (no vector DB/embeddings needed for a
// site this size) - matching the pattern used across other Tuistech
// projects. Each chunk has a set of keywords; the chatbot API scores
// chunks by how many keywords appear in the user's message and includes
// the top matches as context for Gemini.

export type KnowledgeChunk = {
  keywords: string[];
  content: string;
};

function buildKnowledgeBase(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  // Programs
  for (const p of programs) {
    chunks.push({
      keywords: [
        p.title.toLowerCase(),
        p.audience.toLowerCase(),
        "program",
        "programs",
        "training",
        ...p.focus.map((f) => f.toLowerCase()),
      ],
      content: `Program: ${p.title} (for ${p.audience}). ${p.summary} Focus areas: ${p.focus.join(", ")}. Duration: ${p.duration}.`,
    });
  }

  // Ebooks
  for (const e of ebooks) {
    chunks.push({
      keywords: [
        e.title.toLowerCase(),
        "ebook",
        "ebooks",
        "book",
        "guide",
        "download",
        "gumroad",
        e.priceKes ? "mpesa" : "",
      ].filter(Boolean),
      content: `Ebook: "${e.title}" - ${e.price}${e.priceKes ? ` (or KES ${e.priceKes.toLocaleString()} via M-Pesa)` : ""}. ${e.description} Available on Gumroad or via M-Pesa on the Shop page.`,
    });
  }

  // Equipment
  for (const item of equipment) {
    chunks.push({
      keywords: [
        item.title.toLowerCase(),
        item.category.toLowerCase(),
        "equipment",
        "gear",
        "buy",
      ],
      content: `Equipment: ${item.title} - ${item.price}. ${item.description} Order via WhatsApp on the Shop page.`,
    });
  }

  // Booking / consulting
  chunks.push({
    keywords: [
      "book",
      "booking",
      "consult",
      "consulting",
      "session",
      "appointment",
      "price",
      "cost",
      "fee",
    ],
    content:
      "Consulting sessions: Fit Call (free, 15 min), Single Consult (KES 3,500, 60 min), Monthly Coaching (KES 12,000/month, ongoing). Book at the Consulting page - it opens a WhatsApp message with the details, and we confirm within a day.",
  });

  // Contact
  chunks.push({
    keywords: [
      "contact",
      "phone",
      "whatsapp",
      "email",
      "reach",
      "call",
      "location",
      "where",
      "nairobi",
    ],
    content: `Contact: WhatsApp/phone ${siteConfig.phone}, email ${siteConfig.email}. Based in Nairobi, Kenya.`,
  });

  // Videos
  chunks.push({
    keywords: ["video", "videos", "workout", "exercise", "watch", "follow"],
    content:
      "The Video Library page has follow-along training videos filed by category: Strength, Weight loss, Youth, Children, and Recovery.",
  });

  return chunks;
}

export function getRelevantContext(userMessage: string, maxChunks = 4): string {
  const knowledgeBase = buildKnowledgeBase();
  const messageLower = userMessage.toLowerCase();

  const scored = knowledgeBase.map((chunk) => {
    const score = chunk.keywords.reduce(
      (count, kw) => count + (messageLower.includes(kw) ? 1 : 0),
      0
    );
    return { chunk, score };
  });

  const relevant = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxChunks)
    .map((s) => s.chunk.content);

  // If nothing matched, fall back to a general overview so the bot isn't
  // completely context-free on vague questions.
  if (relevant.length === 0) {
    return [
      "Tuistech Fitness & Wellness is a Nairobi-based coaching business covering strength training, weight loss, youth athletics, and children's fitness programs.",
      `Contact: WhatsApp/phone ${siteConfig.phone}, email ${siteConfig.email}.`,
    ].join("\n");
  }

  return relevant.join("\n");
}