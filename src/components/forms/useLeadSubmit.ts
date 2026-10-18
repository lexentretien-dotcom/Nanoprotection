"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { makeLeadSchema, type LeadInput, type LeadResponse } from "@/lib/lead";
import { readAttribution, track } from "@/lib/analytics";
import { useI18n } from "@/i18n/provider";
import { localePath } from "@/i18n/config";

export type FormState = {
  status: "idle" | "submitting" | "error";
  message: string;
  fieldErrors: Record<string, string>;
  fallback: boolean;
};

const initial: FormState = { status: "idle", message: "", fieldErrors: {}, fallback: false };

/**
 * Client-side validation (same zod schema as the server), submission, error
 * handling and redirect. Never reports success unless the server did.
 */
export function useLeadSubmit(
  source: "contact" | "assessment" | "widget",
  options: { redirect?: boolean } = {},
) {
  const { redirect = true } = options;
  const router = useRouter();
  const { locale, ui } = useI18n();
  const errors = ui.form.errors;
  const schema = useMemo(() => makeLeadSchema(errors), [errors]);
  const [state, setState] = useState<FormState>(initial);
  const renderedAt = useRef<number>(0);
  const started = useRef(false);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  function onStart() {
    if (started.current) return;
    started.current = true;
    track("quote_form_start", { source });
  }

  /** Validates one field when the visitor leaves it, so errors appear next to the field. */
  function validateField(key: string, values: LeadInput) {
    const result = schema.safeParse({ ...values, source, locale, elapsed: 3000 });
    const issue = result.success ? undefined : result.error.issues.find((i) => i.path[0] === key);
    setState((s) => {
      const next = { ...s.fieldErrors };
      if (issue) next[key] = issue.message;
      else delete next[key];
      return { ...s, fieldErrors: next };
    });
  }

  async function submit(values: LeadInput, extra?: Partial<LeadInput>) {
    const payload: LeadInput = {
      ...values,
      ...extra,
      source,
      locale,
      attribution: readAttribution(),
      elapsed: Date.now() - renderedAt.current,
    };

    const check = schema.safeParse(payload);
    if (!check.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of check.error.issues) {
        fieldErrors[String(issue.path[0])] ??= issue.message;
      }
      setState({ status: "error", message: errors.generic, fieldErrors, fallback: false });
      return false;
    }

    setState({ ...initial, status: "submitting" });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(check.data),
      });
      const data = (await res.json()) as LeadResponse;
      if (data.ok) {
        track("quote_submit", { source });
        if (redirect) router.push(localePath(locale, "/merci"));
        return true;
      }
      setState({
        status: "error",
        message: data.error,
        fieldErrors: data.fieldErrors ?? {},
        fallback: Boolean(data.fallback),
      });
    } catch {
      setState({ status: "error", message: errors.network, fieldErrors: {}, fallback: true });
    }
    return false;
  }

  return { state, submit, onStart, validateField };
}
