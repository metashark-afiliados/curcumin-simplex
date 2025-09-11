// src/lib/i18n.ts
/**
 * @file i18n.ts
 * @description Aparato ensamblador de diccionarios para el portal.
 *              Refactorizado para corregir la inconsistencia de nomenclatura
 *              (devRouteMenu) y para organizar las importaciones de forma
 *              estructurada, mejorando la mantenibilidad.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs/I18N_STRATEGY_SSOT.md
 * @see .docs-espejo/lib/i18n.ts.md
 */
import "server-only";
import { i18nSchema, type Dictionary } from "@/lib/schemas/i18n.schema";
import {
  supportedLocales,
  defaultLocale,
  type Locale,
} from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";

// --- Importaciones de Contenido (Agrupadas por Dominio para Claridad) ---

// 1. Globals
import globalI18n from "@/messages/global.i18n.json";

// 2. Core Components
import headerI18n from "@/messages/components/header/header.i18n.json";
import footerI18n from "@/messages/components/footer/footer.i18n.json";
import scrollingBannerI18n from "@/messages/components/scrolling-banner/scrolling-banner.i18n.json";
import heroNewsI18n from "@/messages/components/hero-news/hero-news.i18n.json";
import newsGridI18n from "@/messages/components/news-grid/news-grid.i18n.json";
import productShowcaseI18n from "@/messages/components/product-showcase/product-showcase.i18n.json";

// 3. Componentes Naturalizados (razBits)
import cardNavI18n from "@/components/razBits/CardNav/card-nav.i18n.json";
import lightRaysI18n from "@/components/razBits/LightRays/light-rays.i18n.json";
import magicBentoI18n from "@/components/razBits/MagicBento/magic-bento.i18n.json";
import dockI18n from "@/components/razBits/Dock/dock.i18n.json";

// 4. Componentes de Desarrollo
import devHeaderI18n from "@/messages/components/dev/dev-header.i18n.json";
import devHomepageHeaderI18n from "@/messages/components/dev/dev-homepage-header.i18n.json";
// <<-- CORRECCIÓN: Se importa el archivo correcto.
import devRouteMenuI18n from "@/messages/components/dev/dev-route-menu.i18n.json";

// 5. Páginas
import aboutPageI18n from "@/messages/pages/about-page.i18n.json";
import privacyPageI18n from "@/messages/pages/privacy-page.i18n.json";
import storePageI18n from "@/messages/pages/store-page.i18n.json";
import termsPageI18n from "@/messages/pages/terms-page.i18n.json";
import devDashboardI18n from "@/messages/pages/dev-dashboard.i18n.json";
import devCampaignSimulatorI18n from "@/messages/pages/dev-campaign-simulator.i18n.json";

type I18nModuleContent = {
  [key in Locale]?: Record<string, any>;
};

// Lista estructurada de todos los módulos a ensamblar
const allI18nModules: I18nModuleContent[] = [
  // Globals
  globalI18n,
  // Core Components
  headerI18n,
  footerI18n,
  scrollingBannerI18n,
  heroNewsI18n,
  newsGridI18n,
  productShowcaseI18n,
  // razBits
  cardNavI18n,
  lightRaysI18n,
  magicBentoI18n,
  dockI18n,
  // Dev Components
  devHeaderI18n,
  devHomepageHeaderI18n,
  devRouteMenuI18n,
  // Pages
  aboutPageI18n,
  privacyPageI18n,
  storePageI18n,
  termsPageI18n,
  devDashboardI18n,
  devCampaignSimulatorI18n,
];

const dictionariesCache: Partial<Record<Locale, Dictionary>> = {};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const validatedLocale = supportedLocales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  if (dictionariesCache[validatedLocale]) {
    clientLogger.trace(
      `[i18n] Diccionario para '${validatedLocale}' encontrado en caché.`
    );
    return dictionariesCache[validatedLocale] as Dictionary;
  }

  clientLogger.info(
    `[i18n] Ensamblando y validando diccionario para locale: ${validatedLocale}`
  );

  const fullDictionary = allI18nModules.reduce((acc, moduleContent) => {
    const localeSpecificContent = moduleContent[validatedLocale];
    return { ...acc, ...(localeSpecificContent || {}) };
  }, {});

  const validation = i18nSchema.safeParse(fullDictionary);

  if (!validation.success) {
    clientLogger.error(
      `[i18n] Error de validación de contenido para portal en locale "${validatedLocale}":`,
      {
        errors: validation.error.flatten().fieldErrors,
        "diccionario-keys": Object.keys(fullDictionary), // Mejora de observabilidad
      }
    );
    throw new Error(
      `El contenido del portal para el locale "${validatedLocale}" es inválido. Revise los esquemas y los archivos .i18n.json.`
    );
  }

  dictionariesCache[validatedLocale] = validation.data;
  clientLogger.info(
    `[i18n] Diccionario para '${validatedLocale}' ensamblado y validado exitosamente.`
  );
  return validation.data;
};
// src/lib/i18n.ts
