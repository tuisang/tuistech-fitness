import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initiateSTKPush, isMpesaConfigured } from "@/lib/mpesa";
import { ebooks } from "@/lib/data";

export async function POST(request: Request) {
  try {
    if (!isMpesaConfigured()) {
      return NextResponse.json(
        {
          error:
            "M-Pesa payments aren't set up yet. Please use the Gumroad option for now.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { ebookSlug, phone, email } = body;

    if (
      typeof ebookSlug !== "string" ||
      typeof phone !== "string" ||
      typeof email !== "string" ||
      !phone.trim() ||
      !email.trim()
    ) {
      return NextResponse.json(
        { error: "Phone and email are required." },
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

    const ebook = ebooks.find((e) => e.slug === ebookSlug);
    if (!ebook || !ebook.priceKes) {
      return NextResponse.json(
        { error: "This ebook isn't available for M-Pesa payment." },
        { status: 400 }
      );
    }

    const order = await prisma.ebookOrder.create({
      data: {
        ebookSlug: ebook.slug,
        ebookTitle: ebook.title,
        phone: phone.trim().slice(0, 20),
        email: email.trim().slice(0, 200),
        amountKes: ebook.priceKes,
        status: "PENDING",
      },
    });

    try {
      const { checkoutRequestId, merchantRequestId } = await initiateSTKPush({
        phone: phone.trim(),
        amount: ebook.priceKes,
        accountReference: "Tuistech",
        transactionDesc: ebook.title,
      });

      await prisma.ebookOrder.update({
        where: { id: order.id },
        data: { checkoutRequestId, merchantRequestId },
      });

      return NextResponse.json({ ok: true, checkoutRequestId, orderId: order.id });
    } catch (stkError) {
      await prisma.ebookOrder.update({
        where: { id: order.id },
        data: { status: "FAILED" },
      });
      throw stkError;
    }
  } catch (error) {
    console.error("STK push initiation failed:", error);
    return NextResponse.json(
      { error: "Couldn't start the M-Pesa payment. Please try again." },
      { status: 500 }
    );
  }
}