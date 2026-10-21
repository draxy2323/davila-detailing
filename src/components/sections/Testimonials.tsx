import { Quote } from "lucide-react";
import { testimonials } from "@/content/site";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

/**
 * Shows only real reviews from src/content/site.ts. With no reviews, the
 * section is hidden in production and shown as a labelled placeholder in
 * development so you can see where it will appear.
 */
export function Testimonials() {
  const isDev = process.env.NODE_ENV !== "production";
  if (testimonials.length === 0 && !isDev) return null;

  return (
    <section aria-labelledby="reviews-title" className="relative bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="reviews-title" eyebrow="Customer reviews" title="What our customers say." />

        {testimonials.length === 0 ? (
          <div className="mt-12 border border-dashed border-red/50 bg-red/5 p-8 text-center">
            <p className="font-display text-xl font-bold uppercase tracking-wider text-red-bright">
              Development placeholder — not visible on the live site
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-steel">
              Add genuine customer reviews (with permission) to <code className="text-chrome">testimonials</code> in{" "}
              <code className="text-chrome">src/content/site.ts</code> and this section will appear automatically.
            </p>
          </div>
        ) : (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal as="li" key={i} delay={i * 80}>
                <figure className="flex h-full flex-col border border-white/10 bg-coal p-7 notch">
                  <Quote className="size-8 text-red" aria-hidden />
                  <blockquote className="mt-4 flex-1 text-lg text-chrome">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-6 border-t border-white/10 pt-4">
                    <span className="font-display text-lg font-bold uppercase tracking-wide text-white">{t.name}</span>
                    {(t.vehicle || t.source) && (
                      <span className="block text-sm text-steel">{[t.vehicle, t.source].filter(Boolean).join(" · ")}</span>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
