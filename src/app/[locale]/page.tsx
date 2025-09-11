// src/app/[locale]/page.tsx
/**
 * @file page.tsx (Homepage)
 * @description Página de inicio del portal de contenidos "Global Fitwell".
 *              - v6.0.0: Solución arquitectónica. Se elimina la renderización
 *                del DevHomepageHeader para erradicar el problema del "doble header".
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { HeroNews } from "@/components/sections/HeroNews";
import { clientLogger } from "@/lib/logging";
import { SocialProofLogos } from "@/components/sections/SocialProofLogos";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { type Locale } from "@/lib/i18n.config";

interface HomePageProps {
  params: {
    locale: Locale;
  };
}

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
      {/* <<-- CORRECCIÓN ARQUITECTÓNICA: DevHomepageHeader ELIMINADO -->> */}
      {/* El Header principal en layout.tsx es ahora la única fuente de navegación. */}

      {t.heroNews && <HeroNews content={t.heroNews} />}
      {t.socialProof && <SocialProofLogos content={t.socialProof} />}
      {t.productShowcase && <ProductShowcase content={t.productShowcase} />}
      {t.newsGrid && <NewsGrid content={t.newsGrid} />}
    </>
  );
}
// src/app/[locale]/page.tsx
