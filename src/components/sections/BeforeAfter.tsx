"use client";

import Image from "next/image";
import { useState } from "react";
import { fmt } from "@/i18n/format";
import { useI18n } from "@/i18n/provider";

/**
 * Before/after comparison. The native range input gives mouse, touch and
 * keyboard (arrow keys, Home/End) support and a screen-reader value.
 * Only use with real, dated project photographs.
 */
export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const { ui } = useI18n();
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-[1.5rem] bg-ink/10 focus-within:ring-4 focus-within:ring-accent">
      <Image src={after} alt={afterAlt} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={beforeAlt} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
      </div>
      <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white">
        {ui.beforeAfter.before}
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white">
        {ui.beforeAfter.after}
      </span>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgb(11_18_48/0.3)]"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={ui.beforeAfter.slider}
        aria-valuetext={fmt(ui.beforeAfter.valueText, { n: pos })}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
