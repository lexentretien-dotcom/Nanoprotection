"use client";

import type { ReactNode } from "react";
import { track, type TrackEvent } from "@/lib/analytics";

export function TrackedLink({
  href,
  event,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  event: TrackEvent;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={() => track(event, { href })}
    >
      {children}
    </a>
  );
}
