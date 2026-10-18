import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Locale routing.
 *   /anything      -> French, URL unchanged (rewritten internally to /fr/anything)
 *   /en/anything   -> English, served as is
 *   /fr/anything   -> 308 to /anything (one canonical URL per page)
 * No automatic redirect based on the browser language: French is the default.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/fr${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals, generated metadata files and any file with an extension.
  matcher: ["/((?!api|_next|opengraph-image|icon|apple-icon|.*\\..*).*)"],
};
