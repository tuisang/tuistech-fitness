import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name: name.trim().slice(0, 200),
        email: email.trim().slice(0, 200),
        message: message.trim().slice(0, 4000),
      },
    });

    return NextResponse.json({ ok: true, id: contact.id });
  } catch (error) {
    console.error("Contact message creation failed:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your message." },
      { status: 500 }
    );
  }
}
