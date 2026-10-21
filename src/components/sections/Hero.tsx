import Image from "next/image";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import { business, heroImage, logo } from "@/content/site";
import { QuoteLink } from "../QuoteLink";

const chips = ["Interior Detailing", "Exterior Detailing", "Ceramic Coating"];

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink pt-[4.5rem] lg:pt-20">
      {/* Background: optional photo, otherwise a studio-lit carbon backdrop */}
      {heroImage ? (
        <>
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            preload
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/30" aria-hidden />
        </>
      ) : (
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="carbon absolute inset-0 opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_72%_45%,rgba(225,6,0,0.32),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_15%_10%,rgba(217,221,226,0.08),transparent_70%)]" />
          {/* Angular red frame shapes echoing the logo */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1440 900">
            <defs>
              <linearGradient id="hero-red" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#e10600" stopOpacity="0" />
                <stop offset="0.55" stopColor="#e10600" stopOpacity="0.9" />
                <stop offset="1" stopColor="#ff2a1f" />
              </linearGradient>
            </defs>
            <polygon points="760,0 1440,0 1440,120 880,120" fill="url(#hero-red)" opacity="0.18" />
            <polygon points="560,900 1440,700 1440,712 610,900" fill="url(#hero-red)" opacity="0.9" />
            <polygon points="660,900 1440,728 1440,732 680,900" fill="#d9dde2" opacity="0.25" />
          </svg>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        </div>
      )}

      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.15fr_1fr] lg:gap-6 lg:px-8 lg:pb-24">
        <div className="relative z-10">
          <p className="eyebrow flex items-center gap-2">
            <MapPin className="size-4" aria-hidden />
            Mobile detailing · Mercer County, NJ
          </p>
          <h1 id="hero-title" className="display mt-5 text-[3.25rem] text-balance text-white sm:text-7xl xl:text-[5.5rem]">
            Premium Car Detailing.
            <span className="chrome-text block pb-1">Delivered to You.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-chrome/90 sm:text-xl">
            From a spotless interior to a showroom-worthy shine, Davila Detailing Co. brings mobile detailing to Mercer
            County, NJ, and surrounding areas.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteLink className="btn btn-red group text-lg">
              Get a Free Quote
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </QuoteLink>
            <a href={business.phoneHref} className="btn btn-ghost text-lg">
              <Phone className="size-5 text-red-bright" aria-hidden />
              Call {business.phoneDisplay}
            </a>
          </div>

          <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-lg font-semibold uppercase tracking-[0.08em] text-white">
            Professional detailing. Convenient mobile service.
            <span className="text-red-bright">We come to you!</span>
          </p>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Services offered">
            {chips.map((c) => (
              <li
                key={c}
                className="flex items-center gap-1.5 border border-white/12 bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-chrome"
              >
                <Check className="size-4 text-red-bright" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {!heroImage && (
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              aria-hidden
              className="absolute inset-x-[8%] bottom-[2%] h-[18%] rounded-[50%] bg-red/40 blur-3xl"
            />
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              sizes="(min-width: 1024px) 45vw, 90vw"
              preload
              className="relative w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.7)]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
