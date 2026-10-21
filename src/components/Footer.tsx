import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { business, logo, navLinks, services } from "@/content/site";
import { CurrentYear } from "./CurrentYear";
import { QuoteLink } from "./QuoteLink";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink pb-28 pt-16 lg:pb-12">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.1fr] lg:px-8">
        <div>
          <Link href="/#home" aria-label={`${business.name} — back to top`} className="inline-block">
            <Image src={logo.src} alt="" width={logo.width} height={logo.height} sizes="220px" className="h-auto w-52" />
          </Link>
          <p className="mt-5 max-w-xs text-steel">
            Premium mobile car detailing for Mercer County, NJ, and surrounding areas.{" "}
            <span className="font-semibold text-white">{business.tagline}</span>
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-lg font-bold uppercase tracking-[0.18em] text-white">Explore</h2>
          <ul className="mt-4 grid gap-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-steel transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#faq" className="text-steel transition-colors hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-lg font-bold uppercase tracking-[0.18em] text-white">Services</h2>
          <ul className="mt-4 grid gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <QuoteLink service={s.slug} className="text-steel transition-colors hover:text-white">
                  {s.title}
                </QuoteLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold uppercase tracking-[0.18em] text-white">Contact</h2>
          <ul className="mt-4 grid gap-3">
            <li>
              <a href={business.phoneHref} className="flex items-center gap-3 text-chrome transition-colors hover:text-white">
                <Phone className="size-4 text-red-bright" aria-hidden /> {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="flex items-center gap-3 break-all text-chrome transition-colors hover:text-white">
                <Mail className="size-4 shrink-0 text-red-bright" aria-hidden /> {business.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-chrome">
              <MapPin className="mt-1 size-4 shrink-0 text-red-bright" aria-hidden /> {business.serviceArea}
            </li>
          </ul>
          {business.social.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-3">
              {business.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-steel underline-offset-4 hover:text-white hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-3 border-t border-white/10 px-4 pt-6 text-sm text-steel sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          &copy; <CurrentYear /> {business.name} All rights reserved.
        </p>
        <Link href="/privacy" className="hover:text-white">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
