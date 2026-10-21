import { CalendarCheck, ClipboardList, Sparkles } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { QuoteLink } from "../QuoteLink";

const steps = [
  {
    icon: ClipboardList,
    title: "Request Your Quote",
    text: "Tell us about your vehicle and the service you need.",
  },
  {
    icon: CalendarCheck,
    title: "Arrange Your Appointment",
    text: "Coordinate a suitable time and location.",
  },
  {
    icon: Sparkles,
    title: "Enjoy the Results",
    text: "Enjoy a cleaner, better-presented vehicle.",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="relative bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="how-title"
          align="center"
          eyebrow="How it works"
          title={
            <>
              Three steps to a <span className="chrome-text">cleaner ride.</span>
            </>
          }
        />

        <ol className="relative mt-16 grid gap-6 md:grid-cols-3 md:gap-0">
          {/* connecting line on desktop */}
          <span
            aria-hidden
            className="absolute left-[16.6%] right-[16.6%] top-12 hidden h-0.5 bg-gradient-to-r from-red via-chrome/40 to-red md:block"
          />
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 120} className="relative flex flex-col items-center px-6 text-center">
              <div className="relative flex size-24 items-center justify-center rounded-full bg-ink">
                <span className="absolute inset-0 rounded-full bg-gradient-to-b from-chrome/70 to-chrome/10 p-px">
                  <span className="block size-full rounded-full bg-coal" />
                </span>
                <Icon className="relative size-9 text-white" aria-hidden strokeWidth={1.5} />
                <span className="absolute -right-1 -top-1 flex size-9 items-center justify-center rounded-full bg-red font-display text-lg font-bold text-white shadow-[0_6px_18px_rgba(225,6,0,0.45)]">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold uppercase tracking-wide text-white">{title}</h3>
              <p className="mt-2 max-w-xs text-steel">{text}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-14 text-center">
          <QuoteLink className="btn btn-red">Start with step one</QuoteLink>
        </div>
      </div>
    </section>
  );
}
