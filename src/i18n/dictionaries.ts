import { ui as frUi } from "./fr/ui";
import { site as frSite } from "./fr/site";
import { content as frContent } from "./fr/content";
import { pages as frPages } from "./fr/pages";
import { legal as frLegal } from "./fr/legal";
import { ui as enUi } from "./en/ui";
import { site as enSite } from "./en/site";
import { content as enContent } from "./en/content";
import { pages as enPages } from "./en/pages";
import { legal as enLegal } from "./en/legal";
import type { Locale } from "./config";

const fr = { ui: frUi, site: frSite, content: frContent, pages: frPages, legal: frLegal };
const en = { ui: enUi, site: enSite, content: enContent, pages: enPages, legal: enLegal };

export type Dict = typeof fr;

const dictionaries: Record<Locale, Dict> = { fr, en };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

export { fmt } from "./format";
