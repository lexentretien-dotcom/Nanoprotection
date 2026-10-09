/**
 * Real, dated case studies only. Leave empty until genuine projects with
 * the client's permission and original photographs exist.
 * Photos go in public/projects/<slug>/ and are referenced below.
 */
export type Project = {
  slug: string;
  title: string;
  type: "rajeunissement" | "protection-preventive";
  location: string;
  completedOn: string; // ISO date, must match the photo date
  product: string;
  roofCondition: string;
  description: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

export const projects: Project[] = [];

export type Testimonial = {
  name: string;
  location: string;
  text: string;
  date: string;
  consentOnFile: boolean;
};

/** Real customer testimonials with written permission only. */
export const testimonials: Testimonial[] = [];
