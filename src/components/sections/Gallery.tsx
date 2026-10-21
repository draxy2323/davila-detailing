"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { Camera, Info, MoveHorizontal } from "lucide-react";
import { gallery, galleryCategories, type GalleryCategory, type GalleryItem, type SiteImage } from "@/content/site";
import { PhotoPlaceholder } from "../PhotoPlaceholder";
import { SectionHeading } from "../SectionHeading";

type Filter = GalleryCategory | "all";

function Pane({ image, variant, label }: { image: SiteImage | null; variant: "before" | "after"; label: string }) {
  return image ? (
    <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
  ) : (
    <PhotoPlaceholder
      variant={variant}
      label={label}
      note={null}
      showIcon={false}
    />
  );
}

function BeforeAfter({ item }: { item: GalleryItem }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  const category = galleryCategories.find((c) => c.value === item.category)!.label;

  return (
    <figure className="group overflow-hidden border border-white/10 bg-coal notch">
      <div className="relative aspect-[4/3] select-none has-[input:focus-visible]:outline-2 has-[input:focus-visible]:-outline-offset-2 has-[input:focus-visible]:outline-red-bright">
        <Pane image={item.after} variant="after" label={`${item.title} — after`} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Pane image={item.before} variant="before" label={`${item.title} — before`} />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 bg-black/70 px-2 py-1 font-display text-xs font-bold uppercase tracking-[0.2em] text-chrome">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 bg-red px-2 py-1 font-display text-xs font-bold uppercase tracking-[0.2em] text-white">
          After
        </span>

        {(!item.before || !item.after) && (
          <p className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/90 to-transparent px-4 pb-3 pt-10 text-[0.8rem] font-medium tracking-wide text-chrome/90">
            <Camera className="size-4 shrink-0" aria-hidden /> Placeholder — before &amp; after photos coming soon
          </p>
        )}

        {/* Divider + handle */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.6)]" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg">
            <MoveHorizontal className="size-5" />
          </span>
        </div>

        <label htmlFor={id} className="sr-only">
          Compare before and after: {item.title}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
          aria-valuetext={`${pos}% before`}
        />
      </div>
      <figcaption className="flex items-center justify-between gap-3 px-5 py-4">
        <span className="font-display text-lg font-bold uppercase tracking-wide text-white">{item.title}</span>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-bright">{category}</span>
      </figcaption>
    </figure>
  );
}

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const items = filter === "all" ? gallery : gallery.filter((g) => g.category === filter);
  const usingPlaceholders = gallery.some((g) => !g.before || !g.after);

  const filters: { value: Filter; label: string }[] = [{ value: "all", label: "All" }, ...galleryCategories];

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-ink pb-24 pt-4 lg:pb-32 lg:pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="gallery-title"
            eyebrow="Before & After"
            title={
              <>
                The difference is <span className="chrome-text">in the details.</span>
              </>
            }
            intro="Drag the slider to compare. Browse by interior, exterior and ceramic coating."
          />
          <div role="group" aria-label="Filter gallery" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                aria-pressed={filter === f.value}
                onClick={() => setFilter(f.value)}
                className={`min-h-11 px-4 font-display text-base font-semibold uppercase tracking-[0.12em] transition-colors ${
                  filter === f.value
                    ? "bg-red text-white"
                    : "bg-white/[0.04] text-chrome ring-1 ring-inset ring-white/15 hover:bg-white/10 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {usingPlaceholders && (
          <p className="mt-8 flex items-start gap-2 border-l-2 border-red bg-white/[0.03] px-4 py-3 text-sm text-steel">
            <Info className="mt-0.5 size-4 shrink-0 text-red-bright" aria-hidden />
            Gallery photos of our own work are coming soon. The panels below are placeholders, not completed jobs.
          </p>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {items.map((item) => (
            <BeforeAfter key={`${item.category}-${item.title}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
