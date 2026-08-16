"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { PilotLink } from "@/components/landing/PilotLink";
import { CTA, NAV } from "@/content/landing";

function sectionHref(pathname: string, hash: string): string {
  return pathname === "/" ? hash : `/${hash}`;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function closeMenu() {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper-bright/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center gap-4 px-4 sm:px-6">
        <span onClick={closeMenu}>
          <Logo />
        </span>
        <nav aria-label="Glavna" className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={sectionHref(pathname, item.href)}
              className="rounded-sm px-3 py-2 text-sm font-semibold text-navy hover:text-orange-dark"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <PilotLink
          className="ml-auto inline-flex items-center justify-center rounded-sm bg-orange px-3 py-2 text-sm font-bold text-navy hover:bg-orange-dark lg:ml-3"
          onClick={closeMenu}
        >
          {CTA.earlyAccess}
        </PilotLink>
        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-navy text-navy lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Zatvori izbornik" : "Otvori izbornik"}</span>
          <span aria-hidden="true" className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 bg-current ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
      {open ? (
        <div
          ref={panelRef}
          id={menuId}
          className="border-t border-line bg-paper-bright px-4 py-4 lg:hidden"
        >
          <nav aria-label="Mobilna" className="flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={sectionHref(pathname, item.href)}
                className="rounded-sm px-2 py-3 text-base font-semibold text-navy"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
