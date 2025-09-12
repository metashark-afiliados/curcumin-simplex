// frontend/src/app/[locale]/(campaigns)/[campaignId]/page.tsx
/**
 * @file page.tsx (Campaña Dinámica)
 * @description Ensamblador principal para todas las landing pages de campañas.
 *              - v10.0.0: Resuelve un error crítico de build (TS2339) al eliminar
 *                los tipos de props personalizados y dejar que TypeScript infiera
 *                directamente del contrato `PageProps` de Next.js. Se mejora la
 *                observabilidad con logs de contexto más ricos.
 * @version 10.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next"; // Importar ResolvingMetadata
import { CampaignThemeProvider } from "@/components/layout/CampaignThemeProvider";
import { SectionRenderer } from "@/components/layout/SectionRenderer";
import { getCampaignData } from "@/lib/i18n/campaign.i18n";
import { supportedLocales, type Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";

// --- TIPOS Y CONTRATOS (AHORA INFERIDOS POR NEXT.JS) ---
// Se eliminan las interfaces CampaignPageProps y MetadataProps.
// El tipo PageProps será inferido por TypeScript en la firma de las funciones.
type PageProps = {
  params: { campaignId: string; locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

// --- GENERACIÓN DE RUTAS ESTÁTICAS (DINÁMICA) ---
export const dynamicParams = true;

export async function generateStaticParams() {
  clientLogger.info(
    "[generateStaticParams] Descubriendo campañas para pre-renderizado..."
  );
  try {
    const campaignsDir = path.join(process.cwd(), "src/content/campaigns");
    const campaignDirs = await fs.readdir(campaignsDir, {
      withFileTypes: true,
    });

    const campaignIds = campaignDirs
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    if (campaignIds.length === 0) {
      clientLogger.warn(
        "[generateStaticParams] No se encontraron directorios de campaña."
      );
      return [];
    }

    clientLogger.info(
      `[generateStaticParams] Campañas descubiertas: ${campaignIds.join(", ")}`
    );

    const params = campaignIds.flatMap((campaignId) =>
      supportedLocales.map((locale) => ({
        campaignId,
        locale,
      }))
    );

    clientLogger.success(
      `[generateStaticParams] Generados ${params.length} parámetros estáticos.`
    );
    return params;
  } catch (error) {
    clientLogger.error(
      "[generateStaticParams] Fallo al leer directorios de campaña. El pre-renderizado puede ser incompleto.",
      { error }
    );
    return [];
  }
}

// --- METADATOS DINÁMICOS ---
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata // parent es opcional pero buena práctica incluirlo
): Promise<Metadata> {
  const trace = clientLogger.startTrace("generate-metadata");
  clientLogger.traceEvent(trace, "Inicio de generación de metadatos", {
    params,
  });
  try {
    const { dictionary } = await getCampaignData(
      params.campaignId,
      params.locale,
      "01" // La variante para metadata siempre es la canónica '01'.
    );

    const title = dictionary.metadata?.title || `Campaña ${params.campaignId}`;
    const description =
      dictionary.metadata?.description ||
      `Contenido de la campaña ${params.campaignId}`;

    clientLogger.traceEvent(trace, "Metadatos generados exitosamente", {
      title,
    });
    clientLogger.endTrace(trace);

    return { title, description };
  } catch (error) {
    clientLogger.error(
      `[Metadata] No se pudieron generar metadatos para la campaña ${params.campaignId}.`,
      { error, params }
    );
    clientLogger.endTrace(trace);
    return {};
  }
}

// --- COMPONENTE DE PÁGINA ---
export default async function CampaignPage({
  params,
  searchParams,
}: PageProps): Promise<React.ReactElement> {
  const variantId =
    typeof searchParams.v === "string" && searchParams.v
      ? searchParams.v
      : "01";
  const trace = clientLogger.startTrace("render-campaign-page");

  const context = {
    campaignId: params.campaignId,
    locale: params.locale,
    variantId: variantId,
  };
  clientLogger.traceEvent(trace, "Inicio de renderizado de página", context);

  try {
    const { dictionary, theme } = await getCampaignData(
      params.campaignId,
      params.locale,
      variantId
    );
    clientLogger.traceEvent(trace, "Datos de campaña cargados", {
      themeName: theme.layout.sections[0].name,
    });

    const sectionsToRender = theme.layout.sections;

    const pageElement = (
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

    clientLogger.endTrace(trace);
    return pageElement;
  } catch (error) {
    clientLogger.error(
      `[CampaignPage] Error al obtener datos. Redirigiendo a not-found.`,
      { ...context, error }
    );
    clientLogger.endTrace(trace);
    notFound();
  }
}
// frontend/src/app/[locale]/(campaigns)/[campaignId]/page.tsx
