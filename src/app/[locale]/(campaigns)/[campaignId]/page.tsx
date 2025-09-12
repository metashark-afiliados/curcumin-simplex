// frontend/src/app/[locale]/(campaigns)/[campaignId]/page.tsx
/**
 * @file page.tsx (Campaña Dinámica)
 * @description Ensamblador "Lego" para todas las landing pages de campañas.
 *              - v7.0.0: Refactorización sistémica para manejar props asíncronas
 *                de RSC (`params`, `searchParams`), resolviendo el error de build
 *                de incompatibilidad de tipos con `PageProps` de Next.js.
 * @version 7.0.0
 * @author RaZ podesta - MetaShark Tech
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

export async function generateStaticParams() {
  const campaigns = [{ id: "12157" }];
  const params = campaigns.flatMap((campaign) =>
    supportedLocales.map((locale) => ({
      campaignId: campaign.id,
      locale: locale,
    }))
  );
  return params;
}

// <<-- SOLUCIÓN CANÓNICA: La función del componente DEBE ser `async`
export default async function CampaignPage(
  props: CampaignPageProps
): Promise<React.ReactElement> {
  const { params, searchParams } = props;

  const variantId =
    typeof searchParams.v === "string" && searchParams.v
      ? searchParams.v
      : "01";

  clientLogger.info(
    `[CampaignPage] Renderizando Campaña. ID: ${params.campaignId}, Locale: ${params.locale}, Variante: ${variantId}`
  );

  const { dictionary, theme } = await getCampaignData(
    params.campaignId,
    params.locale,
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
          locale={params.locale}
        />
      ))}
    </CampaignThemeProvider>
  );
}
// frontend/src/app/[locale]/(campaigns)/[campaignId]/page.tsx
