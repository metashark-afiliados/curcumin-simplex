// src/app/[locale]/page.tsx
/**
 * @file page.tsx (Homepage)
 * @description Página de inicio del portal de contenidos "Global Fitwell".
 *              ACTUALIZACIÓN: Se ha corregido el paso de props al componente
 *              `DevHomepageHeader` para alinearlo con su nuevo contrato de API,
 *              pasando `devRouteMenuDictionary` en lugar del obsoleto `routeTester`.
 * @version 4.1.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/page.md
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { HeroNews } from "@/components/sections/HeroNews";
import { clientLogger } from "@/lib/logging";
import { DevHomepageHeader } from "@/components/layout/DevHomepageHeader";
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
        t.devRouteMenu && ( // <<-- CORRECCIÓN: Se verifica la existencia de la clave correcta
          <DevHomepageHeader
            dictionary={t.devHomepageHeader}
            // <<-- CORRECCIÓN: Se pasa el diccionario correcto a la prop correcta
            devRouteMenuDictionary={t.devRouteMenu}
          />
        )}

      {t.heroNews && <HeroNews {...t.heroNews} />}
      {t.newsGrid && <NewsGrid {...t.newsGrid} />}
    </>
  );
}
// src/app/[locale]/page.tsx
