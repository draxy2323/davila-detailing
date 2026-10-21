import { Plus } from "lucide-react";
import { faqs } from "@/content/site";
import { SectionHeading } from "../SectionHeading";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-ink py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          title={
            <>
              Questions? <span className="chrome-text">We&rsquo;ve got answers.</span>
            </>
          }
          intro="Can't find what you're looking for? Call us at (609) 613-3772 — we're happy to help."
        />

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((f, i) => (
            <details key={f.question} className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl font-bold uppercase tracking-wide text-white transition-colors hover:text-red-bright sm:text-2xl [&::-webkit-details-marker]:hidden">
                {f.question}
                <span className="flex size-9 shrink-0 items-center justify-center border border-white/20 transition-colors duration-300 group-open:border-red group-open:bg-red">
                  <Plus className="size-5 transition-transform duration-300 group-open:rotate-45" aria-hidden />
                </span>
              </summary>
              <p className="pb-6 pr-12 text-steel">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
