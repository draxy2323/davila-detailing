import {
  ALLOWED_PHOTO_TYPES,
  QUOTE_LIMITS,
  serviceLabel,
  validateQuote,
  type QuoteFields,
  type QuoteResponse,
} from "@/lib/quote";
import { business } from "@/content/site";

/**
 * Quote requests are delivered by email through Resend (https://resend.com).
 * Required env var:   RESEND_API_KEY
 * Optional env vars:  QUOTE_TO_EMAIL   (default: the business email)
 *                     QUOTE_FROM_EMAIL (default: Resend's onboarding sender)
 * Without RESEND_API_KEY the endpoint answers 503 and the form shows the
 * phone/email fallback instead of pretending the request was sent.
 */

// RESEND_API_URL exists only so the success path can be tested against a local mock.
const RESEND_URL = process.env.RESEND_API_URL || "https://api.resend.com/emails";

// Best-effort per-instance rate limit: 5 submissions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function json(body: QuoteResponse, status: number) {
  return Response.json(body, { status });
}

function str(form: FormData, key: string) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return json(
      { ok: false, code: "rate_limited", message: "Too many requests. Please wait a few minutes, or call us." },
      429,
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, code: "rejected", message: "We couldn't read that submission. Please try again." }, 400);
  }

  // Spam traps: a hidden field humans never fill, and a minimum fill time.
  const startedAt = Number(str(form, "startedAt"));
  if (str(form, "website") || !startedAt || Date.now() - startedAt < QUOTE_LIMITS.minFillMs) {
    return json({ ok: false, code: "rejected", message: "Your request couldn't be verified. Please try again." }, 400);
  }

  const fields: QuoteFields = {
    name: str(form, "name"),
    phone: str(form, "phone"),
    email: str(form, "email"),
    vehicle: str(form, "vehicle"),
    service: str(form, "service"),
    details: str(form, "details"),
    availability: str(form, "availability"),
    location: str(form, "location"),
  };

  const errors = validateQuote(fields);
  if (Object.keys(errors).length) {
    return json({ ok: false, code: "invalid", errors, message: "Please fix the highlighted fields." }, 422);
  }

  const photos = form.getAll("photos").filter((p): p is File => typeof p !== "string" && p.size > 0);
  const totalBytes = photos.reduce((n, p) => n + p.size, 0);
  if (
    photos.length > QUOTE_LIMITS.maxPhotos ||
    totalBytes > QUOTE_LIMITS.maxTotalPhotoBytes ||
    photos.some((p) => p.size > QUOTE_LIMITS.maxPhotoBytes || !ALLOWED_PHOTO_TYPES.includes(p.type))
  ) {
    return json(
      { ok: false, code: "rejected", message: `Please attach up to ${QUOTE_LIMITS.maxPhotos} photos (JPG, PNG, WebP or HEIC, 4 MB total).` },
      400,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[quote] RESEND_API_KEY is not set — quote request was NOT delivered.");
    return json(
      { ok: false, code: "not_configured", message: "Online quote requests aren't available right now." },
      503,
    );
  }

  const to = process.env.QUOTE_TO_EMAIL || business.email;
  const from = process.env.QUOTE_FROM_EMAIL || "Davila Detailing Website <onboarding@resend.dev>";
  const service = serviceLabel(fields.service)!;

  const rows: [string, string][] = [
    ["Name", fields.name],
    ["Phone", fields.phone],
    ["Email", fields.email || "—"],
    ["Vehicle", fields.vehicle],
    ["Service", service],
    ["Location / ZIP", fields.location],
    ["Preferred date / availability", fields.availability || "—"],
    ["Vehicle condition / details", fields.details || "—"],
    ["Photos attached", String(photos.length)],
  ];

  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111">
<h2 style="margin:0 0 12px">New quote request — ${escapeHtml(service)}</h2>
<table cellpadding="8" style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="border:1px solid #ddd;font-weight:bold;vertical-align:top">${k}</td><td style="border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>
<p style="color:#666;font-size:13px">Sent from the quote form on the Davila Detailing Co. website.</p></div>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const attachments = await Promise.all(
    photos.map(async (p, i) => ({
      filename: p.name?.replace(/[^\w.\-]/g, "_") || `photo-${i + 1}.jpg`,
      content: Buffer.from(await p.arrayBuffer()).toString("base64"),
    })),
  );

  try {
    const res = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email || undefined,
        subject: `Quote request: ${service} — ${fields.name}`,
        html,
        text,
        attachments: attachments.length ? attachments : undefined,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      console.error("[quote] Resend rejected the email:", res.status, await res.text().catch(() => ""));
      return json({ ok: false, code: "send_failed", message: "We couldn't send your request." }, 502);
    }
  } catch (err) {
    console.error("[quote] Failed to reach Resend:", err);
    return json({ ok: false, code: "send_failed", message: "We couldn't send your request." }, 502);
  }

  return json({ ok: true }, 200);
}
