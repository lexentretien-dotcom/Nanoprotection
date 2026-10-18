import "server-only";
import { notFound } from "next/navigation";
import { isLocale, localePath, type Locale } from "./config";

/** Reads and validates the [locale] route param. Unknown locales return a 404. */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

/** Shorthand: href for a path in a locale. */
export const href = localePath;
