// src/app/[locale]/(dev)/dev/simulator/page.tsx
/**
 * @file page.tsx (Campaign Simulator)
 * @description Página principal del Simulador de Campañas.
 *              Refactorizada para utilizar la clave de ruta correcta ('campaign')
 *              desde el manifiesto de navegación, resolviendo un error de tipo TS2339,
 *              y nivelada a los estándares de calidad del proyecto.
 * @devonly
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/(dev)/dev/simulator/page.tsx.md
 */
import React from "react";
import Link from "next/link";
import { ExternalLink, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/i18n";
import { type Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";
import campaignMapData from "@/content/campaigns/12157/campaign.map.json";
import { routes } from "@/lib/navigation";

// --- CAPA DE DATOS Y TIPOS ---

interface VariantData {
  name: string;
  description: string;
  theme: string;
  content: string;
}
interface CampaignMap {
  productId: string;
  campaignName: string;
  description: string;
  variants: Record<string, VariantData>;
}
interface Campaign {
  id: string;
  name: string;
  variants: { id: string; name: string; description: string; url: string }[];
}

/**
 * @function getAvailableCampaigns
 * @description Lógica de obtención de datos para el simulador. Lee el manifiesto de
 *              mapeo y lo transforma en una estructura de datos lista para renderizar.
 * @param {Locale} locale - El locale actual para construir las URLs correctamente.
 * @returns {Promise<Campaign[]>} Un array de campañas con sus variantes.
 */
async function getAvailableCampaigns(locale: Locale): Promise<Campaign[]> {
  clientLogger.trace("[Dev/Simulator] Procesando campaign.map.json...");
  const campaignMap: CampaignMap = campaignMapData;
  return [
    {
      id: campaignMap.productId,
      name: campaignMap.campaignName,
      variants: Object.entries(campaignMap.variants).map(
        ([variantId, variantData]) => ({
          id: variantId,
          name: variantData.name,
          description: variantData.description,
          // <<-- SOLUCIÓN: Se utiliza la clave de ruta correcta 'campaign' del snapshot SSoT.
          url: `${routes.campaign.path({ locale, campaignId: campaignMap.productId })}?v=${variantId}`,
        })
      ),
    },
  ];
}

// --- CAPA DE PRESENTACIÓN ---

interface CampaignSimulatorPageProps {
  params: { locale: Locale };
}

export default async function CampaignSimulatorPage({
  params,
}: CampaignSimulatorPageProps): Promise<React.ReactElement> {
  const awaitedParams = await params;
  clientLogger.info(
    `[CampaignSimulatorPage] Renderizando página del simulador para locale: ${awaitedParams.locale}.`
  );

  const [t, campaigns] = await Promise.all([
    getDictionary(awaitedParams.locale),
    getAvailableCampaigns(awaitedParams.locale),
  ]);
  const content = t.devCampaignSimulatorPage;

  if (!content) {
    clientLogger.error(
      "[CampaignSimulatorPage] Contenido 'devCampaignSimulatorPage' no encontrado en el diccionario."
    );
    return (
      <Container className="py-12 text-center text-destructive">
        <h1>Error: Contenido de la página no encontrado</h1>
        <p>
          Asegúrese de que la clave 'devCampaignSimulatorPage' existe en los
          archivos i18n.
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="text-center mb-12">
        <Rocket className="h-12 w-12 mx-auto text-primary" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          {content.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {content.subtitle}
        </p>
      </div>
      <div className="space-y-10">
        {campaigns.map((campaign) => (
          <div key={campaign.id}>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              {content.campaignLabel}:{" "}
              <span className="text-accent">{campaign.name}</span> (ID:{" "}
              {campaign.id})
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {campaign.variants.map((variant) => (
                <Link
                  key={variant.id}
                  href={variant.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Card className="h-full transition-all duration-300 hover:border-primary/80 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-primary group-hover:text-accent transition-colors">
                        {content.variantLabel} {variant.id}: {variant.name}
                      </CardTitle>
                      <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {variant.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
// src/app/[locale]/(dev)/dev/simulator/page.tsx
