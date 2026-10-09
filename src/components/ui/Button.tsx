import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-[15px] font-semibold whitespace-nowrap transition-[transform,background-color,box-shadow,color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_10px_30px_-12px_rgb(90_44_245/0.7)] hover:bg-accent-strong",
  secondary:
    "bg-surface text-ink ring-1 ring-ink/15 hover:ring-ink/40",
  ghost: "text-ink hover:bg-ink/5",
};

export function buttonClasses(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

function Arrow({ variant }: { variant: Variant }) {
  const tone =
    variant === "primary" ? "bg-white/20" : "bg-ink/8 group-hover:bg-ink/12";
  return (
    <span
      aria-hidden
      className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105 ${tone}`}
    >
      <ArrowUpRight size={16} weight="light" />
    </span>
  );
}

type LinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  arrow = true,
  children,
  ...props
}: LinkProps) {
  return (
    <Link {...props} className={buttonClasses(variant, className)}>
      {children}
      {arrow && <Arrow variant={variant} />}
    </Link>
  );
}
