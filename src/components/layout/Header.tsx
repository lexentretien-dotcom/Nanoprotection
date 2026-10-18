"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { Brand } from "./Brand";
import { ButtonLink } from "@/components/ui/Button";
import { business } from "@/config/business";
import { useI18n } from "@/i18n/provider";
import { localePath, parsePathname, switchPath } from "@/i18n/config";

export function Header() {
  const { locale, ui } = useI18n();
  const pathname = usePathname();
  const { path: currentPath } = parsePathname(pathname);
  const other = locale === "fr" ? "en" : "fr";
  const switchHref = switchPath(pathname, other);

  // The menu is "open" only for the page it was opened on, so navigating closes it.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenFor(null);
    window.addEventListener("keydown", onKey);

    // Move focus into the menu when it opens; give it back to the button when it closes.
    if (open) {
      panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    } else if (wasOpen.current) {
      buttonRef.current?.focus();
    }
    wasOpen.current = open;

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const langLink = (
    <Link
      href={switchHref}
      hrefLang={other === "fr" ? "fr-CA" : "en-CA"}
      lang={other}
      aria-label={ui.nav.language.aria}
      className="flex h-11 min-w-11 items-center justify-center rounded-full bg-surface px-3 text-[13px] font-bold tracking-wide ring-1 ring-ink/15 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-ink/40 active:scale-95 active:duration-75"
    >
      {ui.nav.language.short}
    </Link>
  );

  return (
    <>
      <header className="material sticky top-0 z-40">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          {ui.nav.skip}
        </a>
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Brand locale={locale} nav={ui.nav} />

          <nav aria-label={ui.nav.main} className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {ui.nav.items.map((item) => {
                const active = currentPath.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={localePath(locale, item.href)}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3.5 text-[14.5px] font-medium transition-colors duration-300 ${
                        active
                          ? "bg-ink/[0.06] text-ink"
                          : "text-ink-soft hover:bg-ink/[0.05] hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {langLink}
            <div className="hidden xl:block">
              <ButtonLink href={localePath(locale, business.ctaPath)} className="!px-5 !py-2.5">
                {ui.cta.primary}
              </ButtonLink>
            </div>
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setOpenFor(open ? null : pathname)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? ui.nav.close : ui.nav.open}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-surface ring-1 ring-ink/15 transition-transform duration-300 active:scale-95 active:duration-75 xl:hidden"
            >
              {open ? <X size={20} weight="light" /> : <List size={20} weight="light" />}
            </button>
          </div>
        </div>
      </header>

      {/* Outside <header>: backdrop-filter would make the header the containing block of this fixed panel. */}
      <div
        id="menu-mobile"
        ref={panelRef}
        data-open={open}
        inert={!open}
        className="menu-panel fixed inset-x-0 bottom-0 top-[72px] z-30 overflow-y-auto bg-paper px-4 pb-10 pt-6 xl:hidden"
      >
        <nav aria-label={ui.nav.mobile}>
          <ul className="flex flex-col">
            {[...ui.nav.items, ...ui.nav.extra].map((item, i) => (
              <li
                key={item.href}
                className="menu-item border-b border-ink/[0.07]"
                style={{ ["--i" as string]: i }}
              >
                <Link
                  href={localePath(locale, item.href)}
                  className="block py-4 font-display text-2xl font-semibold tracking-tight"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <ButtonLink href={localePath(locale, business.ctaPath)} className="w-full">
            {ui.cta.primary}
          </ButtonLink>
          <ButtonLink
            href={`tel:${business.phone.href}`}
            variant="secondary"
            className="w-full"
            arrow={false}
          >
            {ui.cta.call} {business.phone.display}
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
