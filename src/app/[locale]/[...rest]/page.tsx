import { notFound } from "next/navigation";

/** Any unknown URL under a locale ends here so the localized 404 page is used (with a real 404 status). */
export default function CatchAll() {
  notFound();
}
