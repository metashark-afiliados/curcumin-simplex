// src/middleware/handlers/i18n/index.ts
/**
 * @file /middleware/handlers/i18n/index.ts
 * @description Manejador de middleware para la internacionalización.
 *              Refactorizado para utilizar `console.log` nativo, garantizando
 *              la compatibilidad con el Edge Runtime y mejorando la observabilidad.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale } from "@/lib/i18n.config";
import { pathnameHasLocale } from "@/lib/i18n.utils";

const PUBLIC_FILE_ROUTES = ["/robots.txt", "/sitemap.xml"];

export function i18nHandler(req: NextRequest): NextResponse | void {
  const { pathname } = req.nextUrl;

  if (PUBLIC_FILE_ROUTES.includes(pathname)) {
    return;
  }

  if (pathnameHasLocale(pathname)) {
    return;
  }

  const newUrl = new URL(`/${defaultLocale}${pathname}`, req.url);

  console.log(
    `[Middleware:i18n] Ruta no localizada detectada. Redirigiendo a: ${newUrl.toString()}`
  );

  return NextResponse.redirect(newUrl, 308);
}
// src/middleware/handlers/i18n/index.ts
