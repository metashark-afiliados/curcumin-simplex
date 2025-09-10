// src/lib/i18n.ts
/**
 * @file i18n.ts
 * @description Módulo Ensamblador de Internacionalización (IMAS-C) global.
 * @version 10.0.0
 */
import "server-only";
import { i18nSchema, type Dictionary } from "./schemas/i18n.schema";

const supportedLocales = ["es-ES", "pt-BR", "en-US", "it-IT"] as const;
export type Locale = (typeof supportedLocales)[number];

// SSoT de todos los módulos de contenido para el portal principal.
const componentModules = [
  "header",
  "footer",
  "scrolling-banner",
  "news-grid",
  "hero",
  "social-proof",
  "benefits-section",
  "ingredient-analysis",
  "thumbnail-carousel",
  "testimonial-grid",
  "double-scrolling-banner",
  "faq-accordion",
  "guarantee-section",
  "order-form",
];

const pageModules = ["store-page", "about-page", "privacy-page", "terms-page"];

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const validatedLocale = supportedLocales.includes(locale as Locale)
    ? (locale as Locale)
    : "it-IT";

  const globalI18n = await import(`@/messages/global.i18n.json`).then(
    (m) => m.default
  );
  const globalDictionary =
    globalI18n[validatedLocale as keyof typeof globalI18n];

  const componentI18nData = await Promise.all(
    componentModules.map((name) =>
      import(`@/messages/components/${name}/${name}.i18n.json`)
        .then((m) => m.default)
        .catch(() => ({}))
    )
  );

  const pageI18nData = await Promise.all(
    pageModules.map((name) =>
      import(`@/messages/pages/${name}.i18n.json`)
        .then((m) => m.default)
        .catch(() => ({}))
    )
  );

  const allModulesData = [...componentI18nData, ...pageI18nData];

  const fullDictionary = allModulesData.reduce(
    (acc, dict) => ({ ...acc, ...dict[validatedLocale] }),
    globalDictionary
  );

  const validationResult = i18nSchema.safeParse(fullDictionary);

  if (!validationResult.success) {
    console.error(
      `[i18n] Error de validación para el locale "${validatedLocale}":`,
      validationResult.error.flatten().fieldErrors
    );
    throw new Error(
      `El contenido para el locale "${validatedLocale}" es inválido.`
    );
  }

  return validationResult.data;
};
// src/lib/i18n.ts
