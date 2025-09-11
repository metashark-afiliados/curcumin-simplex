// src/lib/i18n.utils.ts
/**
 * @file i18n.utils.ts
 * @description Aparato de utilidades puras para la lógica de internacionalización.
 *              Actualizado para incluir una función que extrae el locale de una ruta.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import {
  supportedLocales,
  defaultLocale,
  type Locale,
} from "@/lib/i18n.config";

/**
 * @function pathnameHasLocale
 * @description Verifica si una ruta de URL ya contiene un prefijo de locale soportado.
 * @param {string} pathname La ruta a verificar.
 * @returns {boolean} `true` si la ruta ya está localizada, `false` en caso contrario.
 */
export function pathnameHasLocale(pathname: string): boolean {
  return supportedLocales.some(
    (locale: Locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

/**
 * @function getCurrentLocaleFromPathname
 * @description Extrae el código del locale desde el inicio de una ruta de URL.
 * @param {string} pathname La ruta de la cual extraer el locale.
 * @returns {Locale} El locale encontrado, o el locale por defecto si no se encuentra ninguno.
 */
export function getCurrentLocaleFromPathname(pathname: string): Locale {
  for (const locale of supportedLocales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale;
    }
  }
  return defaultLocale;
}
// src/lib/i18n.utils.ts
