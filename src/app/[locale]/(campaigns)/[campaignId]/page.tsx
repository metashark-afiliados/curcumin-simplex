// frontend/src/app/[locale]/(campaigns)/[campaignId]/page.tsx
/**
 * @file page.tsx (Campaña Dinámica)
 * @description Ensamblador principal para todas las landing pages de campañas.
 *              - v12.0.0: Solución de build definitiva y compatible. Se reintroduce un
 *                tipo `PageProps` local que es estructuralmente idéntico al que Next.js
 *                espera. Esto satisface tanto el chequeo de tipos local (resolviendo
 *                TS2307) como el compilador de Vercel (evitando conflictos de inferencia).
 * @version 12.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { CampaignThemeProvider } from "@/components/layout/CampaignThemeProvider";
import { SectionRenderer } from "@/components/layout/SectionRenderer";
import { getCampaignData } from "@/lib/i18n/campaign.i18n";
import { supportedLocales, type Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";

// --- TIPOS Y CONTRATOS (ESTRATEGIA HÍBRIDA) ---
// Se define un tipo local para satisfacer el chequeo de tipos del editor (tsc).
// Este tipo es estructuralmente compatible con el PageProps interno de Next.js,
// permitiendo que el compilador de Vercel funcione correctamente.
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
  parent: ResolvingMetadata
): Promise<Metadata> {
  const trace = clientLogger.startTrace("generate-metadata");
  clientLogger.traceEvent(trace, "Inicio de generación de metadatos", {
    params,
  });
  try {
    const { dictionary } = await getCampaignData(
      params.campaignId,
      params.locale,
      "01"
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
