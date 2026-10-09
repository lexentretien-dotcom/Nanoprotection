"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { leadSchema, type LeadInput, type LeadResponse } from "@/lib/lead";
import { readAttribution, track } from "@/lib/analytics";

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
export function useLeadSubmit(source: "contact" | "assessment") {
  const router = useRouter();
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

  async function submit(values: LeadInput, extra?: Partial<LeadInput>) {
    const payload: LeadInput = {
      ...values,
      ...extra,
      source,
      attribution: readAttribution(),
      elapsed: Date.now() - renderedAt.current,
    };

    const check = leadSchema.safeParse(payload);
    if (!check.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of check.error.issues) {
        fieldErrors[String(issue.path[0])] ??= issue.message;
      }
      setState({
        status: "error",
        message: "Veuillez corriger les champs indiqués.",
        fieldErrors,
        fallback: false,
      });
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
        router.push("/merci");
        return true;
      }
      setState({
        status: "error",
        message: data.error,
        fieldErrors: data.fieldErrors ?? {},
        fallback: Boolean(data.fallback),
      });
    } catch {
      setState({
        status: "error",
        message: "Connexion impossible. Vérifiez votre réseau et réessayez.",
        fieldErrors: {},
        fallback: true,
      });
    }
    return false;
  }

  return { state, submit, onStart };
}
