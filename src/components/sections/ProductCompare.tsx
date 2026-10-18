"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import type { ProductItem } from "@/i18n/fr/content";
import { fmt } from "@/i18n/format";

type RowKey = Exclude<keyof ProductItem, "slug" | "name" | "summary">;

export function ProductCompare({
  products,
  rows,
  images,
  links,
  labels,
}: {
  products: ProductItem[];
  rows: Record<RowKey, string>;
  images: Record<string, string>;
  /** Localized URL of each product's own page */
  links: Record<string, string>;
  labels: { pick: string; caption: string; region: string; criterion: string; note: string; view: string; imageAlt: string };
}) {
  const [active, setActive] = useState(products[1]?.slug ?? products[0].slug);
  const order: RowKey[] = ["roofAge", "lifeAdded", "recommendedUse", "compatibility", "considerations", "warranty", "limitations"];

  return (
    <div>
      <ul className="grid gap-3 md:grid-cols-3">
        {products.map((p) => {
          const on = p.slug === active;
          return (
            <li key={p.slug} className="flex flex-col">
              <button
                type="button"
                aria-pressed={on}
                aria-label={`${labels.pick}: ${p.name}`}
                onClick={() => setActive(p.slug)}
                className={`flex flex-1 flex-col rounded-[1.5rem] p-6 text-left ring-1 transition-[background-color,box-shadow,transform] duration-500 active:scale-[0.99] active:duration-75 ${
                  on
                    ? "bg-ink text-white shadow-[var(--shadow-soft)] ring-ink"
                    : "bg-surface ring-ink/10 hover:ring-ink/30"
                }`}
              >
                <Image
                  src={images[p.slug]}
                  alt={fmt(labels.imageAlt, { name: p.name })}
                  width={500}
                  height={375}
                  sizes="(min-width:768px) 28vw, 80vw"
                  className="mx-auto h-44 w-auto object-contain"
                />
                <span className={`mt-4 text-sm font-semibold ${on ? "text-[#c9bcff]" : "text-accent"}`}>
                  {p.roofAge}
                </span>
                <span
                  className={`mt-1 block font-display text-2xl font-bold tracking-tight ${on ? "text-white" : "text-ink"}`}
                >
                  {p.name}
                </span>
                <span className={`mt-3 block text-[15px] ${on ? "text-white/80" : "text-muted"}`}>{p.summary}</span>
              </button>
              <Link
                href={links[p.slug]}
                className="mt-2 inline-flex min-h-11 items-center gap-2 px-2 font-semibold text-accent underline-offset-4 hover:underline"
              >
                {labels.view}
                <ArrowRight size={16} weight="light" aria-hidden />
                <span className="sr-only">: {p.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

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
                  <Link href={links[p.slug]} className="underline-offset-4 hover:underline">
                    {p.name}
                  </Link>
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
