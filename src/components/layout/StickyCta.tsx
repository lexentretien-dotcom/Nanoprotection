"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "@phosphor-icons/react";
import { business } from "@/config/business";
import { track } from "@/lib/analytics";

/** Mobile-only bar. Hidden on the quote pages where the form is already the CTA. */
export function StickyCta() {
  const pathname = usePathname();
  if (pathname.startsWith("/estimation") || pathname.startsWith("/contact") || pathname.startsWith("/merci")) {
    return null;
  }
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-paper/92 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2">
        <a
          href={`tel:${business.phone.href}`}
          onClick={() => track("phone_click", { placement: "sticky" })}
          aria-label={`Appeler le ${business.phone.display}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface ring-1 ring-ink/15"
        >
          <Phone size={20} weight="light" />
        </a>
        <Link
          href={business.cta.href}
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-accent px-4 text-[15px] font-semibold text-white active:scale-[0.98]"
        >
          {business.cta.label}
        </Link>
      </div>
    </div>
  );
}
