"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { business, logo, navLinks } from "@/content/site";
import { QuoteLink } from "./QuoteLink";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, keep focus inside, restore focus on close.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>("a,button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      toggle?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open
          ? "bg-ink/90 shadow-[0_1px_0_rgba(217,221,226,0.08),0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
          : "bg-gradient-to-b from-ink/80 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/#home" className="relative shrink-0" onClick={close} aria-label={`${business.name} — home`}>
          <Image
            src={logo.src}
            alt=""
            width={logo.width}
            height={logo.height}
            sizes="120px"
            preload
            className="h-14 w-auto lg:h-[4.25rem]"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative px-4 py-2 font-display text-[1.05rem] font-semibold uppercase tracking-[0.14em] text-chrome transition-colors hover:text-white"
                >
                  {l.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-300 group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={business.phoneHref}
            className="hidden items-center gap-2 font-display text-lg font-semibold tracking-wider text-white transition-colors hover:text-red-bright xl:flex"
          >
            <Phone className="size-4 text-red" aria-hidden />
            {business.phoneDisplay}
          </a>
          <QuoteLink className="btn btn-red hidden !min-h-11 !px-5 !text-[0.95rem] sm:inline-flex">Get a Free Quote</QuoteLink>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-12 items-center justify-center rounded-md text-white ring-1 ring-white/15 transition hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-ink lg:hidden"
      >
        <nav aria-label="Mobile" className="carbon flex min-h-full flex-col px-6 pb-10 pt-6">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href} className="border-b border-white/10">
                <a
                  href={l.href}
                  onClick={close}
                  className="flex items-center justify-between py-4 font-display text-3xl font-bold uppercase tracking-wide text-white transition-colors hover:text-red-bright"
                >
                  {l.label}
                  <span aria-hidden className="h-0.5 w-6 bg-red" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <QuoteLink className="btn btn-red w-full" onNavigate={close}>
              Get a Free Quote
            </QuoteLink>
            <a href={business.phoneHref} className="btn btn-ghost w-full">
              <Phone className="size-5" aria-hidden /> Call {business.phoneDisplay}
            </a>
          </div>
          <p className="mt-auto pt-10 text-center font-display text-lg uppercase tracking-[0.2em] text-steel">
            {business.tagline}
          </p>
        </nav>
      </div>
    </header>
  );
}
