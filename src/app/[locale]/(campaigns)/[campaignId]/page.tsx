// src/app/[locale]/(campaigns)/[campaignId]/page.tsx
/**
 * @file page.tsx (Campaña Dinámica)
 * @description Ensamblador "Lego" para todas las landing pages de campañas.
 *              CORRECCIÓN: Se reintroduce el uso de `await params` para cumplir
 *              con el contrato de PageProps de Next.js y resolver el error TS2344.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/(campaigns)/[campaignId]/page.tsx.md
 */
import React from "react";
import { getCampaignData } from "@/lib/i18n/campaign.i18n";
import { SectionRenderer } from "@/components/layout/SectionRenderer";
import { CampaignThemeProvider } from "@/components/layout/CampaignThemeProvider";
import { clientLogger } from "@/lib/logging";
import { supportedLocales, type Locale } from "@/lib/i18n.config";

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
  clientLogger.info(
    `[CampaignPage] Generando static params para ${params.length} rutas de campaña base.`
  );
  return params;
}

export default async function CampaignPage({
  params,
  searchParams,
}: CampaignPageProps) {
  // <<-- CORRECCIÓN: Se reintroduce 'await' para cumplir el contrato de PageProps
  const awaitedParams = await params;

  const variantId =
    typeof searchParams.v === "string" && searchParams.v
      ? searchParams.v
      : "01";

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
