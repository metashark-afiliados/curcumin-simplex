// src/app/sitemap.ts
/**
 * @file sitemap.ts
 * @description Generador dinámico y robusto del sitemap para Global Fitwell.
 *              Refactorizado para eliminar datos harcodeados, cargar dinámicamente
 *              desde las fuentes de verdad (campaign.map.json) y mejorar la
 *              observabilidad con logging detallado.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { MetadataRoute } from "next";
import { routes } from "@/lib/navigation";
import { supportedLocales, type Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";

// --- Importación de Fuentes de Datos Reales ---
import campaignMap from "@/content/campaigns/12157/campaign.map.json";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// --- Funciones Generadoras Atómicas ---

/**
 * Genera URLs para rutas estáticas y localizadas.
 */
function generateStaticPages(): MetadataRoute.Sitemap {
  const staticRoutes = [routes.home, routes.about, routes.store, routes.news];
  const pages = staticRoutes.flatMap((route) =>
    supportedLocales.map((locale) => ({
      url: `${BASE_URL}${route.path({ locale })}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route.path({ locale }) === `/${locale}` ? 1.0 : 0.8,
    }))
  );
  clientLogger.trace(`[Sitemap] Generadas ${pages.length} URLs estáticas.`);
  return pages;
}

/**
 * Genera URLs para todas las variantes de campaña.
 */
function generateCampaignPages(): MetadataRoute.Sitemap {
  const campaignPages = Object.keys(campaignMap.variants).flatMap((variantId) =>
    supportedLocales.map((locale) => ({
      url: `${BASE_URL}${routes.campaign.path({ locale, campaignId: campaignMap.productId })}?v=${variantId}`,
      lastModified: new Date(), // En un caso real, esto vendría de metadatos del archivo.
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }))
  );
  clientLogger.trace(
    `[Sitemap] Generadas ${campaignPages.length} URLs de campañas.`
  );
  return campaignPages;
}

/**
 * Genera URLs para artículos de noticias (simulado).
 */
function generateArticlePages(): MetadataRoute.Sitemap {
  // SIMULACIÓN: En un proyecto real, estos datos vendrían de un CMS o base de datos.
  const articles = [{ slug: "5-superalimentos", updatedAt: new Date() }];
  const articlePages = articles.flatMap((article) =>
    supportedLocales.map((locale) => ({
      url: `${BASE_URL}${routes.newsArticle.path({ locale, slug: article.slug })}`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );
  clientLogger.trace(
    `[Sitemap] Generadas ${articlePages.length} URLs de artículos (simulado).`
  );
  return articlePages;
}

// --- Orquestador Principal del Sitemap ---

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  clientLogger.startGroup("[Sitemap] Iniciando generación del sitemap...");

  try {
    const staticPages = generateStaticPages();
    const campaignPages = generateCampaignPages();
    const articlePages = generateArticlePages();

    const allUrls = [...staticPages, ...campaignPages, ...articlePages];

    clientLogger.info(
      `[Sitemap] Generación completada. Total de URLs: ${allUrls.length}.`
    );
    clientLogger.endGroup();

    return allUrls;
  } catch (error) {
    clientLogger.error("[Sitemap] Falló la generación del sitemap.", {
      error: error instanceof Error ? error.message : String(error),
    });
    clientLogger.endGroup();
    return []; // Devuelve un sitemap vacío en caso de error para no romper el build.
  }
}
// src/app/sitemap.ts
