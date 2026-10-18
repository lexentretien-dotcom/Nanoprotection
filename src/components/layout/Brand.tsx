import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";

/**
 * Brand lockup: the mark from the supplied logo plus a live-text wordmark,
 * so the name stays crisp, searchable and correct if the legal name changes.
 */
export function Brand({
  locale,
  nav,
  inverted = false,
}: {
  locale: Locale;
  nav: Dict["ui"]["nav"];
  inverted?: boolean;
}) {
  return (
    <Link
      href={localePath(locale, "/")}
      aria-label={nav.homeAria}
      className="flex min-h-11 min-w-0 shrink items-center gap-2 whitespace-nowrap sm:gap-3"
    >
      <Image
        src="/brand/logo-icon.png"
        alt=""
        width={56}
        height={27}
        priority
        className="h-auto w-10 shrink-0 sm:w-14"
      />
      <span className={`font-display leading-[1.05] ${inverted ? "text-white" : "text-ink"}`}>
        <span className="block text-[10px] font-medium uppercase tracking-[0.18em] opacity-70 sm:text-[11px]">
          {nav.brandTop}
        </span>
        <span className="block text-[15px] font-bold tracking-tight sm:text-[17px]">
          {nav.brandMain} <span className="font-semibold opacity-70">{nav.brandSub}</span>
        </span>
      </span>
    </Link>
  );
}
