import type { Locale } from "@/i18n/config";

type Localized = Record<Locale, string>;

/**
 * Real, dated case studies only. Leave empty until genuine projects with
 * the client's permission and original photographs exist.
 * Photos go in public/projects/<slug>/ and are referenced below.
 */
export type Project = {
  slug: string;
  type: "rajeunissement" | "protection-preventive";
  /** ISO date, must match the photo date */
  completedOn: string;
  title: Localized;
  location: Localized;
  product: string;
  roofCondition: Localized;
  description: Localized;
  before: { src: string; alt: Localized };
  after: { src: string; alt: Localized };
};

export const projects: Project[] = [];

export type Testimonial = {
  name: string;
  location: string;
  /** The customer's own words, in the language they wrote them. */
  text: string;
  date: string;
  /** Optional rating the customer actually gave (1 to 5). Never invent one. */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Must be true: written permission to publish. */
  consentOnFile: boolean;
};

/** Real customer comments with written permission only. */
export const testimonials: Testimonial[] = [];
