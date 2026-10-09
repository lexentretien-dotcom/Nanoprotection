import Image from "next/image";
import Link from "next/link";

/**
 * Brand lockup: the mark from the supplied logo plus a live-text wordmark,
 * so the name stays crisp, searchable and correct if the legal name changes.
 */
export function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Les Experts Nano Protection Toitures, accueil"
      className="flex shrink-0 items-center gap-3 whitespace-nowrap"
    >
      <Image
        src="/brand/logo-icon.png"
        alt=""
        width={56}
        height={27}
        priority
        className="h-auto w-14"
      />
      <span
        className={`font-display leading-[1.05] ${inverted ? "text-white" : "text-ink"}`}
      >
        <span className="block text-[11px] font-medium uppercase tracking-[0.18em] opacity-70">
          Les Experts
        </span>
        <span className="block text-[17px] font-bold tracking-tight">
          Nano Protection{" "}
          <span className="font-semibold opacity-70">Toitures</span>
        </span>
      </span>
    </Link>
  );
}
