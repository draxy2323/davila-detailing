"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AlertTriangle, CheckCircle2, ImagePlus, Loader2, Mail, Phone, Send, X } from "lucide-react";
import { business, serviceOptions } from "@/content/site";
import {
  ALLOWED_PHOTO_TYPES,
  QUOTE_LIMITS,
  serviceLabel,
  validateQuote,
  type QuoteErrors,
  type QuoteFields,
  type QuoteResponse,
} from "@/lib/quote";
import { compressImage } from "@/lib/compress-image";
import { QUOTE_SELECT_EVENT } from "./QuoteLink";

const EMPTY: QuoteFields = {
  name: "",
  phone: "",
  email: "",
  vehicle: "",
  service: "",
  details: "",
  availability: "",
  location: "",
};

const ORDER: (keyof QuoteFields)[] = ["name", "phone", "email", "vehicle", "service", "location", "availability", "details"];

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; name: string }
  | { kind: "error"; message: string; fallback: boolean };

const inputBase =
  "block w-full rounded-none border bg-ink/80 px-4 py-3.5 text-base text-white placeholder:text-steel/70 transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-red-bright";

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-2 font-display text-[0.95rem] font-semibold uppercase tracking-[0.12em] text-chrome">
        <span>
          {label}
          {required && <span className="text-red-bright" aria-hidden> *</span>}
        </span>
        {!required && <span className="text-xs font-medium normal-case tracking-normal text-steel">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-steel">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-bright">
          <AlertTriangle className="size-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

function mailtoFallback(f: QuoteFields) {
  const lines = [
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    f.email && `Email: ${f.email}`,
    `Vehicle: ${f.vehicle}`,
    `Service: ${serviceLabel(f.service) ?? ""}`,
    `Location / ZIP: ${f.location}`,
    f.availability && `Preferred date / availability: ${f.availability}`,
    f.details && `Details: ${f.details}`,
  ].filter(Boolean);
  const subject = `Quote request${f.service ? ` — ${serviceLabel(f.service)}` : ""}`;
  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export function QuoteForm() {
  const [fields, setFields] = useState<QuoteFields>(EMPTY);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof QuoteFields, boolean>>>({});
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    const fromUrl = new URLSearchParams(window.location.search).get("service");
    // Preselect a service passed in the URL (e.g. from a "Request a quote" link); must run after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (fromUrl && serviceLabel(fromUrl)) setFields((f) => ({ ...f, service: fromUrl }));
    const onSelect = (e: Event) => {
      const s = (e as CustomEvent<string | null>).detail;
      if (s && serviceLabel(s)) {
        setFields((f) => ({ ...f, service: s }));
        setErrors((er) => ({ ...er, service: undefined }));
      }
    };
    window.addEventListener(QUOTE_SELECT_EVENT, onSelect);
    return () => window.removeEventListener(QUOTE_SELECT_EVENT, onSelect);
  }, []);

  const set = (key: keyof QuoteFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...fields, [key]: e.target.value };
    setFields(next);
    if (touched[key] || errors[key]) setErrors((er) => ({ ...er, [key]: validateQuote(next)[key] }));
  };

  const blur = (key: keyof QuoteFields) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((er) => ({ ...er, [key]: validateQuote(fields)[key] }));
  };

  const a11y = (key: keyof QuoteFields, hint?: boolean) => ({
    id: `quote-${key}`,
    name: key,
    value: fields[key],
    onChange: set(key),
    onBlur: blur(key),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `quote-${key}-error` : hint ? `quote-${key}-hint` : undefined,
    className: `${inputBase} ${errors[key] ? "border-red-bright" : "border-white/15 hover:border-white/30"}`,
  });

  async function addPhotos(list: FileList | null) {
    if (!list?.length) return;
    setPhotoError(null);
    const incoming = Array.from(list);
    if (photos.length + incoming.length > QUOTE_LIMITS.maxPhotos) {
      setPhotoError(`You can attach up to ${QUOTE_LIMITS.maxPhotos} photos.`);
      return;
    }
    if (incoming.some((f) => !ALLOWED_PHOTO_TYPES.includes(f.type))) {
      setPhotoError("Please choose JPG, PNG, WebP or HEIC photos.");
      return;
    }
    setProcessing(true);
    const compressed = await Promise.all(incoming.map((f) => compressImage(f)));
    setProcessing(false);
    const next = [...photos, ...compressed];
    const total = next.reduce((n, f) => n + f.size, 0);
    if (compressed.some((f) => f.size > QUOTE_LIMITS.maxPhotoBytes) || total > QUOTE_LIMITS.maxTotalPhotoBytes) {
      setPhotoError("Those photos are too large to send. Try fewer or smaller photos (4 MB total).");
      return;
    }
    setPhotos(next);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const found = validateQuote(fields);
    setErrors(found);
    setTouched(Object.fromEntries(ORDER.map((k) => [k, true])));
    const firstInvalid = ORDER.find((k) => found[k]);
    if (firstInvalid) {
      document.getElementById(`quote-${firstInvalid}`)?.focus();
      return;
    }

    setStatus({ kind: "submitting" });
    const body = new FormData();
    (Object.keys(fields) as (keyof QuoteFields)[]).forEach((k) => body.append(k, fields[k].trim()));
    photos.forEach((p) => body.append("photos", p, p.name));
    body.append("startedAt", String(startedAt.current));
    body.append("website", (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "");

    let result: QuoteResponse | null = null;
    try {
      const res = await fetch("/api/quote", { method: "POST", body });
      result = (await res.json().catch(() => null)) as QuoteResponse | null;
    } catch {
      result = null;
    }

    if (result?.ok) {
      setStatus({ kind: "success", name: fields.name.split(" ")[0] });
      setFields(EMPTY);
      setPhotos([]);
      setTouched({});
    } else if (result && result.code === "invalid") {
      setErrors(result.errors);
      setStatus({ kind: "error", message: result.message, fallback: false });
    } else {
      const message =
        result?.code === "rate_limited"
          ? result.message
          : result?.code === "rejected"
            ? result.message
            : "Your request was not sent — our online form is temporarily unavailable.";
      setStatus({ kind: "error", message, fallback: true });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status.kind === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="flex flex-col items-center px-2 py-14 text-center focus:outline-none">
        <span className="flex size-16 items-center justify-center rounded-full bg-red/15 text-red-bright">
          <CheckCircle2 className="size-9" aria-hidden />
        </span>
        <h3 className="display mt-6 text-4xl text-white">Request sent{status.name ? `, ${status.name}` : ""}!</h3>
        <p className="mt-3 max-w-md text-steel">
          Thanks for reaching out to Davila Detailing Co. We received your quote request and will contact you to talk
          through options and availability.
        </p>
        <p className="mt-2 text-steel">
          Need us sooner? Call{" "}
          <a href={business.phoneHref} className="font-semibold text-white underline decoration-red underline-offset-4">
            {business.phoneDisplay}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="btn btn-ghost mt-8">
          Send another request
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="quote-required-note" className="grid gap-5">
      <p id="quote-required-note" className="text-sm text-steel">
        Fields marked <span className="text-red-bright">*</span> are required. It only takes a minute.
      </p>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="quote-website">Leave this field empty</label>
        <input id="quote-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="quote-name" label="Name" required error={errors.name}>
          <input {...a11y("name")} type="text" autoComplete="name" maxLength={QUOTE_LIMITS.name} required />
        </Field>
        <Field id="quote-phone" label="Phone" required error={errors.phone}>
          <input {...a11y("phone")} type="tel" inputMode="tel" autoComplete="tel" maxLength={QUOTE_LIMITS.phone} placeholder="(609) 555-0123" required />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="quote-email" label="Email" error={errors.email}>
          <input {...a11y("email")} type="email" autoComplete="email" maxLength={QUOTE_LIMITS.email} placeholder="you@example.com" />
        </Field>
        <Field id="quote-location" label="ZIP code or town" required hint="So we can confirm we serve your location." error={errors.location}>
          <input {...a11y("location", true)} type="text" autoComplete="postal-code" maxLength={QUOTE_LIMITS.location} placeholder="e.g. 08618 or Ewing" required />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="quote-vehicle" label="Vehicle year, make & model" required error={errors.vehicle}>
          <input {...a11y("vehicle")} type="text" maxLength={QUOTE_LIMITS.vehicle} placeholder="e.g. 2021 Ford Mustang GT" required />
        </Field>
        <Field id="quote-service" label="Service requested" required error={errors.service}>
          <select {...a11y("service")} required className={`${a11y("service").className} appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10 bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%23d9dde2'%20stroke-width='2'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")]`}>
            <option value="" disabled>
              Choose a service…
            </option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="quote-availability" label="Preferred date or availability" error={errors.availability}>
        <input {...a11y("availability")} type="text" maxLength={QUOTE_LIMITS.availability} placeholder="e.g. Weekday mornings, or Saturday the 14th" />
      </Field>

      <Field id="quote-details" label="Vehicle condition or additional details" error={errors.details}>
        <textarea
          {...a11y("details")}
          rows={4}
          maxLength={QUOTE_LIMITS.details}
          placeholder="Pet hair, stains, last detail, anything you'd like us to focus on…"
        />
      </Field>

      {/* Photos */}
      <div>
        <p className="mb-2 flex items-baseline justify-between font-display text-[0.95rem] font-semibold uppercase tracking-[0.12em] text-chrome">
          <span>Photos of your vehicle</span>
          <span className="text-xs font-medium normal-case tracking-normal text-steel">Optional · up to {QUOTE_LIMITS.maxPhotos}</span>
        </p>
        <label
          htmlFor="quote-photos"
          className={`flex cursor-pointer items-center gap-3 border border-dashed px-4 py-4 text-steel transition-colors hover:border-red/70 hover:text-chrome has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-red-bright ${
            photoError ? "border-red-bright" : "border-white/20"
          } ${photos.length >= QUOTE_LIMITS.maxPhotos ? "pointer-events-none opacity-50" : ""}`}
        >
          {processing ? <Loader2 className="size-6 animate-spin text-red-bright" aria-hidden /> : <ImagePlus className="size-6 text-red-bright" aria-hidden />}
          <span>{processing ? "Preparing photos…" : "Add photos — they help us give a more accurate quote"}</span>
          <input
            id="quote-photos"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
            multiple
            className="sr-only"
            disabled={photos.length >= QUOTE_LIMITS.maxPhotos || processing}
            aria-describedby={photoError ? "quote-photos-error" : undefined}
            onChange={(e) => {
              addPhotos(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
        {photoError && (
          <p id="quote-photos-error" className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-bright">
            <AlertTriangle className="size-4" aria-hidden /> {photoError}
          </p>
        )}
        {photos.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {photos.map((p, i) => (
              <li key={`${p.name}-${i}`} className="flex items-center gap-2 bg-white/5 py-1.5 pl-3 pr-1 text-sm text-chrome">
                <span className="max-w-[12rem] truncate">{p.name}</span>
                <span className="text-steel">{(p.size / 1024 / 1024).toFixed(1)} MB</span>
                <button
                  type="button"
                  onClick={() => setPhotos((ps) => ps.filter((_, j) => j !== i))}
                  className="flex size-8 items-center justify-center text-steel hover:text-white"
                  aria-label={`Remove ${p.name}`}
                >
                  <X className="size-4" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {status.kind === "error" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="border-l-4 border-red-bright bg-red/10 p-5 focus:outline-none">
          <p className="flex items-center gap-2 font-semibold text-white">
            <AlertTriangle className="size-5 shrink-0 text-red-bright" aria-hidden />
            {status.message}
          </p>
          {status.fallback && (
            <>
              <p className="mt-2 text-sm text-chrome">Please reach us directly — we&rsquo;d love to help:</p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <a href={business.phoneHref} className="btn btn-red !min-h-11 !text-base">
                  <Phone className="size-4" aria-hidden /> Call {business.phoneDisplay}
                </a>
                <a href={mailtoFallback(fields)} className="btn btn-ghost !min-h-11 !text-base">
                  <Mail className="size-4" aria-hidden /> Email this request
                </a>
              </div>
              {photos.length > 0 && (
                <p className="mt-3 text-xs text-steel">If you email us, please attach your photos to the message.</p>
              )}
            </>
          )}
        </div>
      )}

      <button type="submit" disabled={submitting || processing} className="btn btn-red mt-1 w-full text-lg disabled:cursor-wait disabled:opacity-70">
        {submitting ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden /> Sending…
          </>
        ) : (
          <>
            Request My Quote <Send className="size-5" aria-hidden />
          </>
        )}
      </button>
      <p className="text-center text-xs text-steel">
        We only use your details to respond to your quote request. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-chrome">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
