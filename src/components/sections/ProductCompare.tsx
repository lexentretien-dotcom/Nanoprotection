"use client";

import { useState } from "react";
import { products, productsNeedVerification } from "@/content/products";

const rows: { key: keyof (typeof products)[number]; label: string }[] = [
  { key: "roofAge", label: "Âge de toiture visé" },
  { key: "recommendedUse", label: "Usage recommandé" },
  { key: "compatibility", label: "Compatibilité" },
  { key: "considerations", label: "Application" },
  { key: "warranty", label: "Garantie" },
  { key: "limitations", label: "Limites" },
];

export function ProductCompare() {
  const [active, setActive] = useState(products[1]?.slug ?? products[0].slug);

  return (
    <div>
      <div role="group" aria-label="Choisir un produit à mettre en évidence" className="grid gap-3 md:grid-cols-3">
        {products.map((p) => {
          const on = p.slug === active;
          return (
            <button
              key={p.slug}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(p.slug)}
              className={`rounded-[1.5rem] p-6 text-left ring-1 transition-[background-color,box-shadow,transform] duration-500 active:scale-[0.99] ${
                on
                  ? "bg-ink text-white shadow-[var(--shadow-soft)] ring-ink"
                  : "bg-surface ring-ink/10 hover:ring-ink/30"
              }`}
            >
              <span className={`text-sm font-semibold ${on ? "text-white/70" : "text-accent"}`}>
                {p.roofAge}
              </span>
              <span className={`mt-2 block font-display text-2xl font-bold tracking-tight ${on ? "text-white" : "text-ink"}`}>
                {p.name}
              </span>
              <span className={`mt-3 block text-[15px] ${on ? "text-white/75" : "text-muted"}`}>
                {p.summary}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table: always rendered so every value stays in the HTML for crawlers. */}
      <div className="mt-10 overflow-x-auto rounded-[1.5rem] bg-surface ring-1 ring-ink/10" tabIndex={0} role="region" aria-label="Tableau comparatif des produits">
        <table className="w-full min-w-[46rem] border-collapse text-left text-[15px]">
          <caption className="sr-only">
            Comparaison des produits GoNano par usage, compatibilité, application, garantie et limites
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-40 p-4 text-sm font-semibold text-muted">
                Critère
              </th>
              {products.map((p) => (
                <th
                  key={p.slug}
                  scope="col"
                  className={`p-4 font-display text-lg font-bold transition-colors duration-500 ${
                    p.slug === active ? "bg-accent-tint text-accent-strong" : ""
                  }`}
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-t border-ink/10 align-top">
                <th scope="row" className="p-4 text-sm font-semibold text-muted">
                  {r.label}
                </th>
                {products.map((p) => (
                  <td
                    key={p.slug}
                    className={`p-4 transition-colors duration-500 ${p.slug === active ? "bg-accent-tint/60" : ""}`}
                  >
                    {String(p[r.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {productsNeedVerification && (
        <p className="mt-5 max-w-3xl text-sm text-muted">
          Les produits ne sont pas interchangeables et ne s&apos;appliquent pas tous ensemble sur
          chaque toiture. Les caractéristiques techniques détaillées proviennent du fabricant et
          sont confirmées avec la documentation officielle avant tout travail.
        </p>
      )}
    </div>
  );
}
