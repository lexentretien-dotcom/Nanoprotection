import type { MetadataRoute } from "next";
import { business } from "@/config/business";
import { absoluteUrl } from "@/lib/seo";

/** Staging and preview deployments block crawlers until NEXT_PUBLIC_INDEXABLE=true. */
export default function robots(): MetadataRoute.Robots {
  if (!business.indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/merci"] },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: business.siteUrl,
  };
}
