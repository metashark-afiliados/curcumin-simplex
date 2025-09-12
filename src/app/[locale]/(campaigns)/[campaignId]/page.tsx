// frontend/src/app/[locale]/(campaigns)/[campaignId]/page.tsx
/**
 * @file page.tsx (Campaña Dinámica)
 * @description Ensamblador principal para todas las landing pages de campañas.
 *              - v9.0.0: Refactorizada la función `generateStaticParams` para que
 *                descubra dinámicamente las campañas desde el sistema de archivos,
 *                eliminando datos harcodeados y haciendo el sistema robusto y escalable.
 * @version 9.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import fs from "fs/promises";
import path from "path";
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

// --- GENERACIÓN DE RUTAS ESTÁTICAS (DINÁMICA) ---
export const dynamicParams = true;

/**
 * @function generateStaticParams
 * @description Descubre dinámicamente las campañas existentes leyendo los directorios
 *              en `src/content/campaigns` y genera los parámetros para todas las
 *              combinaciones de campaña y locale soportadas.
 * @returns {Promise<{ campaignId: string; locale: Locale }[]>}
 */
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
    // Asumiendo que el diccionario global o de campaña contendrá una clave 'metadata'
    return {
      title: dictionary.metadata?.title || `Campaña ${params.campaignId}`,
      description:
        dictionary.metadata?.description ||
        `Contenido de la campaña ${params.campaignId}`,
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
