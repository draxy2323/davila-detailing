# Davila Detailing Co. — Website

Premium, conversion-focused one-page site for a mobile detailing business serving
Mercer County, NJ, and surrounding areas. Built with Next.js 16 (App Router),
React 19, TypeScript and Tailwind CSS v4.

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then add your RESEND_API_KEY
npm run dev                  # http://localhost:3000
```

Production check: `npm run build && npm start`.

## Make the quote form deliver email (required)

The form posts to `/api/quote`, which emails each request (with photos attached)
through [Resend](https://resend.com). Until `RESEND_API_KEY` is set, the form
**does not pretend to send**: it tells the visitor the request was not sent and
offers click-to-call and a pre-filled email instead.

1. Create a free account at resend.com **using `daviladetailing@yahoo.com`**.
2. Go to **API Keys → Create API Key** (permission: "Sending access") and copy it.
3. Add it as `RESEND_API_KEY` in `.env.local` (local) and in your host's
   environment variables (production). Redeploy.
4. Submit a test request on the live site and confirm it arrives (check spam the
   first time).

With the default sender (`onboarding@resend.dev`), Resend only delivers to the
email the account was created with — which is why step 1 matters. For better
deliverability, later verify your own domain in Resend and set
`QUOTE_FROM_EMAIL` to an address on that domain.

Spam protection: hidden honeypot field, minimum fill time, server-side
validation, and a per-IP rate limit (5 requests / 10 min per server instance).
If spam becomes a problem, add Cloudflare Turnstile.

## Deploy (Vercel recommended)

1. Push this folder to a GitHub repository.
2. At vercel.com → **Add New → Project** → import the repo (framework is detected).
3. Add environment variables: `RESEND_API_KEY` (and optionally `QUOTE_TO_EMAIL`,
   `QUOTE_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`).
4. Deploy. When you connect a domain, set `NEXT_PUBLIC_SITE_URL` to it and redeploy.

Any host that runs Next.js with server functions (Netlify, Render, a Node server)
also works. Static-only hosting won't run the quote API.

## Editing content

Almost everything lives in **`src/content/site.ts`**:

| What | Where |
| --- | --- |
| Phone, email, service area, social links, hours | `business` |
| Service titles, descriptions, bullet points, prices | `services` (set `price` to e.g. `"Starting at $___"`; `null` hides it) |
| Extra services | the `"other"` service's `highlights` (replace the `[Add a service you offer]` lines) |
| Gallery before/after photos | `gallery` |
| Hero background photo | `heroImage` |
| Customer reviews | `testimonials` (section stays hidden on the live site while empty) |
| FAQ answers | `faqs` — answers marked `[Owner to confirm]` need your input |

**Adding photos:** put files in `public/images/…` and reference them, e.g.

```ts
image: { src: "/images/services/interior.jpg", alt: "Freshly detailed leather seats in a Honda Accord", width: 1600, height: 900 }
```

Images are automatically resized, converted to AVIF/WebP and lazy-loaded.
Only use photos of vehicles you actually detailed for the gallery.

The privacy policy is at `src/app/privacy/page.tsx` — have it reviewed for your situation.

## Project layout

```
src/
  app/            layout (SEO + structured data), page, privacy page, /api/quote, icons, OG image
  components/     Header, Footer, QuoteForm, mobile action bar, shared bits
  components/sections/  one file per page section
  content/site.ts all editable business content
  lib/            shared form validation, image compression, site URL
scripts/process-logo.py  regenerates logo, favicon and social image from the source logo
```
