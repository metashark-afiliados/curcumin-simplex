// src/app/[locale]/(campaigns)/[campaignId]/page.tsx
/**
 * @file page.tsx (Campaña Dinámica)
 * @description Ensamblador "Lego" para todas las landing pages de campañas.
 *              Integra el CampaignThemeProvider para aplicar estilos dinámicos.
 *              Corregido el error de importación del SectionRenderer.
 * @version 2.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { getCampaignData } from "@/lib/i18n/campaign.i18n";
import { SectionRenderer } from "@/components/layout/SectionRenderer";
import { CampaignThemeProvider } from "@/components/layout/CampaignThemeProvider";

/**
 * @interface CampaignPageProps
 * @description Define las props para la página de campaña, incluyendo
 *              los parámetros de ruta dinámicos `campaignId` y `locale`.
 */
interface CampaignPageProps {
  params: {
    campaignId: string;
    locale: string;
  };
}

/**
 * @component CampaignPage
 * @description Componente de servidor que orquesta el renderizado de una
 *              página de campaña completa. Obtiene los datos de contenido
 *              y tema, aplica el tema visual y luego renderiza las secciones
 *              correspondientes en orden.
 * @param {CampaignPageProps} props - Las propiedades que contienen los Ids.
 * @returns {Promise<React.ReactElement>} El elemento JSX de la página de campaña.
 */
export default async function CampaignPage({ params }: CampaignPageProps) {
  console.log(
    `[Observabilidad] Renderizando Campaña Dinámica. ID: ${params.campaignId}, Locale: ${params.locale}`
  );

  const { dictionary, theme } = await getCampaignData(
    params.campaignId,
    params.locale
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
// src/app/[locale]/(campaigns)/[campaignId]/page.tsx
