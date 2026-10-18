"use client";

import { useState } from "react";
import { ContactFields, FormStatus, emptyContact, type ContactValues } from "./Fields";
import { useLeadSubmit } from "./useLeadSubmit";
import { useI18n } from "@/i18n/provider";

export function LeadForm() {
  const { ui } = useI18n();
  const [values, setValues] = useState<ContactValues>(emptyContact);
  const { state, submit, onStart, validateField } = useLeadSubmit("contact");
  const busy = state.status === "submitting";

  return (
    <form
      noValidate
      aria-busy={busy}
      onSubmit={(e) => {
        e.preventDefault();
        void submit(values);
      }}
      className="relative space-y-6"
    >
      <ContactFields
        values={values}
        set={(patch) => setValues((v) => ({ ...v, ...patch }))}
        state={state}
        onStart={onStart}
        onBlurField={(key) => validateField(key, values)}
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
      <p className="text-sm text-muted">{ui.form.photosNote}</p>
    </form>
  );
}
