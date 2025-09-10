// src/app/sitemap.ts
/**
 * @file sitemap.ts
 * @description Generador dinámico del sitemap para Global Fitwell.
 *              Refactorizado para generar rutas estáticas dinámicamente
 *              desde la SSoT en `navigation.ts`, mejorando la mantenibilidad.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { MetadataRoute } from "next";
import { routes, RouteType } from "@/lib/navigation";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // <<-- 1. GENERACIÓN DINÁMICA DE PÁGINAS ESTÁTICAS -->>
  // Filtramos el manifiesto de rutas para obtener solo las que son públicas
  // y no tienen parámetros dinámicos en su path (path no requiere argumentos).
  const staticPortalPages: MetadataRoute.Sitemap = Object.values(routes)
    .filter(
      (route) =>
        route.type === RouteType.Public &&
        // Una función que no toma argumentos tiene una longitud de 0.
        // Esto excluye rutas como /campaigns/[id] o /news/[slug].
        route.path.length === 0
    )
    .map((route) => ({
      url: `${baseUrl}${route.path()}`,
      lastModified: new Date(),
      // Se puede añadir lógica para prioridades diferentes si es necesario.
      changeFrequency: "weekly",
      priority: route.path() === "/" ? 1.0 : 0.7,
    }));

  // --- Lógica para rutas dinámicas (campañas y artículos) se mantiene ---
  // En un proyecto real, estos datos vendrían de una base de datos o CMS.

  // Ejemplo para campañas
  const campaigns = [{ id: "12157", updatedAt: new Date() }];
  const campaignPages: MetadataRoute.Sitemap = campaigns.map((campaign) => ({
    url: `${baseUrl}${routes.campaign.path({ campaignId: campaign.id })}`,
    lastModified: campaign.updatedAt,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Ejemplo para artículos de noticias
  const articles = [{ slug: "5-superalimentos", updatedAt: new Date() }];
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}${routes.newsArticle.path({ slug: article.slug })}`,
    lastModified: article.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPortalPages, ...campaignPages, ...articlePages];
}
// src/app/sitemap.ts
