"use client";

import { useId, useState } from "react";

const steps = [
  {
    title: "Inspection",
    text: "Un technicien monte sur le toit, examine les bardeaux, le pontage visible et les solins, puis prend des photos. Vous recevez une explication claire de ce qu'il observe.",
    note: "Gratuite et sans obligation.",
  },
  {
    title: "Recommandation",
    text: "Nous séparons trois choses: ce qui doit être réparé, ce qui peut être préservé et ce qui doit être remplacé. Si le remplacement est la bonne décision, nous vous le disons.",
    note: "Remise par écrit.",
  },
  {
    title: "Traitement",
    text: "Après les réparations mineures et le nettoyage, le produit adapté à votre toiture est appliqué par un technicien formé. La durée dépend de la superficie et de la météo.",
    note: "Généralement en une journée pour une maison typique.",
  },
  {
    title: "Suivi",
    text: "Vous recevez les documents liés à votre produit et à vos conditions de garantie, s'il y a lieu. Nous recommandons ensuite une vérification périodique de la toiture.",
    note: "Les conditions exactes sont fournies par écrit.",
  },
];

/** Accessible tab pattern: arrow keys move between stages. */
export function ProcessSteps() {
  const [active, setActive] = useState(0);
  const id = useId();

  function onKey(e: React.KeyboardEvent, i: number) {
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % steps.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + steps.length) % steps.length;
    else return;
    e.preventDefault();
    setActive(n);
    document.getElementById(`${id}-tab-${n}`)?.focus();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
      <div role="tablist" aria-label="Étapes du processus" className="flex flex-col gap-2 lg:col-span-5">
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
              className={`flex items-center gap-4 rounded-2xl p-4 text-left transition-[background-color,box-shadow] duration-500 ${
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
        <div key={active} className="min-h-[18rem] rounded-[calc(2rem-0.375rem)] bg-surface p-8 sm:p-12 motion-safe:animate-[stepIn_0.6s_cubic-bezier(0.32,0.72,0,1)]">
          <p className="font-display text-sm font-semibold text-accent">
            Étape {active + 1} sur {steps.length}
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
