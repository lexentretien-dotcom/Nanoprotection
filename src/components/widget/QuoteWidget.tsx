"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, MapPin, PencilSimple } from "@phosphor-icons/react";
import { checkCoverage, normalisePostalCode, type CoverageResult } from "@/config/coverage";
import { Field, inputClass } from "@/components/forms/Fields";
import { useLeadSubmit } from "@/components/forms/useLeadSubmit";
import { track } from "@/lib/analytics";
import { fmt } from "@/i18n/format";
import { useI18n } from "@/i18n/provider";
import { localePath } from "@/i18n/config";
import { widgetCopy as t } from "./copy";

type Step = 1 | 2 | 3 | 4 | 5;

/** "Longueuil Southwest" -> "Longueuil": drop the sector suffix postal databases add. */
function cleanPlace(name: string) {
  return name
    .replace(/\s*\(.*?\)\s*/g, " ")
    .replace(/\s+(North|South|East|West|Northeast|Northwest|Southeast|Southwest|Central|Centre|Nord|Sud|Est|Ouest)(\s+.*)?$/i, "")
    .trim();
}

/** Chips for a single choice. */
function ChipGroup({
  name,
  label,
  options,
  value,
  onChange,
}: {
  name: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="mt-5 min-w-0">
      <legend className="text-[15px] font-semibold text-ink">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <label key={o}>
            <input
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              onChange={() => onChange(o)}
              className="peer sr-only"
            />
            <span
              className={`inline-flex min-h-11 cursor-pointer items-center rounded-full px-4 text-sm font-semibold ring-1 transition-[background-color,transform] peer-focus-visible:ring-4 peer-focus-visible:ring-accent/40 ${press} ${
                value === o ? "bg-ink text-white ring-ink" : "bg-surface text-ink ring-ink/20 hover:ring-ink/45"
              }`}
            >
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const press = "active:scale-[0.97] active:duration-75";
const primaryBtn = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgb(90_44_245/0.7)] transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-strong disabled:cursor-wait disabled:opacity-70 ${press}`;
const ghostBtn = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold text-ink ring-1 ring-ink/20 transition-[transform,box-shadow] hover:ring-ink/45 ${press}`;

/** Local date as YYYY-MM-DD without time-zone surprises. */
function isoDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function QuoteWidget() {
  const { locale } = useI18n();
  const { state, submit, onStart, validateField } = useLeadSubmit("widget", { redirect: false });
  const busy = state.status === "submitting";

  const [step, setStep] = useState<Step>(1);
  const [postal, setPostal] = useState("");
  const [postalError, setPostalError] = useState("");
  const [coverage, setCoverage] = useState<CoverageResult | null>(null);
  const [municipality, setMunicipality] = useState("");
  const [cityStatus, setCityStatus] = useState<"loading" | "found" | "none">("none");
  const [address, setAddress] = useState("");
  const [material, setMaterial] = useState("");
  const [materialOther, setMaterialOther] = useState("");
  const [roofSize, setRoofSize] = useState("");
  const [roofAge, setRoofAge] = useState("");
  const [municipalityError, setMunicipalityError] = useState("");
  const [service, setService] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [day, setDay] = useState("asap");
  const [window_, setWindow] = useState("peu-importe");
  const [days, setDays] = useState<{ value: string; label: string }[]>([]);
  const [contact, setContact] = useState({ name: "", phone: "", email: "", consent: false, website: "" });

  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstFocus = useRef(true);
  const pending = coverage?.status === "pending";
  const askMunicipality = pending && cityStatus === "none";
  const normalised = normalisePostalCode(postal) ?? postal;
  const serviceLabel = t.s2.services.find((s) => s.key === service)?.label ?? "";

  // Offer the next seven days, built after mount (the date depends on the visitor's clock).
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const fmtDay = new Intl.DateTimeFormat("fr-CA", { weekday: "short", day: "numeric", month: "short" });
      const list: { value: string; label: string }[] = [];
      for (let i = 1; i <= 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        list.push({ value: isoDate(d), label: fmtDay.format(d).replace(".", "").replace(/^./, (ch) => ch.toUpperCase()) });
      }
      setDays(list);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Move focus to the new step's heading, but not on first load.
  useEffect(() => {
    if (firstFocus.current) {
      firstFocus.current = false;
      return;
    }
    // preventScroll: the clipped, height-animated container must not scroll to the heading.
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  /* Smooth height: the card grows or shrinks to the current step instead of jumping. */
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const measure = useCallback(() => {
    if (innerRef.current) setHeight(innerRef.current.offsetHeight);
  }, []);
  useLayoutEffect(() => {
    measure();
    const el = innerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  function verify(e: React.FormEvent) {
    e.preventDefault();
    const result = checkCoverage(postal);
    if (result.status === "invalid") return setPostalError(t.s1.errors.invalid);
    if (result.status === "outside-quebec") return setPostalError(t.s1.errors.outside);
    setPostalError("");
    setCoverage(result);
    setPostal(normalisePostalCode(postal) ?? postal);
    track("widget_coverage_check", { status: result.status });
    setStep(2);

    // Look up the municipality from the first three characters only (never the full postal code).
    setMunicipality("");
    setCityStatus("loading");
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 3000);
    fetch(`https://api.zippopotam.us/ca/${result.fsa}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const place = cleanPlace(String(data?.places?.[0]?.["place name"] ?? ""));
        if (place) {
          setMunicipality(place);
          setCityStatus("found");
        } else setCityStatus("none");
      })
      .catch(() => setCityStatus("none"))
      .finally(() => clearTimeout(timer));
  }

  function goToStep3() {
    let ok = true;
    if (askMunicipality && !municipality.trim()) {
      setMunicipalityError(t.s2.municipalityError);
      ok = false;
    } else setMunicipalityError("");
    if (!service) {
      setServiceError(t.s2.serviceError);
      ok = false;
    } else setServiceError("");
    if (ok) setStep(3);
  }

  const materialValue = material === "Autre" ? materialOther.trim() || "Autre" : material;

  const values = () => ({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    postalCode: normalised,
    city: municipality,
    interest: "evaluation" as const,
    contactMethod: "telephone" as const,
    message: "",
    consent: contact.consent as unknown as true,
    marketingConsent: false,
    website: contact.website,
  });

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const windowLabel = t.s3.windows.find((w) => w.value === window_)?.label ?? window_;
    const ok = await submit(values(), {
      service: serviceLabel,
      coverage: pending ? "pending" : "verified",
      preferredDay: day,
      preferredWindow: windowLabel,
      address: address.trim() || undefined,
      roofMaterial: materialValue || undefined,
      roofSize: roofSize || undefined,
      roofAge: roofAge || undefined,
    });
    if (ok) setStep(5);
  }

  const e = state.fieldErrors;
  const aria = (id: string) => ({
    "aria-invalid": e[id] ? true : undefined,
    "aria-describedby": e[id] ? `w-${id}-error` : undefined,
  });
  const progress = step === 5 ? 100 : (step / 4) * 100;
  const prefLabel =
    day === "asap" ? t.s3.asap.toLowerCase() : (days.find((d) => d.value === day)?.label ?? day);

  return (
    <div className="rounded-[2rem] bg-ink/[0.05] p-1.5 ring-1 ring-ink/[0.08]">
      <div className="rounded-[calc(2rem-0.375rem)] bg-surface shadow-[var(--shadow-soft)]">
        {/* Animated progress */}
        {step < 5 && (
          <div className="px-5 pt-5 sm:px-8 sm:pt-7">
            <div className="flex items-center justify-between text-xs font-semibold text-muted">
              <span>{fmt(t.stepOf, { n: step })}</span>
              <span>{t.steps[step - 1]}</span>
            </div>
            <div
              role="progressbar"
              aria-label={t.progressLabel}
              aria-valuemin={1}
              aria-valuemax={4}
              aria-valuenow={step}
              aria-valuetext={`${fmt(t.stepOf, { n: step })}: ${t.steps[step - 1]}`}
              className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-[#8b6bff] transition-[width] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div
          className="overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
          style={{ height }}
        >
          <div ref={innerRef} className="@container px-5 pb-6 pt-5 sm:px-8 sm:pb-8">
            <div key={step} className="motion-safe:animate-[widgetIn_0.5s_cubic-bezier(0.32,0.72,0,1)]">
              {/* STEP 1: postal code */}
              {step === 1 && (
                <form noValidate onSubmit={verify} onFocusCapture={onStart}>
                  <h2
                    ref={headingRef}
                    tabIndex={-1}
                    className="flex items-center gap-2 text-xl font-bold outline-none sm:text-2xl"
                  >
                    <MapPin size={24} weight="fill" className="shrink-0 text-accent" aria-hidden />
                    <label htmlFor="w-postal">{t.s1.label}</label>
                  </h2>
                  <div className="mt-4 flex flex-col gap-3 @lg:flex-row">
                    <input
                      id="w-postal"
                      name="postal"
                      autoComplete="postal-code"
                      inputMode="text"
                      value={postal}
                      onChange={(ev) => {
                        setPostal(ev.target.value);
                        if (postalError) setPostalError("");
                      }}
                      placeholder={t.s1.placeholder}
                      aria-invalid={postalError ? true : undefined}
                      aria-describedby={postalError ? "w-postal-error" : undefined}
                      className={`${inputClass} flex-1 uppercase placeholder:normal-case`}
                    />
                    <button type="submit" className={`${primaryBtn} @lg:shrink-0`}>
                      {t.s1.cta}
                      <ArrowRight size={18} weight="bold" aria-hidden />
                    </button>
                  </div>
                  {postalError && (
                    <p id="w-postal-error" role="alert" className="mt-2 text-sm font-medium text-danger">
                      {postalError}
                    </p>
                  )}
                </form>
              )}

              {/* STEP 2: confirmation and service choice */}
              {step === 2 && (
                <div>
                  <div
                    role="status"
                    className={`flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl p-4 ring-1 ${
                      pending ? "bg-paper ring-ink/15" : "bg-success/[0.08] ring-success/25"
                    }`}
                  >
                    {pending ? (
                      <Clock size={24} weight="fill" className="shrink-0 text-ink-soft" aria-hidden />
                    ) : (
                      <CheckCircle size={24} weight="fill" className="shrink-0 text-success" aria-hidden />
                    )}
                    <p className="min-w-0 flex-1 font-semibold text-ink">{pending ? t.s2.pending : t.s2.good}</p>
                    {cityStatus === "found" && municipality && (
                      <p className="text-sm text-muted">
                        {t.s2.cityFound} <strong className="text-ink">{municipality}</strong>
                      </p>
                    )}
                    <p className="flex items-center gap-2 text-sm text-muted">
                      <span>
                        {t.s2.postalLabel}: <strong className="text-ink">{normalised}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className={`inline-flex min-h-9 items-center gap-1 rounded-full px-3 text-sm font-semibold text-accent ring-1 ring-accent/30 hover:bg-accent-tint ${press}`}
                      >
                        <PencilSimple size={14} weight="bold" aria-hidden />
                        {t.edit}
                      </button>
                    </p>
                  </div>

                  {askMunicipality && (
                    <div className="mt-5">
                      <Field id="w-municipality" label={t.s2.municipalityLabel} error={municipalityError} hint={t.s2.municipalityHint}>
                        <input
                          id="w-municipality"
                          autoComplete="address-level2"
                          value={municipality}
                          onChange={(ev) => {
                            setMunicipality(ev.target.value);
                            if (municipalityError) setMunicipalityError("");
                          }}
                          aria-invalid={municipalityError ? true : undefined}
                          aria-describedby={municipalityError ? "w-municipality-error" : "w-municipality-hint"}
                          className={inputClass}
                        />
                      </Field>
                    </div>
                  )}

                  <fieldset className="mt-6 min-w-0">
                    <legend className="w-full">
                      <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold outline-none sm:text-2xl">
                        {t.s2.question}
                      </h2>
                    </legend>
                    <div className="mt-4 grid gap-3 @lg:grid-cols-2">
                      {t.s2.services.map((s) => {
                        const checked = service === s.key;
                        return (
                          <label
                            key={s.key}
                            className={`relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-[border-color,background-color,transform,box-shadow] duration-300 active:scale-[0.99] active:duration-75 focus-within:ring-4 focus-within:ring-accent/25 ${
                              s.primary ? "@lg:min-h-[5.5rem]" : ""
                            } ${
                              checked
                                ? "border-accent bg-accent-tint"
                                : s.primary
                                  ? "border-accent/40 bg-accent-tint/50 hover:border-accent"
                                  : "border-ink/20 bg-surface hover:border-ink/45"
                            }`}
                          >
                            <input
                              type="radio"
                              name="w-service"
                              value={s.key}
                              checked={checked}
                              onChange={() => {
                                setService(s.key);
                                setServiceError("");
                                track("widget_service_selected", { service: s.key });
                              }}
                              className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]"
                            />
                            <span>
                              <span className="block font-semibold text-ink">{s.label}</span>
                              {s.primary && (
                                <span className="mt-1 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                                  {t.s2.prominent}
                                </span>
                              )}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {serviceError && (
                      <p role="alert" className="mt-3 text-sm font-medium text-danger">
                        {serviceError}
                      </p>
                    )}
                  </fieldset>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <button type="button" onClick={() => setStep(1)} className={ghostBtn}>
                      <ArrowLeft size={18} weight="bold" aria-hidden />
                      {t.back}
                    </button>
                    <button type="button" onClick={goToStep3} className={primaryBtn}>
                      {t.next}
                      <ArrowRight size={18} weight="bold" aria-hidden />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: the roof (all optional) */}
              {step === 3 && (
                <div>
                  <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold outline-none sm:text-2xl">
                    {t.roof.title}
                  </h2>
                  <p className="mt-1 text-[15px] text-muted">{t.roof.subtitle}</p>

                  <div className="mt-5 grid gap-4 @lg:grid-cols-2">
                    <div className="@lg:col-span-2">
                      <Field id="w-address" label={t.roof.address}>
                        <input
                          id="w-address"
                          name="street-address"
                          autoComplete="address-line1"
                          placeholder={t.roof.addressPlaceholder}
                          value={address}
                          onChange={(ev) => setAddress(ev.target.value)}
                          className={inputClass}
                        />
                      </Field>
                    </div>
                    <Field id="w-material" label={t.roof.material}>
                      <select
                        id="w-material"
                        value={material}
                        onChange={(ev) => setMaterial(ev.target.value)}
                        className={inputClass}
                      >
                        <option value="">{t.roof.materialPlaceholder}</option>
                        {t.roof.materials.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </Field>
                    {material === "Autre" && (
                      <Field id="w-material-other" label={t.roof.materialOther}>
                        <input
                          id="w-material-other"
                          maxLength={80}
                          value={materialOther}
                          onChange={(ev) => setMaterialOther(ev.target.value)}
                          className={inputClass}
                        />
                      </Field>
                    )}
                  </div>

                  <ChipGroup name="w-size" label={t.roof.size} options={t.roof.sizes} value={roofSize} onChange={setRoofSize} />
                  <ChipGroup name="w-age" label={t.roof.age} options={t.roof.ages} value={roofAge} onChange={setRoofAge} />

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <button type="button" onClick={() => setStep(2)} className={ghostBtn}>
                      <ArrowLeft size={18} weight="bold" aria-hidden />
                      {t.back}
                    </button>
                    <button type="button" onClick={() => setStep(4)} className={primaryBtn}>
                      {t.next}
                      <ArrowRight size={18} weight="bold" aria-hidden />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: contact details and preferred time */}
              {step === 4 && (
                <form noValidate aria-busy={busy} onSubmit={send} className="relative">
                  <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold outline-none sm:text-2xl">
                    {t.s3.title}
                  </h2>
                  <p className="mt-1 text-[15px] text-muted">{t.s3.subtitle}</p>

                  <fieldset className="mt-5 min-w-0">
                    <legend className="text-[15px] font-semibold text-ink">{t.s3.dayLabel}</legend>
                    <div className="mt-2 flex gap-2 overflow-x-auto pb-1" role="radiogroup" aria-label={t.s3.dayLabel}>
                      {[{ value: "asap", label: t.s3.asap }, ...days].map((d) => (
                        <label key={d.value} className="shrink-0">
                          <input
                            type="radio"
                            name="w-day"
                            value={d.value}
                            checked={day === d.value}
                            onChange={() => setDay(d.value)}
                            className="peer sr-only"
                          />
                          <span
                            className={`inline-flex min-h-11 cursor-pointer items-center rounded-full px-4 text-sm font-semibold ring-1 transition-[background-color,transform] peer-focus-visible:ring-4 peer-focus-visible:ring-accent/40 ${press} ${
                              day === d.value ? "bg-ink text-white ring-ink" : "bg-surface text-ink ring-ink/20 hover:ring-ink/45"
                            }`}
                          >
                            {d.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="mt-4 min-w-0">
                    <legend className="text-[15px] font-semibold text-ink">{t.s3.windowLabel}</legend>
                    <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label={t.s3.windowLabel}>
                      {t.s3.windows.map((w) => (
                        <label key={w.value}>
                          <input
                            type="radio"
                            name="w-window"
                            value={w.value}
                            checked={window_ === w.value}
                            onChange={() => setWindow(w.value)}
                            className="peer sr-only"
                          />
                          <span
                            className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold ring-1 transition-[background-color,transform] peer-focus-visible:ring-4 peer-focus-visible:ring-accent/40 ${press} ${
                              window_ === w.value ? "bg-ink text-white ring-ink" : "bg-surface text-ink ring-ink/20 hover:ring-ink/45"
                            }`}
                          >
                            {w.label}
                            {w.hint && <span className="text-xs font-medium opacity-70">{w.hint}</span>}
                          </span>
                        </label>
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-muted">{t.s3.preferenceNote}</p>
                  </fieldset>

                  <div className="mt-5 grid gap-4 @lg:grid-cols-2">
                    <Field id="w-name" label={t.s3.name} error={e.name}>
                      <input
                        id="w-name"
                        autoComplete="name"
                        value={contact.name}
                        onChange={(ev) => setContact((c) => ({ ...c, name: ev.target.value }))}
                        onBlur={() => validateField("name", { ...values() })}
                        className={inputClass}
                        {...aria("name")}
                      />
                    </Field>
                    <Field id="w-phone" label={t.s3.phone} error={e.phone}>
                      <input
                        id="w-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={contact.phone}
                        onChange={(ev) => setContact((c) => ({ ...c, phone: ev.target.value }))}
                        onBlur={() => validateField("phone", { ...values() })}
                        className={inputClass}
                        {...aria("phone")}
                      />
                    </Field>
                    <div className="@lg:col-span-2">
                      <Field id="w-email" label={t.s3.email} error={e.email}>
                        <input
                          id="w-email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          value={contact.email}
                          onChange={(ev) => setContact((c) => ({ ...c, email: ev.target.value }))}
                          onBlur={() => validateField("email", { ...values() })}
                          className={inputClass}
                          {...aria("email")}
                        />
                      </Field>
                    </div>
                    <div>
                      <Field id="w-postal-ro" label={t.s3.postal}>
                        <input id="w-postal-ro" value={normalised} readOnly className={`${inputClass} bg-paper`} />
                      </Field>
                    </div>
                    <div>
                      <Field id="w-service-ro" label={t.s3.service}>
                        <input id="w-service-ro" value={serviceLabel} readOnly className={`${inputClass} bg-paper`} />
                      </Field>
                    </div>
                  </div>

                  {/* Honeypot: hidden from people and assistive tech. */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="w-website">Do not fill</label>
                    <input
                      id="w-website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={contact.website}
                      onChange={(ev) => setContact((c) => ({ ...c, website: ev.target.value }))}
                    />
                  </div>

                  <div className="mt-4 rounded-2xl bg-paper p-4 ring-1 ring-ink/10">
                    <label className="flex items-start gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={contact.consent}
                        onChange={(ev) => setContact((c) => ({ ...c, consent: ev.target.checked }))}
                        className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--accent)]"
                        aria-invalid={e.consent ? true : undefined}
                        aria-describedby={e.consent ? "w-consent-error" : undefined}
                      />
                      <span>
                        {t.s3.consentBefore}
                        <Link
                          href={localePath(locale, "/confidentialite")}
                          target="_blank"
                          className="font-medium text-accent underline underline-offset-4"
                        >
                          {t.s3.consentLink}
                        </Link>
                        {t.s3.consentAfter}
                      </span>
                    </label>
                    {e.consent && (
                      <p id="w-consent-error" role="alert" className="mt-2 text-sm font-medium text-danger">
                        {e.consent}
                      </p>
                    )}
                  </div>

                  {state.status === "error" && state.message && (
                    <div role="alert" className="mt-4 rounded-2xl border border-danger/30 bg-danger/5 p-4 text-sm text-ink">
                      <p className="font-semibold text-danger">{state.message}</p>
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button type="button" onClick={() => setStep(3)} className={ghostBtn} disabled={busy}>
                      <ArrowLeft size={18} weight="bold" aria-hidden />
                      {t.back}
                    </button>
                    <button type="submit" className={primaryBtn} disabled={busy}>
                      {busy ? t.s3.sending : t.s3.cta}
                      {!busy && <ArrowRight size={18} weight="bold" aria-hidden />}
                    </button>
                  </div>
                  <p className="mt-3 text-center text-sm text-muted">Aucuns frais, aucun engagement, réponse garantie en 24 h</p>
                </form>
              )}

              {/* STEP 5: honest confirmation (a request, not a booking) */}
              {step === 5 && (
                <div className="py-4 text-center" role="status">
                  <CheckCircle size={56} weight="fill" className="mx-auto text-success" aria-hidden />
                  <h2 ref={headingRef} tabIndex={-1} className="mt-4 text-2xl font-bold outline-none sm:text-3xl">
                    {t.s4.title}
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-lg text-ink-soft">{t.s4.text}</p>
                  <ul className="mx-auto mt-6 max-w-sm space-y-1 rounded-2xl bg-paper p-4 text-left text-sm text-muted ring-1 ring-ink/10">
                    <li>
                      {t.s4.service} <strong className="text-ink">{serviceLabel}</strong>
                    </li>
                    <li>
                      {t.s4.postal} <strong className="text-ink">{normalised}</strong>
                    </li>
                    <li>
                      {t.s4.preference}{" "}
                      <strong className="text-ink">
                        {prefLabel}, {t.s3.windows.find((w) => w.value === window_)?.label.toLowerCase()}
                      </strong>
                    </li>
                    {pending && <li>{t.s4.pendingNote}</li>}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes widgetIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
