"use client";

import { useState } from "react";
import { ContactFields, FormStatus, emptyContact, type ContactValues } from "./Fields";
import { useLeadSubmit } from "./useLeadSubmit";

export function LeadForm() {
  const [values, setValues] = useState<ContactValues>(emptyContact);
  const { state, submit, onStart } = useLeadSubmit("contact");

  return (
    <form
      noValidate
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
      />
      <FormStatus state={state} />
      <button
        type="submit"
        disabled={state.status === "submitting"}
        className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-[15px] font-semibold text-white transition-colors hover:bg-accent-strong disabled:cursor-wait disabled:opacity-70"
      >
        {state.status === "submitting" ? "Envoi en cours..." : "Obtenir mon évaluation gratuite"}
      </button>
      <p className="text-sm text-muted">
        Photos de votre toiture: après votre demande, vous pourrez nous les envoyer par courriel
        pour accélérer l&apos;évaluation.
      </p>
    </form>
  );
}
