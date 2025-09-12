// frontend/src/app/[locale]/(dev)/dev/simulator/page.tsx
/**
 * @file page.tsx (Campaign Simulator)
 * @description Página principal del Simulador de Campañas, una herramienta de desarrollo
 *              clave para previsualizar variantes de landing pages. Como RSC, es `async`
 *              para cumplir con el contrato de API del App Router de Next.js.
 * @devonly
 * @version 6.0.0
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
import { routes } from "@/lib/navigation";
import campaignMapData from "@/content/campaigns/12157/campaign.map.json";

// --- TIPOS Y CONTRATOS ---
interface CampaignSimulatorPageProps {
  params: { locale: Locale };
}
interface Campaign {
  id: string;
  name: string;
  variants: Variant[];
}
interface Variant {
  id: string;
  name: string;
  description: string;
  url: string;
}

// --- LÓGICA DE DATOS ---
async function getAvailableCampaigns(locale: Locale): Promise<Campaign[]> {
  clientLogger.trace("[Dev/Simulator] Procesando campaign.map.json...");
  // NOTA: En un futuro, esta función podría leer múltiples archivos de mapa.
  const campaignMap = campaignMapData;
  return [
    {
      id: campaignMap.productId,
      name: campaignMap.campaignName,
      variants: Object.entries(campaignMap.variants).map(
        ([variantId, variantData]) => ({
          id: variantId,
          name: variantData.name,
          description: variantData.description,
          url: `${routes.campaign.path({ locale, campaignId: campaignMap.productId })}?v=${variantId}`,
        })
      ),
    },
  ];
}

// --- COMPONENTE DE PÁGINA ---
export default async function CampaignSimulatorPage({
  params,
}: CampaignSimulatorPageProps): Promise<React.ReactElement> {
  clientLogger.info(
    `[CampaignSimulatorPage] Renderizando para locale: ${params.locale}.`
  );

  const [t, campaigns] = await Promise.all([
    getDictionary(params.locale),
    getAvailableCampaigns(params.locale),
  ]);
  const content = t.devCampaignSimulatorPage;

  if (!content) {
    clientLogger.error(
      "[CampaignSimulatorPage] Fallo crítico: contenido 'devCampaignSimulatorPage' no encontrado en el diccionario."
    );
    return (
      <Container className="py-12 text-center text-destructive">
        <h1>Error: Contenido de la página no encontrado.</h1>
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
// frontend/src/app/[locale]/(dev)/dev/simulator/page.tsx
