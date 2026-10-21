import { serviceOptions } from "@/content/site";

/** Rules shared by the browser form and the /api/quote handler. */

export const QUOTE_LIMITS = {
  name: 80,
  phone: 30,
  email: 120,
  vehicle: 120,
  details: 2000,
  availability: 200,
  location: 120,
  maxPhotos: 3,
  /** Per photo, after in-browser compression. */
  maxPhotoBytes: 3 * 1024 * 1024,
  /** Keeps the whole request under typical serverless body limits (~4.5 MB). */
  maxTotalPhotoBytes: 4 * 1024 * 1024,
  /** Submissions faster than this after the form loads are treated as bots. */
  minFillMs: 3000,
} as const;

export const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

export type QuoteFields = {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string;
  details: string;
  availability: string;
  location: string;
};

export type QuoteErrors = Partial<Record<keyof QuoteFields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function serviceLabel(value: string) {
  return serviceOptions.find((o) => o.value === value)?.label ?? null;
}

export function validateQuote(f: QuoteFields): QuoteErrors {
  const e: QuoteErrors = {};
  const digits = f.phone.replace(/\D/g, "");

  if (!f.name.trim()) e.name = "Please enter your name.";
  else if (f.name.length > QUOTE_LIMITS.name) e.name = "Please shorten your name.";

  if (!digits) e.phone = "Please enter a phone number so we can reach you.";
  else if (digits.length < 10 || digits.length > 15 || f.phone.length > QUOTE_LIMITS.phone)
    e.phone = "Please enter a valid phone number, e.g. (609) 555-0123.";

  if (f.email.trim() && (!EMAIL_RE.test(f.email.trim()) || f.email.length > QUOTE_LIMITS.email))
    e.email = "Please enter a valid email address, or leave it blank.";

  if (!f.vehicle.trim()) e.vehicle = "Please tell us the year, make and model.";
  else if (f.vehicle.length > QUOTE_LIMITS.vehicle) e.vehicle = "Please shorten the vehicle description.";

  if (!serviceLabel(f.service)) e.service = "Please choose a service.";

  if (!f.location.trim()) e.location = "Please enter your ZIP code or town so we can confirm availability.";
  else if (f.location.length > QUOTE_LIMITS.location) e.location = "Please shorten the location.";

  if (f.details.length > QUOTE_LIMITS.details) e.details = `Please keep details under ${QUOTE_LIMITS.details} characters.`;
  if (f.availability.length > QUOTE_LIMITS.availability) e.availability = "Please shorten your availability.";

  return e;
}

export type QuoteResponse =
  | { ok: true }
  | { ok: false; code: "invalid"; errors: QuoteErrors; message: string }
  | { ok: false; code: "not_configured" | "rate_limited" | "send_failed" | "rejected"; message: string };
