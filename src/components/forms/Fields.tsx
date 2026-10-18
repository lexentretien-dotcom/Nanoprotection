"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { interests, type LeadInput } from "@/lib/lead";
import { business } from "@/config/business";
import { useI18n } from "@/i18n/provider";
import { localePath } from "@/i18n/config";
import type { FormState } from "./useLeadSubmit";

export const inputClass =
  "h-12 w-full rounded-2xl border border-ink/25 bg-surface px-4 text-[16px] text-ink placeholder:text-muted/80 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/20 aria-[invalid=true]:border-danger";

export function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[15px] font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export type ContactValues = Pick<
  LeadInput,
  "name" | "email" | "phone" | "postalCode" | "city" | "interest" | "contactMethod" | "message" | "consent" | "marketingConsent" | "website"
>;

export const emptyContact: ContactValues = {
  name: "",
  email: "",
  phone: "",
  postalCode: "",
  city: "",
  interest: "evaluation",
  contactMethod: "telephone",
  message: "",
  consent: false as unknown as true,
  marketingConsent: false,
  website: "",
};

export function ContactFields({
  values,
  set,
  state,
  onStart,
  onBlurField,
  showInterest = true,
  showMessage = true,
}: {
  values: ContactValues;
  set: (patch: Partial<ContactValues>) => void;
  state: FormState;
  onStart: () => void;
  onBlurField: (key: string) => void;
  showInterest?: boolean;
  showMessage?: boolean;
}) {
  const { locale, ui } = useI18n();
  const f = ui.form;
  const e = state.fieldErrors;
  const aria = (id: string) => ({
    "aria-invalid": e[id] ? true : undefined,
    "aria-describedby": e[id] ? `${id}-error` : undefined,
  });

  return (
    <div className="grid gap-5 sm:grid-cols-2" onFocusCapture={onStart}>
      <Field id="name" label={f.name} error={e.name}>
        <input
          id="name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(ev) => set({ name: ev.target.value })}
          onBlur={() => onBlurField("name")}
          className={inputClass}
          {...aria("name")}
        />
      </Field>
      <Field id="email" label={f.email} error={e.email}>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={(ev) => set({ email: ev.target.value })}
          onBlur={() => onBlurField("email")}
          className={inputClass}
          {...aria("email")}
        />
      </Field>
      <Field id="phone" label={f.phone} error={e.phone}>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(ev) => set({ phone: ev.target.value })}
          onBlur={() => onBlurField("phone")}
          className={inputClass}
          {...aria("phone")}
        />
      </Field>
      <Field id="postalCode" label={f.postalCode} error={e.postalCode}>
        <input
          id="postalCode"
          name="postalCode"
          autoComplete="postal-code"
          placeholder={f.postalPlaceholder}
          value={values.postalCode}
          onChange={(ev) => set({ postalCode: ev.target.value })}
          onBlur={() => onBlurField("postalCode")}
          className={`${inputClass} uppercase`}
          {...aria("postalCode")}
        />
      </Field>
      <Field id="city" label={f.city} error={e.city}>
        <input
          id="city"
          name="city"
          autoComplete="address-level2"
          value={values.city}
          onChange={(ev) => set({ city: ev.target.value })}
          className={inputClass}
        />
      </Field>
      <Field id="contactMethod" label={f.contactMethod}>
        <select
          id="contactMethod"
          name="contactMethod"
          value={values.contactMethod}
          onChange={(ev) => set({ contactMethod: ev.target.value as "telephone" | "courriel" })}
          className={inputClass}
        >
          <option value="telephone">{f.byPhone}</option>
          <option value="courriel">{f.byEmail}</option>
        </select>
      </Field>

      {showInterest && (
        <div className="sm:col-span-2">
          <Field id="interest" label={f.interest}>
            <select
              id="interest"
              name="interest"
              value={values.interest}
              onChange={(ev) => set({ interest: ev.target.value as (typeof interests)[number] })}
              className={inputClass}
            >
              {interests.map((i) => (
                <option key={i} value={i}>
                  {f.interests[i]}
                </option>
              ))}
            </select>
          </Field>
        </div>
      )}

      {showMessage && (
        <div className="sm:col-span-2">
          <Field id="message" label={f.message} error={e.message} hint={f.messageHint}>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={values.message}
              onChange={(ev) => set({ message: ev.target.value })}
              className={`${inputClass} h-auto py-3`}
              aria-describedby="message-hint"
            />
          </Field>
        </div>
      )}

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Do not fill</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(ev) => set({ website: ev.target.value })}
        />
      </div>

      <div className="sm:col-span-2 space-y-3 rounded-2xl bg-paper p-4 ring-1 ring-ink/10">
        <label className="flex items-start gap-3 text-[15px]">
          <input
            type="checkbox"
            checked={Boolean(values.consent)}
            onChange={(ev) => set({ consent: ev.target.checked as unknown as true })}
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]"
            aria-invalid={e.consent ? true : undefined}
            aria-describedby={e.consent ? "consent-error" : undefined}
          />
          <span>
            {f.consentBefore}
            <Link
              href={localePath(locale, "/confidentialite")}
              className="font-medium text-accent underline underline-offset-4"
            >
              {f.consentLink}
            </Link>
            {f.consentAfter}
          </span>
        </label>
        {e.consent && (
          <p id="consent-error" role="alert" className="text-sm font-medium text-danger">
            {e.consent}
          </p>
        )}
        <label className="flex items-start gap-3 text-[15px] text-muted">
          <input
            type="checkbox"
            checked={Boolean(values.marketingConsent)}
            onChange={(ev) => set({ marketingConsent: ev.target.checked })}
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]"
          />
          <span>{f.marketing}</span>
        </label>
      </div>
    </div>
  );
}

export function FormStatus({ state }: { state: FormState }) {
  const { ui } = useI18n();
  const f = ui.form.errors;
  if (state.status !== "error" || !state.message) return null;
  return (
    <div
      role="alert"
      className="rounded-2xl border border-danger/30 bg-danger/5 p-4 text-[15px] text-ink"
    >
      <p className="font-semibold text-danger">{state.message}</p>
      {state.fallback && (
        <p className="mt-2">
          {f.fallbackIntro}{" "}
          <a className="font-semibold underline underline-offset-4" href={`tel:${business.phone.href}`}>
            {business.phone.display}
          </a>{" "}
          {f.fallbackOr}{" "}
          <a className="font-semibold underline underline-offset-4" href={`mailto:${business.email.value}`}>
            {business.email.value}
          </a>
          .
        </p>
      )}
    </div>
  );
}
