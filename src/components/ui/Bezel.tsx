import type { ReactNode } from "react";

/**
 * Double-bezel container: an outer tray with a hairline ring and an inner
 * core with a concentric radius. Radii: shell 2rem, core calc(2rem - 0.375rem).
 */
export function Bezel({
  children,
  className = "",
  coreClassName = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  coreClassName?: string;
  as?: "div" | "article" | "section" | "li";
}) {
  return (
    <Tag
      className={`rounded-[2rem] bg-ink/[0.04] p-1.5 ring-1 ring-ink/[0.07] ${className}`}
    >
      <div
        className={`h-full rounded-[calc(2rem-0.375rem)] bg-surface shadow-[inset_0_1px_1px_rgb(255_255_255/0.9)] ${coreClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
}
