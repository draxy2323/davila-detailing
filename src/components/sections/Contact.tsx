import { Mail, MapPin, Phone, Truck } from "lucide-react";
import { business } from "@/content/site";
import { QuoteForm } from "../QuoteForm";
import { SectionHeading } from "../SectionHeading";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-coal py-24 lg:py-32">
      <div aria-hidden className="carbon absolute inset-0 -z-10 opacity-50" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_80%_20%,rgba(225,6,0,0.18),transparent_70%)]" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Free quote"
            title={
              <>
                Get your <span className="chrome-text">free quote.</span>
              </>
            }
            intro="Tell us about your vehicle and what it needs. We'll follow up to confirm pricing, availability and a convenient location."
          />

          <ul className="mt-10 grid gap-4">
            <li>
              <a href={business.phoneHref} className="group flex items-center gap-4 border border-white/10 bg-ink/70 p-5 transition-colors notch hover:border-red/60">
                <span className="flex size-12 shrink-0 items-center justify-center bg-red text-white">
                  <Phone className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm uppercase tracking-[0.18em] text-steel">Call or text</span>
                  <span className="font-display text-2xl font-bold tracking-wide text-white group-hover:text-red-bright">
                    {business.phoneDisplay}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="group flex items-center gap-4 border border-white/10 bg-ink/70 p-5 transition-colors notch hover:border-red/60">
                <span className="flex size-12 shrink-0 items-center justify-center bg-white/10 text-white">
                  <Mail className="size-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm uppercase tracking-[0.18em] text-steel">Email</span>
                  <span className="block break-all text-lg font-semibold text-white group-hover:text-red-bright">{business.email}</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4 border border-white/10 bg-ink/70 p-5 notch">
              <span className="flex size-12 shrink-0 items-center justify-center bg-white/10 text-white">
                <MapPin className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm uppercase tracking-[0.18em] text-steel">Service area</span>
                <span className="text-lg font-semibold text-white">{business.serviceArea}</span>
              </span>
            </li>
          </ul>

          <p className="mt-8 flex items-center gap-3 font-display text-2xl font-bold uppercase tracking-wider text-white">
            <Truck className="size-7 text-red-bright" aria-hidden /> {business.tagline}
          </p>
        </div>

        <div id="quote" className="relative scroll-mt-24 border border-white/10 bg-ink/85 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur notch sm:p-10">
          <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red via-red-bright to-transparent" />
          <h3 className="display text-3xl text-white">Request a quote</h3>
          <div className="mt-4">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
