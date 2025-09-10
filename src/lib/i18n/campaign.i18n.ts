// src/lib/i18n/campaign.i18n.ts
/**
 * @file campaign.i18n.ts
 * @description Módulo Ensamblador de datos para campañas (contenido y tema).
 *              Corregido para usar la sintaxis correcta de `z.record` en el schema del tema.
 * @version 3.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import "server-only";
import { z } from "zod";
import { i18nSchema, type Dictionary } from "@/lib/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n";
import { sectionNames } from "@/lib/config/sections.config";

// --- Schemas y Tipos ---

const CampaignThemeSchema = z.object({
  // <<-- CORRECCIÓN: z.record ahora tiene dos argumentos (clave, valor)
  colors: z.record(z.string(), z.string()).optional(),
  fonts: z.record(z.string(), z.string()).optional(),
  layout: z.object({
    sections: z.array(z.object({ name: z.enum(sectionNames) })),
  }),
});

export type CampaignData = {
  dictionary: Dictionary;
  theme: z.infer<typeof CampaignThemeSchema>;
};

// --- Constantes de Configuración ---

const supportedLocales: Locale[] = ["es-ES", "pt-BR", "en-US", "it-IT"];
const defaultLocale: Locale = "it-IT";

const overridableModules = [
  "header",
  "footer",
  "scrolling-banner",
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

// --- Lógica de Carga y Fusión ---

async function loadI18nModule(path: string): Promise<any> {
  try {
    return (await import(path)).default;
  } catch (error: any) {
    if (error.code === "MODULE_NOT_FOUND") {
      console.warn(
        `[i18n Loader] Módulo opcional no encontrado: ${path}. Se continuará sin él.`
      );
      return {};
    }
    console.error(
      `[i18n Loader] Error crítico al cargar el módulo ${path}:`,
      error
    );
    throw error;
  }
}

export const getCampaignData = async (
  campaignId: string,
  locale: string
): Promise<CampaignData> => {
  const validatedLocale = supportedLocales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;
  console.log(
    `[Observabilidad] Obteniendo datos para Campaña: ${campaignId}, Locale: ${validatedLocale}`
  );

  const globalI18n = await loadI18nModule(`@/messages/global.i18n.json`);
  const defaultComponentData = await Promise.all(
    overridableModules.map((name) =>
      loadI18nModule(`@/messages/components/${name}/${name}.i18n.json`)
    )
  );

  const campaignComponentData = await Promise.all(
    overridableModules.map((name) =>
      loadI18nModule(
        `@/content/campaigns/${campaignId}/components/${name}.i18n.json`
      )
    )
  );

  const dictionaries = [
    globalI18n,
    ...defaultComponentData,
    ...campaignComponentData,
  ];

  const fullDictionary = dictionaries.reduce((acc, dict) => {
    const localeContent = dict[validatedLocale] || {};
    return { ...acc, ...localeContent };
  }, {});

  const dictValidation = i18nSchema.safeParse(fullDictionary);
  if (!dictValidation.success) {
    console.error(
      `[i18n:${campaignId}] Error de validación de contenido para locale "${validatedLocale}":`,
      dictValidation.error.flatten().fieldErrors
    );
    throw new Error(
      `El contenido para la campaña "${campaignId}" en locale "${validatedLocale}" es inválido.`
    );
  }

  const themeJson = await loadI18nModule(
    `@/content/campaigns/${campaignId}/theme.json`
  );
  const themeValidation = CampaignThemeSchema.safeParse(themeJson);

  if (!themeValidation.success) {
    console.error(
      `[Theme:${campaignId}] Error de validación de theme.json:`,
      themeValidation.error.flatten().fieldErrors
    );
    throw new Error(
      `El archivo theme.json para la campaña "${campaignId}" es inválido.`
    );
  }

  return {
    dictionary: dictValidation.data,
    theme: themeValidation.data,
  };
};
// src/lib/i18n/campaign.i18n.ts
