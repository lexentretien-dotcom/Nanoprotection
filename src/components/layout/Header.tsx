"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { Brand } from "./Brand";
import { ButtonLink } from "@/components/ui/Button";
import { business } from "@/config/business";

const nav = [
  { href: "/nos-traitements", label: "Traitements" },
  { href: "/technologie-gonano", label: "Technologie" },
  { href: "/nos-produits", label: "Produits" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/conseils", label: "Conseils" },
  { href: "/a-propos", label: "À propos" },
];

export function Header() {
  const pathname = usePathname();
  // The menu is "open" only for the page it was opened on, so navigating closes it.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const setOpen = (next: boolean | ((v: boolean) => boolean)) => {
    const value = typeof next === "function" ? next(open) : next;
    setOpenFor(value ? pathname : null);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenFor(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-ink/[0.06] bg-paper/85 backdrop-blur-xl">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Passer au contenu
      </a>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Brand />

        <nav aria-label="Navigation principale" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors duration-300 ${
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

        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <ButtonLink href={business.cta.href} className="!px-5 !py-2.5">
              {business.cta.label}
            </ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-surface ring-1 ring-ink/15 transition-transform duration-300 active:scale-95 xl:hidden"
          >
            {open ? <X size={20} weight="light" /> : <List size={20} weight="light" />}
          </button>
        </div>
      </div>
    </header>

      {/* Outside <header>: backdrop-filter would make the header the containing block of this fixed panel. */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-paper px-4 pb-10 pt-6 xl:hidden"
      >
        <nav aria-label="Navigation mobile">
          <ul className="flex flex-col">
            {[...nav, { href: "/faq", label: "Questions fréquentes" }, { href: "/contact", label: "Contact" }].map(
              (item, i) => (
                <li
                  key={item.href}
                  className="border-b border-ink/[0.07]"
                  style={{
                    animation: open
                      ? `menuIn 0.6s cubic-bezier(0.32,0.72,0,1) ${i * 50}ms both`
                      : undefined,
                  }}
                >
                  <Link
                    href={item.href}
                    className="block py-4 font-display text-2xl font-semibold tracking-tight"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <ButtonLink href={business.cta.href} className="w-full">
            {business.cta.label}
          </ButtonLink>
          <ButtonLink href={`tel:${business.phone.href}`} variant="secondary" className="w-full" arrow={false}>
            Appeler le {business.phone.display}
          </ButtonLink>
        </div>
      </div>
      <style>{`@keyframes menuIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){#menu-mobile li{animation:none!important}}`}</style>
    </>
  );
}
