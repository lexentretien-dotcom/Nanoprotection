"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { FaqList } from "./FaqList";
import { inputClass } from "@/components/forms/Fields";
import type { FaqCategory } from "@/content/faq";

/** The full list is server-rendered; filtering only hides non-matches on the client. */
export function FaqSearch({ categories }: { categories: FaqCategory[] }) {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      categories
        .map((c) => ({
          ...c,
          items: c.items.filter(
            (i) => !needle || i.q.toLowerCase().includes(needle) || i.a.toLowerCase().includes(needle),
          ),
        }))
        .filter((c) => c.items.length > 0),
    [categories, needle],
  );

  return (
    <div>
      <div className="relative max-w-xl">
        <label htmlFor="faq-search" className="sr-only">
          Rechercher dans la foire aux questions
        </label>
        <MagnifyingGlass size={20} weight="light" aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          id="faq-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher une question"
          className={`${inputClass} pl-12`}
        />
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {needle ? `${filtered.reduce((n, c) => n + c.items.length, 0)} résultat(s)` : ""}
      </p>

      <div className="mt-6 space-y-12">
        {filtered.map((c) => (
          <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`}>
            <h2 id={`${c.id}-title`} className="mb-5 text-2xl font-bold sm:text-3xl">
              {c.label}
            </h2>
            <FaqList items={c.items} />
          </section>
        ))}
        {filtered.length === 0 && (
          <p className="text-muted">Aucune question ne correspond. Écrivez-nous: nous répondrons.</p>
        )}
      </div>
    </div>
  );
}
