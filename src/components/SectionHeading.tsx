import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  id?: string;
}) {
  const center = align === "center";
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <span className="red-rule" aria-hidden />
        {eyebrow}
      </p>
      <h2 id={id} className="display mt-4 text-balance text-4xl text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg text-steel">{intro}</p>}
    </Reveal>
  );
}
