// frontend/src/app/[locale]/(campaigns)/[campaignId]/page.tsx
/**
 * @file page.tsx (Dynamic Campaign Page)
 * @description Motor de renderizado para todas las landing pages de campaña.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/(campaigns)/[campaignId]/page.tsx.md
 */
import React from "react";
import { notFound } from "next/navigation";
import { CampaignThemeProvider } from "@/components/layout/CampaignThemeProvider";
import { SectionRenderer } from "@/components/layout/SectionRenderer";
import { getCampaignData } from "@/lib/i18n/campaign.i18n";
import { type Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";
import campaignMap from "@/content/campaigns/12157/campaign.map.json";

interface CampaignPageProps {
  params: {
    locale: Locale;
    campaignId: string;
  };
  searchParams: {
    v?: string;
  };
}

// --- GENERACIÓN DE RUTAS ESTÁTICAS ---
export async function generateStaticParams() {
  // En un futuro, podría leer múltiples mapas de campaña.
  const campaignId = campaignMap.productId;
  const variants = Object.keys(campaignMap.variants);
  const locales = ["it-IT", "es-ES", "en-US", "pt-BR"];

  const params = locales.flatMap((locale) =>
    variants.map((v) => ({
      campaignId,
      locale,
      // Aunque 'v' es un searchParam, pre-generar las páginas para cada variante
      // es una estrategia de optimización para SSG.
    }))
  );
  return params;
}

// --- COMPONENTE DE PÁGINA ---
export default async function CampaignPage({
  params,
  searchParams,
}: CampaignPageProps): Promise<React.ReactElement> {
  const variantId = searchParams.v || "01"; // Fallback a la variante '01'

  clientLogger.info(
    `[CampaignPage] Renderizando campaña: ${params.campaignId}, Variante: ${variantId}, Locale: ${params.locale}`
  );

  try {
    const { dictionary, theme } = await getCampaignData(
      params.campaignId,
      params.locale,
      variantId
    );

    return (
      <CampaignThemeProvider theme={theme}>
        {theme.layout.sections.map((section, index) => (
          <SectionRenderer
            key={`${section.name}-${index}`}
            sectionName={section.name}
            dictionary={dictionary}
            locale={params.locale}
          />
        ))}
      </CampaignThemeProvider>
    );
  } catch (error) {
    clientLogger.error(
      `[CampaignPage] Error al obtener datos para la campaña ${params.campaignId}, variante ${variantId}.`,
      { error }
    );
    notFound(); // Redirige a la página 404
  }
}
// frontend/src/app/[locale]/(campaigns)/[campaignId]/page.tsx
