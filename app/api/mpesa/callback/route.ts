import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEbookDelivery } from "@/lib/email";

// Safaricom calls this URL directly (not the browser), so there's no
// user session here - this endpoint's security relies on the callback URL
// being unguessable (set via MPESA_CALLBACK_URL) rather than a signed
// request, which is standard practice for Daraja's STK Push callback.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const stkCallback = body?.Body?.stkCallback;

    if (!stkCallback) {
      return NextResponse.json({ ok: true }); // acknowledge, nothing to do
    }

    const checkoutRequestId = stkCallback.CheckoutRequestID as string;
    const resultCode = stkCallback.ResultCode as number;
    const resultDesc = stkCallback.ResultDesc as string;

    console.log("M-Pesa callback result:", { checkoutRequestId, resultCode, resultDesc });

    const order = await prisma.ebookOrder.findUnique({
      where: { checkoutRequestId },
    });

    if (!order) {
      console.error("M-Pesa callback for unknown order:", checkoutRequestId);
      return NextResponse.json({ ok: true });
    }

    if (resultCode !== 0) {
      console.log(`Order ${order.id} failed: ${resultDesc}`);
      await prisma.ebookOrder.update({
        where: { id: order.id },
        data: { status: "FAILED" },
      });
      return NextResponse.json({ ok: true });
    }

    const items = stkCallback.CallbackMetadata?.Item ?? [];
    const getValue = (name: string) =>
      items.find((i: { Name: string; Value?: string | number }) => i.Name === name)
        ?.Value;

    const mpesaReceiptNumber = String(getValue("MpesaReceiptNumber") ?? "");

    await prisma.ebookOrder.update({
      where: { id: order.id },
      data: {
        status: "PAID",
        mpesaReceiptNumber,
      },
    });

    try {
      await sendEbookDelivery({
        email: order.email,
        ebookSlug: order.ebookSlug,
        ebookTitle: order.ebookTitle,
      });
      await prisma.ebookOrder.update({
        where: { id: order.id },
        data: { deliveredAt: new Date() },
      });
    } catch (deliveryError) {
      // Payment succeeded even if delivery email fails - log it so it can
      // be resolved manually rather than losing the paid order.
      console.error("Ebook delivery failed after successful payment:", deliveryError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("M-Pesa callback processing failed:", error);
    // Still return 200 so Safaricom doesn't endlessly retry a broken payload
    return NextResponse.json({ ok: true });
  }
}