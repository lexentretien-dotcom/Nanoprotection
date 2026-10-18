"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./config";
import type { Dict } from "./dictionaries";

type Ctx = { locale: Locale; ui: Dict["ui"] };
const I18nContext = createContext<Ctx | null>(null);

/** Gives client components the locale and only the strings they need. */
export function I18nProvider({
  locale,
  ui,
  children,
}: {
  locale: Locale;
  ui: Dict["ui"];
  children: ReactNode;
}) {
  return <I18nContext.Provider value={{ locale, ui }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
