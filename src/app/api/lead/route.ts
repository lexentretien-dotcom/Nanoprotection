import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { makeLeadSchema, type LeadResponse } from "@/lib/lead";
import { ghlConfigured, sendLeadToGhl } from "@/lib/ghl";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";

export const runtime = "nodejs";

/**
 * Lead intake. Validation and spam checks run on the server. A success
 * response is only returned after the CRM accepted the contact.
 *
 * In-memory rate limit and duplicate guard: effective per server instance.
 * On serverless hosting, back these with a shared store (Redis/KV) if needed.
 */
const hits = new Map<string, number[]>();
const recent = new Map<string, number>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function clientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function json(body: LeadResponse, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  const now = Date.now();
  const ip = clientIp(req);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ ok: false, error: getDict("fr").ui.form.errors.badRequest }, 400);
  }

  const requested = (raw as { locale?: string } | null)?.locale;
  const locale = isLocale(requested) ? requested : "fr";
  const errors = getDict(locale).ui.form.errors;

  const stamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (stamps.length >= MAX_HITS) {
    return json({ ok: false, error: errors.tooMany }, 429);
  }
  stamps.push(now);
  hits.set(ip, stamps);

  const parsed = makeLeadSchema(errors).safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    // A filled honeypot fails the schema; do not reveal that.
    if (fieldErrors.website) return json({ ok: true });
    return json({ ok: false, error: errors.generic, fieldErrors }, 422);
  }
  const lead = parsed.data;

  // Bots submit instantly.
  if (lead.elapsed > 0 && lead.elapsed < 2500) return json({ ok: true });

  const key = createHash("sha256")
    .update(`${lead.email.toLowerCase()}|${lead.phone.replace(/\D/g, "")}|${lead.source}`)
    .digest("hex");
  const last = recent.get(key);
  if (last && now - last < WINDOW_MS) return json({ ok: true });

  if (!ghlConfigured()) {
    console.error("[lead] GHL_API_KEY / GHL_LOCATION_ID are not configured");
    return json({ ok: false, fallback: true, error: errors.unavailable }, 503);
  }

  try {
    await sendLeadToGhl(lead);
    recent.set(key, now);
    return json({ ok: true });
  } catch (err) {
    console.error("[lead] CRM request failed:", err instanceof Error ? err.message : "unknown");
    return json({ ok: false, fallback: true, error: errors.notSaved }, 502);
  }
}
