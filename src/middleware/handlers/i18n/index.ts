// src/middleware/handlers/i18n/index.ts
import { NextResponse, type NextRequest } from "next/server";

/**
 * @file /middleware/handlers/i18n/index.ts
 * @description Manejador de middleware para la internacionalización.
 * @version 1.0.0
 */
const supportedLocales = ["es-ES", "pt-BR", "en-US", "it-IT"];
const defaultLocale = "it-IT";

function getLocale(request: NextRequest): string {
  // Aquí podemos añadir lógica más compleja en el futuro (cookies, accept-language).
  // Por ahora, usamos el default.
  return defaultLocale;
}

export async function i18nHandler(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse | void> {
  const { pathname } = req.nextUrl;

  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // La ruta ya está localizada, no hacemos nada.
    return;
  }

  // Redirigir a la ruta con el prefijo de locale.
  const locale = getLocale(req);
  req.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(req.nextUrl);
}
// src/middleware/handlers/i18n/index.ts
