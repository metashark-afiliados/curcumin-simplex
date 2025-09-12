// src/app/[locale]/page.tsx
/**
 * @file page.tsx (Homepage)
 * @description Página de inicio del portal de contenidos "Global Fitwell".
 *              - v6.0.0: Solución arquitectónica. Se elimina la renderización
 *                del DevHomepageHeader para erradicar el problema del "doble header"
 *                y simplificar la estructura de la UI.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/page.tsx.md
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { HeroNews } from "@/components/sections/HeroNews";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { SocialProofLogos } from "@/components/sections/SocialProofLogos";
import { type Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";

interface HomePageProps {
  params: {
    locale: Locale;
  };
}

/**
 * @component HomePage
 * @description Orquesta y renderiza las secciones de contenido para la página de inicio del portal.
 * @param {HomePageProps} props Las props de la página.
 * @returns {Promise<React.ReactElement>} El elemento JSX de la página de inicio.
 */
export default async function HomePage({
  params,
}: HomePageProps): Promise<React.ReactElement> {
  const awaitedParams = await params;
  clientLogger.info(
    `[HomePage] Renderizando Homepage del Portal para el locale: ${awaitedParams.locale}`
  );

  const t = await getDictionary(awaitedParams.locale);

  return (
    <>
      {/* <<-- SOLUCIÓN ARQUITECTÓNICA: DevHomepageHeader ELIMINADO -->> */}
      {/* El Header principal en `LocaleLayout` es ahora la única fuente de navegación y herramientas de desarrollo. */}

      {t.heroNews && <HeroNews content={t.heroNews} />}
      {t.socialProof && <SocialProofLogos content={t.socialProof} />}
      {t.productShowcase && <ProductShowcase content={t.productShowcase} />}
      {t.newsGrid && <NewsGrid content={t.newsGrid} />}
    </>
  );
}
// src/app/[locale]/page.tsx
