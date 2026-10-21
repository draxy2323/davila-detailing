import { Car, MapPinHouse, ScanSearch, Sparkles } from "lucide-react";
import { Reveal } from "../Reveal";

const items = [
  {
    icon: Car,
    title: "Mobile Convenience",
    text: "No drop-offs, no waiting rooms. We bring professional detailing to you.",
  },
  {
    icon: Sparkles,
    title: "Interior & Exterior Care",
    text: "From the cabin you sit in to the paint everyone sees — inside and out.",
  },
  {
    icon: ScanSearch,
    title: "Attention to Detail",
    text: "Careful, hands-on work on the areas that make a vehicle look truly clean.",
  },
  {
    icon: MapPinHouse,
    title: "Service at Your Location",
    text: "At home or another suitable spot across Mercer County and nearby areas.",
  },
];

export function Benefits() {
  return (
    <section aria-label="Why customers choose mobile detailing" className="relative border-y border-white/8 bg-coal">
      <div className="mx-auto grid max-w-7xl gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 80} className="group relative bg-coal px-6 py-10 sm:px-8 lg:py-12">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100"
            />
            <span className="inline-flex size-12 items-center justify-center bg-gradient-to-br from-red to-red-deep text-white shadow-[0_8px_24px_rgba(225,6,0,0.35)] notch">
              <Icon className="size-6" aria-hidden strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-wide text-white">{title}</h3>
            <p className="mt-2 text-steel">{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
