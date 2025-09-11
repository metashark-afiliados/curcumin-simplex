// src/app/[locale]/page.tsx
/**
 * @file page.tsx (Homepage)
 * @description Página de inicio del portal de contenidos "Global Fitwell".
 *              Corregido para pasar las props a los componentes de sección
 *              según sus nuevos contratos (prop `content`).
 * @version 5.1.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/page.md
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { HeroNews } from "@/components/sections/HeroNews";
import { clientLogger } from "@/lib/logging";
import { DevHomepageHeader } from "@/components/layout/DevHomepageHeader";
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
      {process.env.NODE_ENV === "development" &&
        t.devHomepageHeader &&
        t.devRouteMenu && (
          <DevHomepageHeader
            dictionary={t.devHomepageHeader}
            devRouteMenuDictionary={t.devRouteMenu}
          />
        )}

      {/* <<-- CORRECCIÓN: Se pasa el objeto `content` completo a cada componente. --> */}
      {t.heroNews && <HeroNews content={t.heroNews} />}
      {t.socialProof && <SocialProofLogos content={t.socialProof} />}
      {t.productShowcase && <ProductShowcase content={t.productShowcase} />}
      {t.newsGrid && <NewsGrid content={t.newsGrid} />}
    </>
  );
}
// src/app/[locale]/page.tsx
