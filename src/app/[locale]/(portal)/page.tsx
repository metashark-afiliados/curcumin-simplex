// frontend/src/app/[locale]/(portal)/page.tsx
/**
 * @file page.tsx (Homepage)
 * @description Página de inicio del portal Global Fitwell. Actúa como un hub de
 *              contenido, ensamblando diversas secciones para presentar las últimas
 *              novedades y productos.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/(portal)/page.tsx.md
 */
import React from "react";
import { HeroNews } from "@/components/sections/HeroNews";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { SocialProofLogos } from "@/components/sections/SocialProofLogos";
import { getDictionary } from "@/lib/i18n";
import { type Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface HomePageProps {
  params: { locale: Locale };
}

/**
 * @component HomePage
 * @description Orquesta el renderizado de la página de inicio del portal.
 * @param {HomePageProps} props Las propiedades de la página, incluyendo el locale.
 * @returns {Promise<React.ReactElement>} El elemento JSX de la página de inicio.
 */
export default async function HomePage({
  params,
}: HomePageProps): Promise<React.ReactElement> {
  clientLogger.info(`[HomePage] Renderizando para el locale: ${params.locale}`);

  const t: Dictionary = await getDictionary(params.locale);

  // Guarda de seguridad para asegurar que el contenido de las secciones existe
  if (!t.heroNews || !t.newsGrid || !t.productShowcase || !t.socialProof) {
    clientLogger.error(
      "[HomePage] Faltan datos críticos en el diccionario para renderizar la página de inicio.",
      {
        hasHeroNews: !!t.heroNews,
        hasNewsGrid: !!t.newsGrid,
        hasProductShowcase: !!t.productShowcase,
        hasSocialProof: !!t.socialProof,
      }
    );
    // En un caso real, podríamos renderizar un estado de error más elegante.
    throw new Error(
      "No se pudo renderizar la página de inicio debido a datos de contenido faltantes."
    );
  }

  return (
    <>
      <HeroNews content={t.heroNews} />
      <SocialProofLogos content={t.socialProof} />
      <NewsGrid content={t.newsGrid} />
      <ProductShowcase content={t.productShowcase} />
    </>
  );
}
// frontend/src/app/[locale]/(portal)/page.tsx
