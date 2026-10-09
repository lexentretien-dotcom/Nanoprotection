"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, Warning } from "@phosphor-icons/react";
import { business } from "@/config/business";
import { track } from "@/lib/analytics";
import { ContactFields, FormStatus, Field, inputClass, emptyContact, type ContactValues } from "./Fields";
import { useLeadSubmit } from "./useLeadSubmit";

type Option = { value: string; label: string; hint?: string };
type Step =
  | { id: string; kind: "single"; title: string; help?: string; options: Option[] }
  | { id: string; kind: "multi"; title: string; help?: string; options: Option[] }
  | { id: string; kind: "size"; title: string; help?: string; options: Option[] };

const steps: Step[] = [
  {
    id: "propriete",
    kind: "single",
    title: "Quel type de propriété?",
    options: [
      { value: "unifamiliale", label: "Maison unifamiliale" },
      { value: "jumele", label: "Jumelé ou maison en rangée" },
      { value: "multilogement", label: "Immeuble à logements" },
      { value: "commercial", label: "Bâtiment commercial", hint: "Nous confirmons si nous desservons ce type de bâtiment." },
    ],
  },
  {
    id: "materiau",
    kind: "single",
    title: "De quel matériau est faite votre toiture?",
    help: "Le traitement vise les bardeaux d'asphalte.",
    options: [
      { value: "asphalte", label: "Bardeaux d'asphalte" },
      { value: "tole", label: "Tôle ou acier" },
      { value: "membrane", label: "Membrane (toit plat)" },
      { value: "autre", label: "Autre ou je ne sais pas" },
    ],
  },
  {
    id: "age",
    kind: "single",
    title: "Quel âge a votre toiture, environ?",
    options: [
      { value: "moins-5", label: "Moins de 5 ans" },
      { value: "5-10", label: "5 à 10 ans" },
      { value: "10-15", label: "10 à 15 ans" },
      { value: "15-20", label: "15 à 20 ans" },
      { value: "20-25", label: "20 à 25 ans" },
      { value: "plus-25", label: "Plus de 25 ans" },
      { value: "inconnu", label: "Je ne sais pas" },
    ],
  },
  {
    id: "taille",
    kind: "size",
    title: "Quelle est la taille approximative du toit?",
    help: "Une estimation suffit. Nous confirmons les mesures sur place.",
    options: [
      { value: "petite", label: "Petite", hint: "Bungalow, petit chalet" },
      { value: "moyenne", label: "Moyenne", hint: "Maison à étage standard" },
      { value: "grande", label: "Grande", hint: "Grande maison ou toit complexe" },
      { value: "inconnue", label: "Je ne sais pas" },
    ],
  },
  {
    id: "etat",
    kind: "single",
    title: "Comment décririez-vous l'état général?",
    options: [
      { value: "bon", label: "Bon état apparent" },
      { value: "usure", label: "Usure visible" },
      { value: "important", label: "Détérioration importante" },
      { value: "inconnu", label: "Je ne sais pas" },
    ],
  },
  {
    id: "signes",
    kind: "multi",
    title: "Observez-vous l'un de ces signes?",
    help: "Choisissez tout ce qui s'applique.",
    options: [
      { value: "granules", label: "Granules dans les gouttières" },
      { value: "manquants", label: "Bardeaux manquants" },
      { value: "fendus", label: "Bardeaux fendus ou recourbés" },
      { value: "mousse", label: "Mousse ou algues" },
      { value: "infiltration", label: "Infiltration d'eau" },
      { value: "reparations", label: "Réparations antérieures" },
      { value: "aucun", label: "Aucun de ces signes" },
    ],
  },
  {
    id: "horizon",
    kind: "single",
    title: "Combien de temps pensez-vous garder la propriété?",
    options: [
      { value: "moins-5", label: "Moins de 5 ans" },
      { value: "5-10", label: "5 à 10 ans" },
      { value: "plus-10", label: "Plus de 10 ans" },
      { value: "vente", label: "Je prévois vendre bientôt" },
    ],
  },
];

type Answers = Record<string, string | string[]>;
const STORE = "nano-assessment-v1";

type Outcome = {
  tone: "good" | "caution" | "stop";
  title: string;
  body: string;
};

function evaluate(a: Answers): Outcome {
  const signs = (a.signes as string[] | undefined) ?? [];
  const severe = signs.includes("infiltration") || signs.includes("manquants");
  if (a.materiau && a.materiau !== "asphalte") {
    return {
      tone: "stop",
      title: "Notre traitement vise les bardeaux d'asphalte",
      body: "D'après vos réponses, votre toiture n'est pas en bardeaux d'asphalte. Nous pouvons tout de même l'examiner et vous orienter honnêtement.",
    };
  }
  if (a.etat === "important" || (severe && (a.age === "plus-25" || a.age === "20-25"))) {
    return {
      tone: "stop",
      title: "Une réparation ou un remplacement est probablement à envisager",
      body: "Les signes que vous décrivez suggèrent que la toiture pourrait être trop atteinte pour un traitement de surface. Seule une inspection permet de le confirmer.",
    };
  }
  if (severe) {
    return {
      tone: "caution",
      title: "Réparez d'abord, puis réévaluez",
      body: "Une infiltration d'eau ou des bardeaux manquants se règlent avant tout traitement. Une inspection dira si la préservation reste pertinente ensuite.",
    };
  }
  if (a.age === "plus-25") {
    return {
      tone: "caution",
      title: "Toiture âgée: une inspection est indispensable",
      body: "À cet âge, le remplacement est souvent à l'horizon. Une inspection peut tout de même révéler si les bardeaux sont encore sains.",
    };
  }
  return {
    tone: "good",
    title: "La préservation pourrait être une option à évaluer",
    body: "Vos réponses ne montrent pas d'obstacle évident. Ce n'est pas un diagnostic: une inspection sur place confirme si votre toiture est admissible.",
  };
}

const sizeFactor: Record<string, number> = { petite: 1100, moyenne: 1800, grande: 2800 };

export function Assessment() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [areaInput, setAreaInput] = useState("");
  const [contact, setContact] = useState<ContactValues>(emptyContact);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { state, submit, onStart } = useLeadSubmit("assessment");

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
  const outcome = useMemo(() => (done ? evaluate(answers) : null), [done, answers]);

  const canNext = step ? (step.kind === "multi" ? ((answers[step.id] as string[] | undefined)?.length ?? 0) > 0 : Boolean(answers[step.id])) : true;

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
    if (index === total - 1) track("assessment_complete", { outcome: evaluate(answers).tone });
    setIndex((i) => i + 1);
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
            <span>{done ? "Résultat préliminaire" : `Étape ${index + 1} sur ${total}`}</span>
            <span>{progress} %</span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Progression de l'évaluation"
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
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="text-3xl font-bold outline-none sm:text-4xl"
            >
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
                    className={`relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-[border-color,background-color,transform] duration-300 active:scale-[0.99] ${
                      checked
                        ? "border-accent bg-accent-tint"
                        : "border-ink/20 bg-surface hover:border-ink/45"
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
                <Field id="area" label="Superficie du toit en pi² (facultatif)" hint="Si vous la connaissez.">
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

        {done && outcome && (
          <div>
            <div
              className={`flex items-start gap-4 rounded-2xl p-5 ring-1 ${
                outcome.tone === "good"
                  ? "bg-success/[0.07] ring-success/25"
                  : outcome.tone === "caution"
                    ? "bg-accent-tint ring-accent/25"
                    : "bg-danger/[0.06] ring-danger/25"
              }`}
            >
              {outcome.tone === "good" ? (
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
              <p className="font-semibold text-ink">Ce que ce résultat n&apos;est pas</p>
              <p className="mt-1">
                Cet outil ne peut pas diagnostiquer votre toiture à distance. Il ne remplace ni une
                inspection, ni une soumission.
              </p>
              {estimate ? (
                <p className="mt-3 text-ink">
                  Fourchette indicative pour environ {area.toLocaleString("fr-CA")} pi²:{" "}
                  <strong>
                    {estimate.min.toLocaleString("fr-CA")} $ à {estimate.max.toLocaleString("fr-CA")} $
                  </strong>
                  . Ceci n&apos;est pas une soumission. Seul un prix écrit après inspection nous engage.
                </p>
              ) : (
                <p className="mt-3">
                  Nous ne publions pas de prix sans avoir vu la toiture. Demandez votre évaluation
                  gratuite pour recevoir une soumission écrite.
                </p>
              )}
            </div>

            <form
              noValidate
              className="relative mt-10 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                void submit(contact, {
                  interest: "evaluation",
                  assessment: {
                    ...answers,
                    superficie_pi2: areaInput || "non précisée",
                    resultat_preliminaire: outcome.title,
                  },
                });
              }}
            >
              <h3 className="text-2xl font-bold">Recevoir mon évaluation gratuite</h3>
              <ContactFields
                values={contact}
                set={(p) => setContact((v) => ({ ...v, ...p }))}
                state={state}
                onStart={onStart}
                showInterest={false}
                showMessage={false}
              />
              <FormStatus state={state} />
              <button
                type="submit"
                disabled={state.status === "submitting"}
                className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-[15px] font-semibold text-white transition-colors hover:bg-accent-strong disabled:cursor-wait disabled:opacity-70"
              >
                {state.status === "submitting" ? "Envoi en cours..." : "Obtenir mon évaluation gratuite"}
              </button>
            </form>
          </div>
        )}

        <div className="mt-10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-[15px] font-semibold text-ink ring-1 ring-ink/20 hover:ring-ink/45 disabled:invisible"
          >
            <ArrowLeft size={18} weight="light" aria-hidden />
            Retour
          </button>
          {!done && (
            <button
              type="button"
              onClick={next}
              disabled={!canNext}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-40"
            >
              {index === total - 1 ? "Voir mon résultat" : "Continuer"}
              <ArrowRight size={18} weight="light" aria-hidden />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
