// src/app/[locale]/(campaigns)/[campaignId]/page.tsx
/**
 * @file page.tsx (Campaña Dinámica)
 * @description Ensamblador "Lego" para todas las landing pages de campañas.
 *              Refactorizado para esperar (await) las props `params` y `searchParams`
 *              antes de su uso, resolviendo un error de ejecución crítico en RSC.
 *              Se añade generateStaticParams para optimización de build y se mejora
 *              la lógica de extracción del `variantId` para mayor robustez.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/(campaigns)/[campaignId]/page.tsx.md
 */
import React from "react";
import { CampaignThemeProvider } from "@/components/layout/CampaignThemeProvider";
import { SectionRenderer } from "@/components/layout/SectionRenderer";
import { getCampaignData } from "@/lib/i18n/campaign.i18n";
import { supportedLocales, type Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";

export const dynamicParams = true;

interface CampaignPageProps {
  params: {
    campaignId: string;
    locale: Locale;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

/**
 * @function generateStaticParams
 * @description Pre-renderiza las rutas base de la campaña para todos los locales
 *              soportados durante el build, mejorando el rendimiento (SSG).
 * @returns {Promise<{ campaignId: string; locale: Locale }[]>} Un array de objetos de parámetros.
 */
export async function generateStaticParams() {
  // En un futuro, esto podría leer una lista de IDs de campaña de un CMS o config.
  const campaigns = [{ id: "12157" }];
  const params = campaigns.flatMap((campaign) =>
    supportedLocales.map((locale) => ({
      campaignId: campaign.id,
      locale: locale,
    }))
  );
  clientLogger.info(
    `[CampaignPage] Generando static params para ${params.length} rutas de campaña base.`
  );
  return params;
}

/**
 * @component CampaignPage
 * @description Componente de servidor asíncrono que renderiza una landing page de campaña.
 * @param {CampaignPageProps} props Las props de la página, que son promesas.
 * @returns {Promise<React.ReactElement>} El elemento JSX de la página de campaña.
 */
export default async function CampaignPage(
  props: CampaignPageProps
): Promise<React.ReactElement> {
  // <<-- SOLUCIÓN CRÍTICA: Se esperan las props `params` y `searchParams` antes de usarlas.
  const { params, searchParams } = props;
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  // <<-- MEJORA DE ROBUSTEZ: Se valida que `v` sea un string no vacío.
  const variantId =
    typeof awaitedSearchParams.v === "string" && awaitedSearchParams.v
      ? awaitedSearchParams.v
      : "01"; // Fallback a la variante '01' si no se especifica o está vacío.

  clientLogger.info(
    `[CampaignPage] Renderizando Campaña. ID: ${awaitedParams.campaignId}, Locale: ${awaitedParams.locale}, Variante: ${variantId}`
  );

  const { dictionary, theme } = await getCampaignData(
    awaitedParams.campaignId,
    awaitedParams.locale,
    variantId
  );

  const sectionsToRender = theme.layout.sections;

  return (
    <CampaignThemeProvider theme={theme}>
      {sectionsToRender.map((section) => (
        <SectionRenderer
          key={section.name}
          sectionName={section.name}
          dictionary={dictionary}
          locale={awaitedParams.locale}
        />
      ))}
    </CampaignThemeProvider>
  );
}
// src/app/[locale]/(campaigns)/[campaignId]/page.tsx
