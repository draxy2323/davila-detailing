import { ArrowRight, Phone } from "lucide-react";
import { business } from "@/content/site";
import { QuoteLink } from "../QuoteLink";
import { Reveal } from "../Reveal";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="relative isolate overflow-hidden bg-red-deep py-24 lg:py-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,#050505_0%,#050505_38%,#a30400_38.2%,#e10600_70%,#ff2a1f_100%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent motion-safe:animate-[sheen_6s_ease-in-out_infinite]" />
      </div>

      <Reveal className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 id="final-cta-title" className="display text-balance text-5xl text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] sm:text-6xl lg:text-7xl">
          Your vehicle deserves better.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-xl text-white/90">
          Let Davila Detailing Co. bring professional mobile detailing to your location.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <QuoteLink className="btn btn-chrome group text-lg">
            Get a Free Quote <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
          </QuoteLink>
          <a href={business.phoneHref} className="btn text-lg text-white ring-0 [background:rgba(5,5,5,0.85)] hover:[background:#050505]">
            <Phone className="size-5 text-red-bright" aria-hidden /> Call {business.phoneDisplay}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
