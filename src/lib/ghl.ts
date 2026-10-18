import "server-only";
import { getDict } from "@/i18n/dictionaries";
import type { Lead } from "@/lib/lead";

/**
 * GoHighLevel (LeadConnector) integration. Server only: the token never
 * reaches the browser.
 *
 * Required env:
 *   GHL_API_KEY       Private Integration token (scopes: contacts.write)
 *   GHL_LOCATION_ID   Sub-account (location) ID
 * Optional:
 *   GHL_API_BASE      Defaults to https://services.leadconnectorhq.com
 */
const BASE = process.env.GHL_API_BASE ?? "https://services.leadconnectorhq.com";

export function ghlConfigured() {
  return Boolean(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID);
}

async function ghl(path: string, body: unknown) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GHL_API_KEY}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`GHL ${path} responded ${res.status}`);
  }
  return res.json() as Promise<Record<string, unknown>>;
}

/** CRM notes are always written in French, the team's working language. */
function noteBody(lead: Lead) {
  const interestLabels = getDict("fr").ui.form.interests;
  const lines = [
    `Langue du visiteur: ${lead.locale === "en" ? "anglais" : "français"}`,
    `Source: formulaire ${lead.source === "assessment" ? "d'évaluation de toiture" : "de contact"}`,
    `Intérêt: ${interestLabels[lead.interest]}`,
    `Contact préféré: ${lead.contactMethod}`,
    `Code postal: ${lead.postalCode}${lead.city ? ` (${lead.city})` : ""}`,
    `Infolettre/marketing: ${lead.marketingConsent ? "oui (consentement exprès)" : "non"}`,
  ];
  if (lead.message) lines.push(`Message: ${lead.message}`);
  if (lead.assessment) {
    lines.push("", "Réponses à l'évaluation (indicatif seulement, pas un diagnostic):");
    for (const [k, v] of Object.entries(lead.assessment)) {
      lines.push(`- ${k}: ${Array.isArray(v) ? v.join(", ") : v}`);
    }
  }
  if (lead.attribution && Object.keys(lead.attribution).length) {
    lines.push("", "Attribution:");
    for (const [k, v] of Object.entries(lead.attribution)) lines.push(`- ${k}: ${v}`);
  }
  return lines.join("\n");
}

export async function sendLeadToGhl(lead: Lead) {
  const [firstName, ...rest] = lead.name.split(/\s+/);
  const tags = [
    "site-web",
    `langue-${lead.locale}`,
    lead.source === "assessment" ? "evaluation-toiture" : "contact",
    `interet-${lead.interest}`,
  ];
  if (lead.marketingConsent) tags.push("consentement-marketing");

  const upsert = await ghl("/contacts/upsert", {
    locationId: process.env.GHL_LOCATION_ID,
    firstName,
    lastName: rest.join(" "),
    email: lead.email,
    phone: `+1${lead.phone.replace(/\D/g, "").slice(-10)}`,
    postalCode: lead.postalCode.toUpperCase().replace(/\s|-/g, ""),
    city: lead.city || undefined,
    country: "CA",
    source: lead.attribution?.utm_source ? `Site web / ${lead.attribution.utm_source}` : "Site web",
    tags,
  });

  const contact = (upsert.contact ?? upsert) as { id?: string };
  if (!contact.id) throw new Error("GHL upsert returned no contact id");

  await ghl(`/contacts/${contact.id}/notes`, { body: noteBody(lead) });
  return contact.id;
}
