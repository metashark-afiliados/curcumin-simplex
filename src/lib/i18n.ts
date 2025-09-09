// src/lib/i18n.ts
/**
 * @file i18n.ts
 * @description Módulo Ensamblador de Internacionalización (IMAS-C).
 *              Carga dinámicamente, extrae el locale activo, fusiona y valida
 *              todos los diccionarios de contenido de los componentes.
 * @version 4.0.0
 */
import "server-only";
import { i18nSchema, type Dictionary } from "./schemas/i18n.schema";

const supportedLocales = ["es-ES", "pt-BR", "en-US", "it-IT"] as const;
export type Locale = (typeof supportedLocales)[number];

// Lista de módulos de componentes para el ensamblaje dinámico
const componentModules = [
  "header",
  "footer",
  "scrolling-banner",
  "hero",
  "social-proof",
  "benefits-section",
  "ingredient-analysis",
  "thumbnail-carousel",
];

/**
 * @function getDictionary
 * @description Carga, fusiona y valida los diccionarios de contenido.
 * @returns {Promise<Dictionary>} El diccionario de contenido completo y validado para el locale activo.
 */
export const getDictionary = async (): Promise<Dictionary> => {
  const siteLocale = (process.env.NEXT_PUBLIC_SITE_LOCALE || "es-ES") as Locale;

  if (!supportedLocales.includes(siteLocale)) {
    throw new Error(`Locale "${siteLocale}" no es soportado.`);
  }

  // Carga el contenido global (metadata)
  const globalI18n = await import(`@/messages/global.i18n.json`).then(
    (module) => module.default
  );
  const globalDictionary = globalI18n[siteLocale];

  // Carga dinámicamente todo el contenido de los componentes en paralelo
  const componentI18nData = await Promise.all(
    componentModules.map((name) =>
      import(`@/messages/components/${name}/${name}.i18n.json`).then(
        (module) => module.default
      )
    )
  );

  // Extrae el locale activo de cada archivo y lo fusiona en un solo objeto
  const fullDictionary = componentI18nData.reduce(
    (acc, dict) => ({ ...acc, ...dict[siteLocale] }),
    globalDictionary
  );

  // Valida el diccionario completo contra el esquema ensamblado
  const validationResult = i18nSchema.safeParse(fullDictionary);

  if (!validationResult.success) {
    console.error(
      `[i18n] Error de validación para el locale "${siteLocale}":`,
      validationResult.error.flatten().fieldErrors
    );
    throw new Error(`El contenido para el locale "${siteLocale}" es inválido.`);
  }

  return validationResult.data;
};
// src/lib/i18n.ts
