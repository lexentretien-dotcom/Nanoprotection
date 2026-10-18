"use client";

import { useState } from "react";
import type { ProductItem } from "@/i18n/fr/content";

type RowKey = Exclude<keyof ProductItem, "slug" | "name" | "summary">;

export function ProductCompare({
  products,
  rows,
  labels,
}: {
  products: ProductItem[];
  rows: Record<RowKey, string>;
  labels: { pick: string; caption: string; region: string; criterion: string; note: string };
}) {
  const [active, setActive] = useState(products[1]?.slug ?? products[0].slug);
  const order: RowKey[] = ["roofAge", "lifeAdded", "recommendedUse", "compatibility", "considerations", "warranty", "limitations"];

  return (
    <div>
      <div role="group" aria-label={labels.pick} className="grid gap-3 md:grid-cols-3">
        {products.map((p) => {
          const on = p.slug === active;
          return (
            <button
              key={p.slug}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(p.slug)}
              className={`rounded-[1.5rem] p-6 text-left ring-1 transition-[background-color,box-shadow,transform] duration-500 active:scale-[0.99] active:duration-75 ${
                on
                  ? "bg-ink text-white shadow-[var(--shadow-soft)] ring-ink"
                  : "bg-surface ring-ink/10 hover:ring-ink/30"
              }`}
            >
              <span className={`text-sm font-semibold ${on ? "text-[#c9bcff]" : "text-accent"}`}>
                {p.roofAge}
              </span>
              <span
                className={`mt-2 block font-display text-2xl font-bold tracking-tight ${on ? "text-white" : "text-ink"}`}
              >
                {p.name}
              </span>
              <span className={`mt-3 block text-[15px] ${on ? "text-white/80" : "text-muted"}`}>{p.summary}</span>
            </button>
          );
        })}
      </div>

      {/* Table: always rendered so every value stays in the HTML for crawlers. */}
      <div
        className="mt-10 overflow-x-auto rounded-[1.5rem] bg-surface ring-1 ring-ink/10"
        tabIndex={0}
        role="region"
        aria-label={labels.region}
      >
        <table className="w-full min-w-[46rem] border-collapse text-left text-[15px]">
          <caption className="sr-only">{labels.caption}</caption>
          <thead>
            <tr>
              <th scope="col" className="w-44 p-4 text-sm font-semibold text-muted">
                {labels.criterion}
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
            {order.map((key) => (
              <tr key={key} className="border-t border-ink/10 align-top">
                <th scope="row" className="p-4 text-sm font-semibold text-muted">
                  {rows[key]}
                </th>
                {products.map((p) => (
                  <td
                    key={p.slug}
                    className={`p-4 transition-colors duration-500 ${p.slug === active ? "bg-accent-tint/60" : ""}`}
                  >
                    {p[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-5 max-w-3xl text-sm text-muted">{labels.note}</p>
    </div>
  );
}
