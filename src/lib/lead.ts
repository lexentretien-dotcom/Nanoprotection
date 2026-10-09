import { z } from "zod";

export const interests = [
  "evaluation",
  "rajeunissement",
  "protection-preventive",
  "comparaison-remplacement",
  "autre",
] as const;

export const interestLabels: Record<(typeof interests)[number], string> = {
  evaluation: "Inspection et évaluation",
  rajeunissement: "Rajeunissement de toiture",
  "protection-preventive": "Protection préventive",
  "comparaison-remplacement": "Comparer avec un remplacement",
  autre: "Autre question",
};

const postal = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(120),
  email: z.string().trim().email("Entrez une adresse courriel valide.").max(200),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Entrez un numéro à 10 chiffres.")
    .refine((v) => v.replace(/\D/g, "").length <= 11, "Numéro trop long."),
  postalCode: z.string().trim().regex(postal, "Code postal invalide (ex. G1K 3A5)."),
  city: z.string().trim().max(120).optional().default(""),
  interest: z.enum(interests).default("evaluation"),
  contactMethod: z.enum(["telephone", "courriel"]).default("telephone"),
  message: z.string().trim().max(2000).optional().default(""),
  consent: z.literal(true, { message: "Votre consentement est requis pour vous répondre." }),
  marketingConsent: z.boolean().optional().default(false),
  source: z.enum(["contact", "assessment"]).default("contact"),
  assessment: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  attribution: z.record(z.string(), z.string()).optional(),
  /** Honeypot: real visitors never fill it. */
  website: z.string().max(0).optional().default(""),
  /** Milliseconds between form render and submit. */
  elapsed: z.number().min(0).optional().default(0),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

export type LeadResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string>; fallback?: boolean };
