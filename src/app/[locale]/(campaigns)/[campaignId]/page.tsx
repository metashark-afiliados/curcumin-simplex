// frontend/src/app/[locale]/(campaigns)/[campaignId]/page.tsx
/**
 * @file page.tsx (Campaña Dinámica)
 * @description Ensamblador principal para todas las landing pages de campañas.
 *              Este es un Componente de Servidor (RSC) y su función es `async` por
 *              diseño para cumplir con el contrato de API del App Router de Next.js,
 *              que puede pasar props como `params` de forma asíncrona.
 * @version 8.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CampaignThemeProvider } from "@/components/layout/CampaignThemeProvider";
import { SectionRenderer } from "@/components/layout/SectionRenderer";
import { getCampaignData } from "@/lib/i18n/campaign.i18n";
import { supportedLocales, type Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";

// --- TIPOS Y CONTRATOS ---
interface CampaignPageProps {
  params: { campaignId: string; locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}

type MetadataProps = Omit<CampaignPageProps, "searchParams">;

// --- GENERACIÓN DE RUTAS ESTÁTICAS ---
export const dynamicParams = true;

export async function generateStaticParams() {
  // En el futuro, esto podría leer el directorio de campañas dinámicamente.
  const campaigns = [{ id: "12157" }];
  const params = campaigns.flatMap((campaign) =>
    supportedLocales.map((locale) => ({
      campaignId: campaign.id,
      locale: locale,
    }))
  );
  return params;
}

// --- METADATOS DINÁMICOS ---
export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  try {
    // La variante para metadata siempre será la '01' por defecto o la que se defina como canónica.
    const { dictionary } = await getCampaignData(
      params.campaignId,
      params.locale,
      "01"
    );
    return {
      title: dictionary.metadata.title, // Asumiendo que el diccionario de campaña lo incluirá
      description: dictionary.metadata.description,
    };
  } catch (error) {
    clientLogger.warn(
      `[Metadata] No se pudieron generar metadatos para la campaña ${params.campaignId}. Se usarán los globales.`,
      { error }
    );
    return {};
  }
}

// --- COMPONENTE DE PÁGINA ---
export default async function CampaignPage({
  params,
  searchParams,
}: CampaignPageProps): Promise<React.ReactElement> {
  // Determina la variante a renderizar desde los parámetros de búsqueda, con un fallback a '01'.
  const variantId =
    typeof searchParams.v === "string" && searchParams.v
      ? searchParams.v
      : "01";

  clientLogger.info(
    `[CampaignPage] Renderizando. Campaña: ${params.campaignId}, Locale: ${params.locale}, Variante: ${variantId}`
  );

  try {
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
  } catch (error) {
    clientLogger.error(
      `[CampaignPage] Error al obtener datos para la campaña ${params.campaignId} (variante ${variantId}). Redirigiendo a not-found.`,
      { error }
    );
    // Si getCampaignData falla (ej. variante o campaña no existe), muestra la página 404.
    notFound();
  }
}
// frontend/src/app/[locale]/(campaigns)/[campaignId]/page.tsx
