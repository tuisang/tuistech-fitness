import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Uses Zoho Mail SMTP, matching the setup used across other Tuistech
// projects. All values are read from environment variables so nothing
// sensitive lives in source. If SMTP isn't configured, notifications are
// silently skipped rather than breaking the booking/contact flow.

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // true for 465, false for 587/others
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });
}

async function sendNotification(subject: string, lines: (string | null)[]) {
  const transporter = getTransporter();
  const notifyTo = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;

  if (!transporter || !notifyTo) {
    console.log("Email notifications not configured - skipping send.");
    return;
  }

  const text = lines.filter(Boolean).join("\n");
  const html = lines
    .filter(Boolean)
    .map((line) => `<p style="margin:0 0 8px;font-family:sans-serif;font-size:14px;">${line}</p>`)
    .join("");

  try {
    await transporter.sendMail({
      from: `"Tuistech Fitness Site" <${process.env.SMTP_USER}>`,
      to: notifyTo,
      subject,
      text,
      html,
    });
  } catch (error) {
    // Never let an email failure break the booking/contact flow - the
    // submission is already saved in the database regardless.
    console.error("Failed to send notification email:", error);
  }
}

export async function sendBookingNotification(booking: {
  name: string;
  phone: string;
  program: string;
  preferredDate?: string | null;
  preferredTime?: string | null;
  notes?: string | null;
}) {
  await sendNotification(`New booking request - ${booking.name}`, [
    `New booking request received on the website:`,
    ``,
    `Name: ${booking.name}`,
    `Phone: ${booking.phone}`,
    `Program: ${booking.program}`,
    booking.preferredDate ? `Preferred date: ${booking.preferredDate}` : null,
    booking.preferredTime ? `Preferred time: ${booking.preferredTime}` : null,
    booking.notes ? `Notes: ${booking.notes}` : null,
    ``,
    `View and manage this request at /admin.`,
  ]);
}

export async function sendContactNotification(message: {
  name: string;
  email: string;
  message: string;
}) {
  await sendNotification(`New contact message - ${message.name}`, [
    `New contact message received on the website:`,
    ``,
    `Name: ${message.name}`,
    `Email: ${message.email}`,
    `Message: ${message.message}`,
    ``,
    `View and manage this message at /admin.`,
  ]);
}

// PDFs live outside the `public/` folder (in `private/ebooks/`) so they
// can never be downloaded directly by URL - only this server-side code
// can read them, and only after a payment is confirmed.
export async function sendEbookDelivery({
  email,
  ebookSlug,
  ebookTitle,
}: {
  email: string;
  ebookSlug: string;
  ebookTitle: string;
}) {
  const transporter = getTransporter();

  if (!transporter) {
    throw new Error(
      "Cannot deliver ebook - email is not configured (SMTP_* env vars missing)."
    );
  }

  const pdfPath = path.join(process.cwd(), "private", "ebooks", `${ebookSlug}.pdf`);

  if (!fs.existsSync(pdfPath)) {
    throw new Error(
      `Cannot deliver ebook - PDF file not found at private/ebooks/${ebookSlug}.pdf`
    );
  }

  await transporter.sendMail({
    from: `"Tuistech Fitness" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Your download: ${ebookTitle}`,
    text: `Thanks for your purchase! Your copy of "${ebookTitle}" is attached to this email.\n\nIf you have any trouble opening it, reply to this email and we'll help.\n\n- Tuistech Fitness`,
    html: `<p style="font-family:sans-serif;font-size:14px;">Thanks for your purchase! Your copy of <strong>${ebookTitle}</strong> is attached to this email.</p><p style="font-family:sans-serif;font-size:14px;">If you have any trouble opening it, reply to this email and we'll help.</p><p style="font-family:sans-serif;font-size:14px;">- Tuistech Fitness</p>`,
    attachments: [
      {
        filename: `${ebookTitle}.pdf`,
        path: pdfPath,
      },
    ],
  });
}