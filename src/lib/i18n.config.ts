// src/lib/i18n.config.ts
/**
 * @file i18n.config.ts
 * @description SSoT para la configuración estática de internacionalización.
 *              Este aparato es "puro" y seguro para ser importado en cualquier
 *              entorno. Refactorizado para alinear el `defaultLocale` con las
 *              directivas del proyecto (fallback a 'es-ES').
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs/I18N_STRATEGY_SSOT.md
 */
import { z } from "zod";

/**
 * @constant supportedLocales
 * @description Define la lista inmutable de todos los idiomas soportados. Es la SSoT
 *              para la validación de rutas y la carga de diccionarios.
 *              Refleja la directiva de soportar siempre los 4 idiomas seleccionados.
 */
export const supportedLocales = ["es-ES", "pt-BR", "en-US", "it-IT"] as const;

/**
 * @type Locale
 * @description Deriva el tipo de los locales soportados, garantizando seguridad de tipos.
 */
export type Locale = (typeof supportedLocales)[number];

/**
 * @constant LocaleEnum
 * @description Schema de Zod para validar que un string es un Locale soportado.
 * @private
 */
const LocaleEnum = z.enum(supportedLocales);

/**
 * @constant defaultLocale
 * @description Define el locale por defecto del sitio. Se obtiene de la variable
 *              de entorno `NEXT_PUBLIC_SITE_LOCALE`.
 *              CORRECCIÓN: El fallback seguro ahora es 'es-ES', según la directiva explícita.
 */
export const defaultLocale: Locale = LocaleEnum.parse(
  process.env.NEXT_PUBLIC_SITE_LOCALE || "es-ES"
);
// src/lib/i18n.config.ts
