"use client";

import { useId, useState } from "react";
import { fmt } from "@/i18n/format";

type Step = { title: string; text: string; note: string };

/** Accessible tab pattern: arrow keys move between stages. */
export function ProcessSteps({
  steps,
  label,
  stepOf,
}: {
  steps: Step[];
  label: string;
  stepOf: string;
}) {
  const [active, setActive] = useState(0);
  const id = useId();

  function onKey(e: React.KeyboardEvent, i: number) {
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % steps.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + steps.length) % steps.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = steps.length - 1;
    else return;
    e.preventDefault();
    setActive(n);
    document.getElementById(`${id}-tab-${n}`)?.focus();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
      <div role="tablist" aria-label={label} className="flex flex-col gap-2 lg:col-span-5">
        {steps.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.title}
              id={`${id}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${id}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`flex min-h-14 items-center gap-4 rounded-2xl p-4 text-left transition-[background-color,box-shadow,transform] duration-500 active:scale-[0.99] active:duration-75 ${
                on ? "bg-surface shadow-[var(--shadow-soft)] ring-1 ring-ink/10" : "hover:bg-ink/[0.04]"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-base font-bold transition-colors duration-500 ${
                  on ? "bg-accent text-white" : "bg-ink/[0.07] text-ink"
                }`}
              >
                {i + 1}
              </span>
              <span className="font-display text-xl font-semibold tracking-tight">{s.title}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
        className="rounded-[2rem] bg-ink/[0.04] p-1.5 ring-1 ring-ink/[0.07] lg:col-span-7"
      >
        <div
          key={active}
          className="min-h-[18rem] rounded-[calc(2rem-0.375rem)] bg-surface p-8 sm:p-12 motion-safe:animate-[stepIn_0.6s_cubic-bezier(0.32,0.72,0,1)]"
        >
          <p className="font-display text-sm font-semibold text-accent">
            {fmt(stepOf, { n: active + 1, total: steps.length })}
          </p>
          <h3 className="mt-3 text-3xl font-bold sm:text-4xl">{steps[active].title}</h3>
          <p className="mt-5 max-w-xl text-lg text-muted">{steps[active].text}</p>
          <p className="mt-6 inline-block rounded-full bg-accent-tint px-4 py-1.5 text-sm font-semibold text-accent-strong">
            {steps[active].note}
          </p>
        </div>
      </div>
      <style>{`@keyframes stepIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
