import { FileText, Phone } from "lucide-react";
import { business } from "@/content/site";
import { QuoteLink } from "./QuoteLink";

/** Always-reachable call + quote actions on small screens. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-white/10 bg-ink/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <a href={business.phoneHref} className="btn btn-ghost !min-h-12 !px-3 !text-base" aria-label={`Call ${business.phoneDisplay}`}>
        <Phone className="size-5 text-red-bright" aria-hidden /> Call Now
      </a>
      <QuoteLink className="btn btn-red !min-h-12 !px-3 !text-base">
        <FileText className="size-5" aria-hidden /> Free Quote
      </QuoteLink>
    </div>
  );
}
