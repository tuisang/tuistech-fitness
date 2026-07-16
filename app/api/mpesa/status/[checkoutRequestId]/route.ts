import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ checkoutRequestId: string }> }
) {
  const { checkoutRequestId } = await params;

  const order = await prisma.ebookOrder.findUnique({
    where: { checkoutRequestId },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json({ status: order.status });
}