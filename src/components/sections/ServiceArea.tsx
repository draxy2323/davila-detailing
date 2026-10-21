import { MapPin, Phone } from "lucide-react";
import { business } from "@/content/site";
import { QuoteLink } from "../QuoteLink";
import { Reveal } from "../Reveal";

export function ServiceArea() {
  return (
    <section aria-labelledby="area-title" className="relative isolate overflow-hidden border-y border-white/8 bg-coal py-24 lg:py-28">
      <div aria-hidden className="carbon absolute inset-0 -z-10 opacity-50" />
      {/* Stylised "radar" rings — decorative only, not a map of guaranteed coverage */}
      <div aria-hidden className="absolute right-[-12rem] top-1/2 -z-10 hidden -translate-y-1/2 md:block">
        {[44, 34, 24, 14].map((r) => (
          <span
            key={r}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red/25"
            style={{ width: `${r}rem`, height: `${r}rem` }}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red shadow-[0_0_0_8px_rgba(225,6,0,0.2),0_0_40px_rgba(225,6,0,0.8)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow flex items-center gap-2">
            <MapPin className="size-4" aria-hidden /> Service area
          </p>
          <h2 id="area-title" className="display mt-4 text-balance text-4xl text-white sm:text-5xl lg:text-6xl">
            Mobile detailing across <span className="chrome-text">Mercer County and beyond.</span>
          </h2>
          <p className="mt-5 text-lg text-chrome/90">
            Davila Detailing Co. provides mobile detailing throughout Mercer County, New Jersey, and surrounding areas.
          </p>
          <p className="mt-4 text-steel">
            Whether you&rsquo;re looking for mobile auto detailing in Ewing, NJ, or elsewhere in the county, reach out
            with your ZIP code and we&rsquo;ll confirm service availability at your location.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteLink className="btn btn-red">Check My Location</QuoteLink>
            <a href={business.phoneHref} className="btn btn-ghost">
              <Phone className="size-5 text-red-bright" aria-hidden /> Call {business.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
