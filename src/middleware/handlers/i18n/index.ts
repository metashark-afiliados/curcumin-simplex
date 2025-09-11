// src/middleware/handlers/i18n/index.ts
/**
 * @file /middleware/handlers/i18n/index.ts
 * @description Manejador de middleware para la internacionalización.
 *              Refactorizado para consumir la utilidad `pathnameHasLocale`,
 *              mejorar la robustez y añadir observabilidad detallada.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale } from "@/lib/i18n.config";
import { pathnameHasLocale } from "@/lib/i18n.utils";
import { clientLogger } from "@/lib/logging";

// Lista de rutas públicas que no deben ser redirigidas por el middleware de i18n
const PUBLIC_FILE_ROUTES = [
  "/robots.txt",
  "/sitemap.xml",
  // Añadir aquí otras rutas de archivos estáticos si es necesario
];

export function i18nHandler(req: NextRequest): NextResponse | void {
  const { pathname } = req.nextUrl;

  // Guarda de seguridad 1: Ignorar rutas de archivos públicos conocidas.
  if (PUBLIC_FILE_ROUTES.includes(pathname)) {
    return;
  }

  // Guarda de seguridad 2: Usar la SSoT funcional para verificar si la ruta ya está localizada.
  if (pathnameHasLocale(pathname)) {
    return; // Pasa al siguiente manejador.
  }

  // Si llegamos aquí, la ruta necesita ser redirigida.
  const newUrl = new URL(`/${defaultLocale}${pathname}`, req.url);

  clientLogger.info(
    `[Middleware:i18n] Ruta no localizada detectada. Redirigiendo.`,
    {
      originalPath: pathname,
      redirectedTo: newUrl.toString(),
      defaultLocaleUsed: defaultLocale,
    }
  );

  // Redirección permanente (308) para SEO.
  return NextResponse.redirect(newUrl, 308);
}
// src/middleware/handlers/i18n/index.ts
