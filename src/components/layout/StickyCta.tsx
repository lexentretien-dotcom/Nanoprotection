"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "@phosphor-icons/react";
import { business } from "@/config/business";
import { track } from "@/lib/analytics";
import { useI18n } from "@/i18n/provider";
import { localePath, parsePathname } from "@/i18n/config";

/** Mobile-only bar. Hidden on the quote pages where the form is already the CTA. */
export function StickyCta() {
  const { locale, ui } = useI18n();
  const { path } = parsePathname(usePathname());
  if (["/estimation", "/contact", "/merci"].some((p) => path.startsWith(p))) return null;
  return (
    <div className="material fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2">
        <a
          href={`tel:${business.phone.href}`}
          onClick={() => track("phone_click", { placement: "sticky" })}
          aria-label={`${ui.cta.call} ${business.phone.display}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface ring-1 ring-ink/15 transition-transform active:scale-95 active:duration-75"
        >
          <Phone size={20} weight="light" aria-hidden />
        </a>
        <Link
          href={localePath(locale, business.ctaPath)}
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-accent px-4 text-[15px] font-semibold text-white transition-transform active:scale-[0.97] active:duration-75"
        >
          {ui.cta.primary}
        </Link>
      </div>
    </div>
  );
}
