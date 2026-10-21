import { Armchair, Camera, CarFront, Droplets, Plus, type LucideIcon } from "lucide-react";

const variants: Record<string, { bg: string; icon: LucideIcon; tone: string }> = {
  interior: {
    bg: "radial-gradient(90% 80% at 75% 20%, rgba(225,6,0,0.55), transparent 60%), linear-gradient(155deg, #3a0f0c 0%, #140707 45%, #060606 100%)",
    icon: Armchair,
    tone: "text-white/85",
  },
  exterior: {
    bg: "radial-gradient(80% 70% at 25% 15%, rgba(217,221,226,0.35), transparent 60%), linear-gradient(160deg, #2b3036 0%, #121417 50%, #050505 100%)",
    icon: CarFront,
    tone: "text-chrome",
  },
  "ceramic-coating": {
    bg: "radial-gradient(70% 70% at 50% 0%, rgba(255,42,31,0.6), transparent 65%), linear-gradient(170deg, #4a0a08 0%, #1a0404 50%, #050505 100%)",
    icon: Droplets,
    tone: "text-white/85",
  },
  other: {
    bg: "radial-gradient(80% 80% at 80% 80%, rgba(225,6,0,0.4), transparent 60%), linear-gradient(140deg, #202020 0%, #0d0d0d 60%, #050505 100%)",
    icon: Plus,
    tone: "text-chrome",
  },
  before: {
    bg: "radial-gradient(90% 80% at 30% 20%, rgba(170,150,120,0.28), transparent 60%), linear-gradient(160deg, #3a3631 0%, #1f1d1a 55%, #121110 100%)",
    icon: Camera,
    tone: "text-[#b9b0a3]",
  },
  after: {
    bg: "radial-gradient(90% 80% at 70% 15%, rgba(255,42,31,0.6), transparent 60%), linear-gradient(160deg, #470b08 0%, #170505 55%, #050505 100%)",
    icon: Camera,
    tone: "text-white/90",
  },
};

export type PlaceholderVariant = "interior" | "exterior" | "ceramic-coating" | "other" | "before" | "after";

/**
 * Fills its (positioned) parent. Stand-in for a real photo. Always labelled so it is never mistaken for
 * completed work. Swap in real photos via src/content/site.ts.
 */
export function PhotoPlaceholder({
  variant,
  label,
  note = "Placeholder — add your own photo",
  showIcon = true,
  className = "",
}: {
  variant: PlaceholderVariant;
  label: string;
  /** null hides the caption (e.g. when the parent shows its own label). */
  note?: string | null;
  showIcon?: boolean;
  className?: string;
}) {
  const v = variants[variant];
  const Icon = v.icon;
  const glossy = variant !== "before";
  return (
    <div
      role="img"
      aria-label={`${label} — placeholder image, real photo coming soon`}
      className={`absolute inset-0 isolate overflow-hidden ${className}`}
      style={{ background: v.bg }}
    >
      <div className="carbon absolute inset-0 opacity-25 mix-blend-overlay !bg-transparent" aria-hidden />
      {glossy && (
        <>
          {/* Studio light reflections on glossy paint */}
          <div aria-hidden className="absolute -inset-x-1/4 top-[30%] h-[40%] -rotate-12 bg-gradient-to-b from-white/0 via-white/[0.09] to-white/0" />
          <div aria-hidden className="absolute -inset-x-10 top-[62%] h-px -rotate-12 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </>
      )}
      {!glossy && (
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.35) 0 2px, transparent 3px), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.3) 0 1.5px, transparent 2.5px)",
            backgroundSize: "23px 19px, 31px 27px",
          }}
        />
      )}
      {showIcon && (
        <div aria-hidden className="absolute inset-0 flex items-center justify-center pb-6">
          <Icon className={`size-16 opacity-80 drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)] sm:size-20 ${v.tone}`} strokeWidth={1.1} />
        </div>
      )}
      {note && (
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-10 text-[0.8rem] font-medium tracking-wide text-chrome/85">
          <Camera className="size-4 shrink-0" aria-hidden />
          <span>{note}</span>
        </div>
      )}
    </div>
  );
}
