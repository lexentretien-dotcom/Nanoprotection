"use client";

import Script from "next/script";
import { business } from "@/config/business";

/**
 * Google's official "Add as preferred source" button.
 * Rendered ONLY when NEXT_PUBLIC_PREFERRED_SOURCES=true, which should be set
 * after the domain is confirmed in google.com/preferences/source.
 * It does not imply Google endorsement and does not guarantee anything.
 * Docs: https://developers.google.com/search/docs/appearance/preferred-sources
 */
export function PreferredSource({ label, text, lang }: { label: string; text: string; lang: "fr" | "en" }) {
  if (!business.preferredSources) return null;
  const attr = { "google-add-preferred-source-btn": "" } as Record<string, string>;
  return (
    <aside aria-label={label} className="mt-12 rounded-2xl bg-paper p-5 ring-1 ring-ink/10">
      <p className="mb-3 text-sm text-muted">{text}</p>
      <Script src="https://news.google.com/swg/js/v1/publisher.js" strategy="lazyOnload" />
      <div {...attr} data-theme="light" data-lang={lang} />
    </aside>
  );
}
