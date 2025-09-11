// src/app/[locale]/(dev)/dev/page.tsx
/**
 * @file page.tsx (Developer Command Center Dashboard)
 * @description Página de inicio para el entorno de desarrollo.
 *              CORRECCIÓN: Se reintroduce 'await' para cumplir el contrato de PageProps.
 * @version 3.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import Link from "next/link";
// ... (resto de las importaciones)
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/i18n";
import { clientLogger } from "@/lib/logging";
import { routes } from "@/lib/navigation";
import { type Locale } from "@/lib/i18n.config";
import { Paintbrush, LayoutDashboard, Rocket } from "lucide-react";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface DevDashboardPageProps {
  params: {
    locale: Locale;
  };
}

export default async function DevDashboardPage({
  params,
}: DevDashboardPageProps): Promise<React.ReactElement> {
  const awaitedParams = await params;
  clientLogger.info("[DevDashboardPage] Renderizando DCC");

  const t = await getDictionary(awaitedParams.locale);
  // ... (resto de la lógica del componente)
  const content = t.devDashboardPage;

  const devToolsConfig = [
    {
      key: "componentCanvas",
      href: routes.devComponentCanvas.path({ locale: awaitedParams.locale }),
      icon: <Paintbrush className="h-8 w-8 text-accent" />,
    },
    {
      key: "campaignSimulator",
      href: routes.devCampaignSimulator.path({ locale: awaitedParams.locale }),
      icon: <Rocket className="h-8 w-8 text-accent" />,
    },
    {
      key: "branding",
      href: routes.devBranding.path({ locale: awaitedParams.locale }),
      icon: <LayoutDashboard className="h-8 w-8 text-accent" />,
    },
  ];

  if (!content) {
    return (
      <Container className="py-12">
        <h1 className="text-4xl font-bold text-center text-destructive">
          Error: Contenido del Dashboard no encontrado.
        </h1>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          {content.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{content.subtitle}</p>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {devToolsConfig.map((tool) => {
          const toolContent =
            content.tools[tool.key as keyof typeof content.tools];
          if (!toolContent) return null;
          return (
            <Link
              key={tool.key}
              href={tool.href}
              className="group block rounded-xl border border-white/10 bg-background/50 p-8 shadow-lg transition-all duration-300 hover:border-accent/50 hover:bg-secondary/30 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                {tool.icon}
                <h2 className="text-xl font-bold text-foreground group-hover:text-primary">
                  {toolContent.name}
                </h2>
              </div>
              <p className="mt-4 text-muted-foreground">
                {toolContent.description}
              </p>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
// src/app/[locale]/(dev)/dev/page.tsx
