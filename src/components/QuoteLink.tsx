"use client";

import type { ReactNode } from "react";

export const QUOTE_SELECT_EVENT = "davila:select-service";

/**
 * Link to the quote form. Works without JavaScript (plain anchor); with JS it
 * also preselects `service` in the form and moves focus to the form.
 */
export function QuoteLink({
  service,
  className,
  children,
  onNavigate,
  ...rest
}: {
  service?: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  const href = service ? `/?service=${service}#quote` : "/#quote";

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onNavigate?.();
        const url = new URL(window.location.href);
        if (service) url.searchParams.set("service", service);
        url.hash = "quote";
        history.replaceState(null, "", url);
        window.dispatchEvent(new CustomEvent(QUOTE_SELECT_EVENT, { detail: service ?? null }));
        const target = document.getElementById("quote");
        target?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        // Focus the first field without fighting the smooth scroll.
        window.setTimeout(() => document.getElementById("quote-name")?.focus({ preventScroll: true }), 450);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
