import { prisma } from "@/lib/prisma";
import { updateBookingStatus, updateMessageStatus } from "@/lib/admin-actions";
import StatusSelect from "@/components/admin/StatusSelect";
import LogoutButton from "@/components/admin/LogoutButton";
import type { BookingStatus, MessageStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const bookingStatuses: BookingStatus[] = ["NEW", "CONTACTED", "CONFIRMED", "CLOSED"];
const messageStatuses: MessageStatus[] = ["NEW", "READ", "REPLIED"];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function AdminPage() {
  const [bookings, messages, ebookOrders] = await Promise.all([
    prisma.bookingRequest.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.ebookOrder.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
  ]);

  const newBookings = bookings.filter((b) => b.status === "NEW").length;
  const newMessages = messages.filter((m) => m.status === "NEW").length;
  const paidOrders = ebookOrders.filter((o) => o.status === "PAID").length;

  return (
    <div className="min-h-screen bg-paper-dim">
      <header className="border-b-2 border-ink bg-ink py-8 text-paper">
        <div className="container-x flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-mono-label text-xs text-green">Admin</span>
            <h1 className="text-display mt-2 text-3xl md:text-4xl">
              Requests dashboard
            </h1>
          </div>
          <LogoutButton />
        </div>
      </header>

      <div className="container-x py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border-2 border-ink bg-paper p-6">
            <span className="text-mono-label text-xs text-steel">
              New booking requests
            </span>
            <p className="text-display mt-2 text-4xl">{newBookings}</p>
          </div>
          <div className="border-2 border-ink bg-paper p-6">
            <span className="text-mono-label text-xs text-steel">
              New contact messages
            </span>
            <p className="text-display mt-2 text-4xl">{newMessages}</p>
          </div>
          <div className="border-2 border-ink bg-paper p-6">
            <span className="text-mono-label text-xs text-steel">
              Paid ebook orders
            </span>
            <p className="text-display mt-2 text-4xl">{paidOrders}</p>
          </div>
        </div>

        {/* BOOKINGS */}
        <section className="mt-14">
          <h2 className="text-display text-2xl">Booking requests</h2>
          <div className="mt-5 overflow-x-auto border border-steel-line bg-paper">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="text-mono-label border-b border-steel-line text-[11px] text-steel">
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Program</th>
                  <th className="px-4 py-3">Preferred</th>
                  <th className="px-4 py-3">Notes</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-steel-line/60 align-top last:border-b-0">
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-ink/60">
                      {formatDate(b.createdAt)}
                    </td>
                    <td className="px-4 py-3 font-medium">{b.name}</td>
                    <td className="px-4 py-3">
                      <a href={`https://wa.me/${b.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-green-dim hover:underline">
                        {b.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3">{b.program}</td>
                    <td className="px-4 py-3 text-xs text-ink/60">
                      {[b.preferredDate, b.preferredTime].filter(Boolean).join(" - ") || "-"}
                    </td>
                    <td className="max-w-xs px-4 py-3 text-xs text-ink/60">
                      {b.notes || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusSelect
                        id={b.id}
                        value={b.status}
                        options={bookingStatuses}
                        onUpdate={updateBookingStatus}
                      />
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-sm text-ink/40">
                      No booking requests yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* MESSAGES */}
        <section className="mt-14">
          <h2 className="text-display text-2xl">Contact messages</h2>
          <div className="mt-5 overflow-x-auto border border-steel-line bg-paper">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="text-mono-label border-b border-steel-line text-[11px] text-steel">
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m.id} className="border-b border-steel-line/60 align-top last:border-b-0">
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-ink/60">
                      {formatDate(m.createdAt)}
                    </td>
                    <td className="px-4 py-3 font-medium">{m.name}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${m.email}`} className="text-green-dim hover:underline">
                        {m.email}
                      </a>
                    </td>
                    <td className="max-w-md px-4 py-3 text-xs text-ink/70">{m.message}</td>
                    <td className="px-4 py-3">
                      <StatusSelect
                        id={m.id}
                        value={m.status}
                        options={messageStatuses}
                        onUpdate={updateMessageStatus}
                      />
                    </td>
                  </tr>
                ))}
                {messages.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-ink/40">
                      No contact messages yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        {/* EBOOK ORDERS */}
        <section className="mt-14">
          <h2 className="text-display text-2xl">Ebook orders (M-Pesa)</h2>
          <div className="mt-5 overflow-x-auto border border-steel-line bg-paper">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="text-mono-label border-b border-steel-line text-[11px] text-steel">
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3">Ebook</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Receipt</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {ebookOrders.map((o) => (
                  <tr key={o.id} className="border-b border-steel-line/60 align-top last:border-b-0">
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-ink/60">
                      {formatDate(o.createdAt)}
                    </td>
                    <td className="px-4 py-3 font-medium">{o.ebookTitle}</td>
                    <td className="px-4 py-3">
                      <a href={`https://wa.me/${o.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-green-dim hover:underline">
                        {o.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${o.email}`} className="text-green-dim hover:underline">
                        {o.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-xs">KES {o.amountKes.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-ink/60">
                      {o.mpesaReceiptNumber || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-mono-label border px-2 py-1 text-[11px] ${
                          o.status === "PAID"
                            ? "border-green text-green-dim"
                            : o.status === "FAILED" || o.status === "CANCELLED"
                              ? "border-steel-line text-ink/40"
                              : "border-steel-line text-steel"
                        }`}
                      >
                        {o.status}
                        {o.status === "PAID" && !o.deliveredAt && " (not delivered)"}
                      </span>
                    </td>
                  </tr>
                ))}
                {ebookOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-sm text-ink/40">
                      No ebook orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}