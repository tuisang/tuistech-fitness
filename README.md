# Tuistech Fitness & Wellness

A Next.js 16 (App Router) fitness site: programs (men's/women's strength,
weight loss, youth, kids), a video library, an ebook shop (Gumroad), a home
equipment shop (WhatsApp ordering), 1:1 consulting booking, and contact —
now backed by a real database with an admin dashboard.

Stack: Next.js 16 · React 19 · Tailwind CSS v4 (CSS-first `@theme`, no
`tailwind.config.ts`) · TypeScript · Prisma 7 (driver adapter + Neon
Postgres) · TypeScript.

## Run locally

1. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — your Neon connection string (reuse an existing
     project or spin up a new database on your existing account)
   - `ADMIN_PASSWORD` — whatever password you want to use to sign in at
     `/admin`

2. Install dependencies (this also runs `prisma generate` automatically
   via a `postinstall` script):

   ```bash
   npm install
   ```

3. Push the schema to your database (creates the `BookingRequest` and
   `ContactMessage` tables — no migration files needed for a first setup):

   ```bash
   npx prisma db push
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

Open http://localhost:3000. Google Fonts (Anton / Work Sans / JetBrains
Mono) load automatically at build time — this requires normal internet
access.

## What's new: real forms + admin dashboard

- **Booking form** (`/consulting`) and **contact form** (`/contact`) now
  save directly to your database via `POST /api/bookings` and
  `POST /api/contact`, instead of just opening WhatsApp/mail.
- **`/admin`** — a password-protected dashboard listing every booking
  request and contact message, newest first, with a status dropdown
  (`NEW → CONTACTED → CONFIRMED → CLOSED` for bookings, `NEW → READ →
  REPLIED` for messages) you can update inline. Protected by `proxy.ts`
  (Next.js 16's replacement for `middleware.ts`) checking a signed session
  cookie set after a correct password at `/admin/login`.
- The booking form still offers a "message us on WhatsApp instead" link
  after submitting, for clients who want a faster reply than waiting on
  you to check the dashboard.

### How the admin login works

There's no user database or Clerk here — just one shared password
(`ADMIN_PASSWORD` in your `.env`) checked against a signed session cookie
(`lib/auth-admin.ts`, using Web Crypto so it works in Next's Edge-based
`proxy.ts`). Good enough for a single-owner dashboard; if you later want
multiple staff logins, that's where you'd bring in Clerk, matching your
other projects.

## Before you launch — things to fill in

1. **`.env`** — real `DATABASE_URL` and a real `ADMIN_PASSWORD` (not
   `changeme`).
2. **`lib/config.ts`** — replace the placeholder WhatsApp number, email,
   phone, and social links with the real ones. The WhatsApp number must be
   digits only, no `+` or spaces (e.g. `254712345678`).
3. **`lib/data.ts`** — this is all the site's content in one place:
   - `programs` — the 5 program cards (men's/women's/weight-loss/youth/kids)
   - `videos` — video library entries. Video cards currently show a styled
     play-button placeholder, not a real embed. To go live, either:
     - embed YouTube/Vimeo iframes per video, or
     - wire up a proper player (e.g. Mux, Cloudinary video, or a signed S3
       URL) if you want to gate videos behind login later.
   - `ebooks` — each needs its real Gumroad product URL
   - `equipment` — home equipment catalog, ordered via WhatsApp deep link
   - `stats` — the scrolling ticker numbers on the homepage
   - `testimonials`
4. Add real photography/video thumbnails under `public/images` if you want
   to move away from the current typography-led, photo-free look.

## Project structure

```
app/
  page.tsx                  Homepage
  programs/page.tsx         Program detail sections
  videos/page.tsx           Video library (filterable)
  shop/page.tsx             Ebooks + equipment
  consulting/page.tsx       Booking (saves to DB)
  contact/page.tsx          Contact (saves to DB)
  about/page.tsx
  admin/page.tsx            Dashboard - view/update requests (protected)
  admin/login/page.tsx      Admin sign-in
  api/bookings/route.ts     POST - create a booking request
  api/contact/route.ts      POST - create a contact message
  api/admin/login/route.ts  POST - verify password, set session cookie
  api/admin/logout/route.ts POST - clear session cookie
components/                 Header, Footer, Ticker, forms, shared UI
components/admin/           StatusSelect, LogoutButton (admin dashboard)
lib/data.ts                 All site content
lib/config.ts                Contact details / WhatsApp helper
lib/prisma.ts                 Prisma client (pg driver adapter)
lib/auth-admin.ts              Admin session token creation/validation
lib/admin-actions.ts             Server actions to update request status
prisma/schema.prisma               BookingRequest + ContactMessage models
proxy.ts                            Protects /admin routes (Next.js 16)
```

## Deploy

Push to GitHub and import into Vercel same as your other projects. You'll
need to set these two environment variables in the Vercel project
settings (Production and Preview):

- `DATABASE_URL`
- `ADMIN_PASSWORD`

Then point a subdomain (e.g. `fitness.tuistech.co.ke`) at it. Since Vercel
auto-deploy hasn't worked reliably for your other projects, remember to
manually redeploy from the Vercel dashboard after the first push if it
doesn't trigger on its own.

**Note on `prisma generate`:** this now runs automatically via a
`postinstall` script every time `npm install` runs (including on Vercel),
so you shouldn't need to run it manually except for local dev right after
cloning.
