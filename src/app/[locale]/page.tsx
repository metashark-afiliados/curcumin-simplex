// frontend/src/app/[locale]/page.tsx
/**
 * @file page.tsx (Homepage)
 * @description Página de inicio del portal de contenidos "Global Fitwell".
 *              - v7.0.0: Refactorización sistémica. Se elimina el `await`
 *                incorrecto sobre `params` para alinear con el comportamiento
 *                real de Next.js, manteniendo la firma `async` para la
 *                compatibilidad de tipos.
 * @version 7.0.0
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
// <<-- SOLUCIÓN: La función del componente DEBE ser `async`.
export default async function HomePage({
  params,
}: HomePageProps): Promise<React.ReactElement> {
  // <<-- CORRECCIÓN: Se elimina `await` y se usa `params` directamente.
  clientLogger.info(
    `[HomePage] Renderizando Homepage del Portal para el locale: ${params.locale}`
  );

  const t = await getDictionary(params.locale);

  return (
    <>
      {t.heroNews && <HeroNews content={t.heroNews} />}
      {t.socialProof && <SocialProofLogos content={t.socialProof} />}
      {t.productShowcase && <ProductShowcase content={t.productShowcase} />}
      {t.newsGrid && <NewsGrid content={t.newsGrid} />}
    </>
  );
}
// frontend/src/app/[locale]/page.tsx
