import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, createSessionToken, isValidPassword } from "@/lib/auth-admin";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (typeof password !== "string" || !isValidPassword(password)) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    const token = await createSessionToken();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
