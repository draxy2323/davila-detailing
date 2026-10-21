import { CalendarClock, Gem, House, ShieldCheck } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { QuoteLink } from "../QuoteLink";

const points = [
  {
    icon: House,
    title: "We come to you.",
    text: "Your driveway becomes the detail shop. No dropping the car off, no arranging a ride, no losing half a day.",
  },
  {
    icon: CalendarClock,
    title: "Convenient service at a suitable location.",
    text: "Home or another suitable spot — we work around your schedule and confirm the details before we arrive.",
  },
  {
    icon: ShieldCheck,
    title: "Interior, exterior & paint protection.",
    text: "One call covers a fresh cabin, a clean, glossy exterior, or ceramic coating for longer-lasting protection.",
  },
  {
    icon: Gem,
    title: "Careful attention to detail.",
    text: "We take our time on the areas that matter, so your vehicle looks and feels properly cared for.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative isolate overflow-hidden bg-coal py-24 lg:py-32">
      <div aria-hidden className="carbon absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden
        className="absolute -right-40 top-0 -z-10 h-full w-[60%] skew-x-[-18deg] bg-gradient-to-l from-red/15 to-transparent"
      />
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="about-title"
            eyebrow="Why Davila Detailing Co."
            title={
              <>
                Your time matters. <span className="chrome-text">Let us handle the details.</span>
              </>
            }
            intro="Davila Detailing Co. is a mobile detailing business serving Mercer County, New Jersey, and surrounding areas. We built our service around one idea: professional detailing should fit into your life — not the other way around."
          />
          <Reveal delay={120} className="mt-8">
            <QuoteLink className="btn btn-red">Get a Free Quote</QuoteLink>
          </Reveal>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {points.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 90}>
              <div className="h-full border border-white/10 bg-ink/70 p-7 backdrop-blur-sm transition-colors duration-300 notch hover:border-red/50">
                <Icon className="size-8 text-red-bright" aria-hidden strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-2xl font-bold uppercase leading-tight tracking-wide text-white">
                  {title}
                </h3>
                <p className="mt-3 text-steel">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
