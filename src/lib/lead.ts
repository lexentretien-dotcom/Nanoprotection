import { z } from "zod";

export const interests = [
  "evaluation",
  "rajeunissement",
  "protection-preventive",
  "comparaison-remplacement",
  "autre",
] as const;

const postal = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

export type LeadErrors = {
  name: string;
  email: string;
  phone: string;
  phoneLong: string;
  postal: string;
  consent: string;
};

/**
 * Same schema on client and server. Messages are passed in so this module
 * stays small (no dictionary in the client bundle).
 */
export function makeLeadSchema(e: LeadErrors) {
  return z.object({
    name: z.string().trim().min(2, e.name).max(120),
    email: z.string().trim().email(e.email).max(200),
    phone: z
      .string()
      .trim()
      .refine((v) => v.replace(/\D/g, "").length >= 10, e.phone)
      .refine((v) => v.replace(/\D/g, "").length <= 11, e.phoneLong),
    postalCode: z.string().trim().regex(postal, e.postal),
    city: z.string().trim().max(120).optional().default(""),
    interest: z.enum(interests).default("evaluation"),
    contactMethod: z.enum(["telephone", "courriel"]).default("telephone"),
    message: z.string().trim().max(2000).optional().default(""),
    consent: z.literal(true, { message: e.consent }),
    marketingConsent: z.boolean().optional().default(false),
    source: z.enum(["contact", "assessment", "widget"]).default("contact"),
    /** Quote widget only: what the visitor is looking for, in their words (the label they clicked). */
    service: z.string().trim().max(120).optional(),
    /** Quote widget only: "verified" when the postal code matched a confirmed service area, else "pending". */
    coverage: z.enum(["verified", "pending"]).optional(),
    /** Quote widget only: a preference, never a confirmed appointment. ISO date or "asap". */
    preferredDay: z.string().trim().max(20).optional(),
    preferredWindow: z.string().trim().max(40).optional(),
    locale: z.enum(["fr", "en"]).default("fr"),
    assessment: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
    attribution: z.record(z.string(), z.string()).optional(),
    /** Honeypot: real visitors never fill it. */
    website: z.string().max(0).optional().default(""),
    /** Milliseconds between form render and submit. */
    elapsed: z.number().min(0).optional().default(0),
  });
}

type LeadSchema = ReturnType<typeof makeLeadSchema>;
export type LeadInput = z.input<LeadSchema>;
export type Lead = z.output<LeadSchema>;

export type LeadResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string>; fallback?: boolean };
