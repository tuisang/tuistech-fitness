import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, program, preferredDate, preferredTime, notes } = body;

    if (
      typeof name !== "string" ||
      typeof phone !== "string" ||
      typeof program !== "string" ||
      !name.trim() ||
      !phone.trim() ||
      !program.trim()
    ) {
      return NextResponse.json(
        { error: "Name, phone, and program are required." },
        { status: 400 }
      );
    }

    const booking = await prisma.bookingRequest.create({
      data: {
        name: name.trim().slice(0, 200),
        phone: phone.trim().slice(0, 50),
        program: program.trim().slice(0, 200),
        preferredDate:
          typeof preferredDate === "string" && preferredDate
            ? preferredDate.slice(0, 50)
            : null,
        preferredTime:
          typeof preferredTime === "string" && preferredTime
            ? preferredTime.slice(0, 50)
            : null,
        notes:
          typeof notes === "string" && notes ? notes.slice(0, 2000) : null,
      },
    });

    return NextResponse.json({ ok: true, id: booking.id });
  } catch (error) {
    console.error("Booking creation failed:", error);
    return NextResponse.json(
      { error: "Something went wrong saving your request." },
      { status: 500 }
    );
  }
}
