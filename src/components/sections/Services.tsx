import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/content/site";
import { PhotoPlaceholder } from "../PhotoPlaceholder";
import { QuoteLink } from "../QuoteLink";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title={
            <>
              Mobile detailing, <span className="chrome-text">done right.</span>
            </>
          }
          intro="Interior car detailing, exterior car detailing and ceramic coating — performed at your home or another suitable location in Mercer County, NJ, and surrounding areas."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 100} as="article" className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden border border-white/10 bg-coal transition-[border-color,transform,box-shadow] duration-300 notch hover:-translate-y-1 hover:border-red/60 hover:shadow-[0_24px_60px_-20px_rgba(225,6,0,0.45)]">
                <div className="relative aspect-[16/9] overflow-hidden">
                  {s.image ? (
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <PhotoPlaceholder variant={s.slug} label={s.title} />
                  )}
                  <span className="absolute left-0 top-5 bg-red px-3 py-1 font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="font-display text-3xl font-bold uppercase tracking-wide text-white">{s.title}</h3>
                  <p className="mt-3 text-steel">{s.description}</p>
                  <ul className="mt-5 grid gap-2 text-chrome">
                    {s.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Check className="mt-1 size-4 shrink-0 text-red-bright" aria-hidden />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                    {s.price ? (
                      <p className="font-display text-xl font-semibold uppercase tracking-wider text-white">{s.price}</p>
                    ) : (
                      <p className="text-sm text-steel">Pricing provided with your free quote</p>
                    )}
                    <QuoteLink service={s.slug} className="btn btn-red group/btn" aria-label={`Request a quote for ${s.title}`}>
                      Request a Quote
                      <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" aria-hidden />
                    </QuoteLink>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
