"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "@/lib/auth-admin";
import type { BookingStatus, MessageStatus } from "@prisma/client";

async function assertAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const valid = await isValidSessionToken(token);
  if (!valid) {
    throw new Error("Unauthorized");
  }
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  await assertAdmin();
  await prisma.bookingRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
}

export async function updateMessageStatus(id: string, status: MessageStatus) {
  await assertAdmin();
  await prisma.contactMessage.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
}
