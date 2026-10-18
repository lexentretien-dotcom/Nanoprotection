"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, Warning } from "@phosphor-icons/react";
import { business } from "@/config/business";
import { track } from "@/lib/analytics";
import { fmt } from "@/i18n/format";
import { useI18n } from "@/i18n/provider";
import { ContactFields, FormStatus, Field, inputClass, emptyContact, type ContactValues } from "./Fields";
import { useLeadSubmit } from "./useLeadSubmit";

type Answers = Record<string, string | string[]>;
type OutcomeKey = "notAsphalt" | "replace" | "repairFirst" | "old" | "good";
const STORE = "nano-assessment-v1";

const tone: Record<OutcomeKey, "good" | "caution" | "stop"> = {
  notAsphalt: "stop",
  replace: "stop",
  repairFirst: "caution",
  old: "caution",
  good: "good",
};

/** Orientation only. Answer codes are language-independent. */
function evaluate(a: Answers): OutcomeKey {
  const signs = (a.signes as string[] | undefined) ?? [];
  const severe = signs.includes("infiltration") || signs.includes("manquants");
  if (a.materiau && a.materiau !== "asphalte") return "notAsphalt";
  if (a.etat === "important" || (severe && (a.age === "plus-25" || a.age === "20-25"))) return "replace";
  if (severe) return "repairFirst";
  if (a.age === "plus-25") return "old";
  return "good";
}

const sizeFactor: Record<string, number> = { petite: 1100, moyenne: 1800, grande: 2800 };

export function Assessment() {
  const { locale, ui } = useI18n();
  const a = ui.assessment;
  const steps = a.steps;
  const numberLocale = locale === "fr" ? "fr-CA" : "en-CA";

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [areaInput, setAreaInput] = useState("");
  const [contact, setContact] = useState<ContactValues>(emptyContact);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { state, submit, onStart, validateField } = useLeadSubmit("assessment");
  const busy = state.status === "submitting";

  const total = steps.length;
  const done = index >= total;

  // Restore saved progress after hydration (asynchronously, to avoid a server/client mismatch).
  const [restored, setRestored] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const raw = sessionStorage.getItem(STORE);
        if (raw) {
          const s = JSON.parse(raw) as { index: number; answers: Answers; area: string };
          setIndex(Math.min(s.index, total));
          setAnswers(s.answers ?? {});
          setAreaInput(s.area ?? "");
        }
      } catch {}
      setRestored(true);
    });
    return () => cancelAnimationFrame(id);
  }, [total]);

  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(STORE, JSON.stringify({ index, answers, area: areaInput }));
    } catch {}
  }, [restored, index, answers, areaInput]);

  // Move focus to the new step heading, but not on first load (it would scroll the page).
  const firstFocus = useRef(true);
  useEffect(() => {
    if (firstFocus.current) {
      firstFocus.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [index]);

  const step = steps[index];
  const outcomeKey = useMemo(() => (done ? evaluate(answers) : null), [done, answers]);
  const outcome = outcomeKey ? a.outcomes[outcomeKey] : null;

  const canNext = step
    ? step.kind === "multi"
      ? ((answers[step.id] as string[] | undefined)?.length ?? 0) > 0
      : Boolean(answers[step.id])
    : true;

  function pick(id: string, value: string, multi: boolean) {
    setAnswers((prev) => {
      if (!multi) return { ...prev, [id]: value };
      const cur = (prev[id] as string[] | undefined) ?? [];
      if (value === "aucun") return { ...prev, [id]: cur.includes("aucun") ? [] : ["aucun"] };
      const next = cur.filter((v) => v !== "aucun");
      return { ...prev, [id]: next.includes(value) ? next.filter((v) => v !== value) : [...next, value] };
    });
  }

  function next() {
    if (index === total - 1) track("assessment_complete", { outcome: tone[evaluate(answers)] });
    setIndex((i) => i + 1);
  }

  /** Human-readable answers (in the visitor's language) for the CRM note. */
  function readableAnswers(): Record<string, string | string[]> {
    const out: Record<string, string | string[]> = {};
    for (const s of steps) {
      const chosen = answers[s.id];
      if (!chosen) continue;
      const labelOf = (v: string) => s.options.find((o) => o.value === v)?.label ?? v;
      out[s.title] = Array.isArray(chosen) ? chosen.map(labelOf) : labelOf(chosen);
    }
    out[a.areaKey] = areaInput || a.areaNotSpecified;
    if (outcome) out[a.resultKey] = outcome.title;
    return out;
  }

  const area = Number(areaInput.replace(/\D/g, "")) || (answers.taille ? sizeFactor[answers.taille as string] : 0);
  const estimate =
    business.pricing.enabled && area
      ? { min: Math.round(area * business.pricing.perSqFtMin), max: Math.round(area * business.pricing.perSqFtMax) }
      : null;

  const progress = Math.round((Math.min(index, total) / total) * 100);

  return (
    <div className="rounded-[2rem] bg-ink/[0.04] p-1.5 ring-1 ring-ink/[0.07]">
      <div className="rounded-[calc(2rem-0.375rem)] bg-surface p-5 sm:p-10">
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm font-medium text-muted">
            <span>{done ? a.resultTitle : fmt(a.stepOf, { n: index + 1, total })}</span>
            <span>{progress} %</span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label={a.progress}
            className="h-1.5 overflow-hidden rounded-full bg-ink/10"
          >
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {!done && step && (
          <fieldset className="min-w-0">
            <legend className="sr-only">{step.title}</legend>
            <h2 ref={headingRef} tabIndex={-1} className="text-3xl font-bold outline-none sm:text-4xl">
              {step.title}
            </h2>
            {step.help && <p className="mt-3 text-muted">{step.help}</p>}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {step.options.map((o) => {
                const multi = step.kind === "multi";
                const checked = multi
                  ? ((answers[step.id] as string[] | undefined) ?? []).includes(o.value)
                  : answers[step.id] === o.value;
                return (
                  <label
                    key={o.value}
                    className={`relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-[border-color,background-color,transform] duration-300 active:scale-[0.99] active:duration-75 ${
                      checked ? "border-accent bg-accent-tint" : "border-ink/20 bg-surface hover:border-ink/45"
                    } focus-within:ring-4 focus-within:ring-accent/25`}
                  >
                    <input
                      type={multi ? "checkbox" : "radio"}
                      name={step.id}
                      value={o.value}
                      checked={checked}
                      onChange={() => pick(step.id, o.value, multi)}
                      className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]"
                    />
                    <span>
                      <span className="block font-semibold text-ink">{o.label}</span>
                      {o.hint && <span className="mt-0.5 block text-sm text-muted">{o.hint}</span>}
                    </span>
                  </label>
                );
              })}
            </div>

            {step.kind === "size" && (
              <div className="mt-6 max-w-xs">
                <Field id="area" label={a.areaLabel} hint={a.areaHint}>
                  <input
                    id="area"
                    inputMode="numeric"
                    value={areaInput}
                    onChange={(e) => {
                      setAreaInput(e.target.value);
                      track("estimator_interaction", { field: "area" });
                    }}
                    className={inputClass}
                    aria-describedby="area-hint"
                  />
                </Field>
              </div>
            )}
          </fieldset>
        )}

        {done && outcome && outcomeKey && (
          <div>
            <div
              className={`flex items-start gap-4 rounded-2xl p-5 ring-1 ${
                tone[outcomeKey] === "good"
                  ? "bg-success/[0.07] ring-success/25"
                  : tone[outcomeKey] === "caution"
                    ? "bg-accent-tint ring-accent/25"
                    : "bg-danger/[0.06] ring-danger/25"
              }`}
            >
              {tone[outcomeKey] === "good" ? (
                <CheckCircle size={28} weight="light" className="shrink-0 text-success" aria-hidden />
              ) : (
                <Warning size={28} weight="light" className="shrink-0 text-ink" aria-hidden />
              )}
              <div>
                <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold outline-none">
                  {outcome.title}
                </h2>
                <p className="mt-2 text-ink-soft">{outcome.body}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-paper p-5 text-[15px] text-muted ring-1 ring-ink/10">
              <p className="font-semibold text-ink">{a.notWhatTitle}</p>
              <p className="mt-1">{a.notWhatText}</p>
              {estimate ? (
                <p className="mt-3 text-ink">
                  {fmt(a.estimate, {
                    area: area.toLocaleString(numberLocale),
                    min: estimate.min.toLocaleString(numberLocale),
                    max: estimate.max.toLocaleString(numberLocale),
                  })}
                </p>
              ) : (
                <p className="mt-3">{a.noPrice}</p>
              )}
            </div>

            <form
              noValidate
              aria-busy={busy}
              className="relative mt-10 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                void submit(contact, { interest: "evaluation", assessment: readableAnswers() });
              }}
            >
              <h3 className="text-2xl font-bold">{a.contactTitle}</h3>
              <ContactFields
                values={contact}
                set={(p) => setContact((v) => ({ ...v, ...p }))}
                state={state}
                onStart={onStart}
                onBlurField={(key) => validateField(key, contact)}
                showInterest={false}
                showMessage={false}
              />
              <FormStatus state={state} />
              <div>
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-8 text-[15px] font-semibold text-white transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-strong active:scale-[0.97] active:duration-75 disabled:cursor-wait disabled:opacity-70"
                >
                  {busy ? ui.cta.sending : ui.cta.primary}
                </button>
                <p className="mt-3 text-sm text-muted">{ui.reassurance}</p>
              </div>
            </form>
          </div>
        )}

        <div className="mt-10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-[15px] font-semibold text-ink ring-1 ring-ink/20 hover:ring-ink/45 active:scale-[0.97] active:duration-75 disabled:invisible"
          >
            <ArrowLeft size={18} weight="light" aria-hidden />
            {a.back}
          </button>
          {!done && (
            <button
              type="button"
              onClick={next}
              disabled={!canNext}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition-[transform,background-color] hover:bg-ink-soft active:scale-[0.97] active:duration-75 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {index === total - 1 ? a.seeResult : a.next}
              <ArrowRight size={18} weight="light" aria-hidden />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
