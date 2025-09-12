// src/app/[locale]/(dev)/dev/page.tsx
/**
 * @file page.tsx (Developer Command Center Dashboard)
 * @description Página de inicio para el entorno de desarrollo. Refactorizada para
 *              un manejo de errores y contenido robusto y "type-safe".
 * @version 5.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/(dev)/dev/page.tsx.md
 */
import React from "react";
import Link from "next/link";
import { LayoutDashboard, Paintbrush, Rocket } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/i18n";
import { type Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";
import { routes } from "@/lib/navigation";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface DevDashboardPageProps {
  params: {
    locale: Locale;
  };
}

/**
 * @component DevDashboardPage
 * @description Renderiza el dashboard principal del Developer Command Center,
 *              proporcionando acceso a las diferentes herramientas de desarrollo.
 * @param {DevDashboardPageProps} props Las props de la página, que son promesas.
 * @returns {Promise<React.ReactElement>} El elemento JSX del dashboard.
 */
export default async function DevDashboardPage({
  params,
}: DevDashboardPageProps): Promise<React.ReactElement> {
  const awaitedParams = await params;
  clientLogger.info(
    `[DevDashboardPage] Renderizando DCC para locale: ${awaitedParams.locale}`
  );

  let t: Dictionary;
  try {
    t = await getDictionary(awaitedParams.locale);
  } catch (error) {
    // <<-- MEJORA: Manejo de errores "type-safe".
    const errorContext =
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : { error: String(error) };
    clientLogger.error(
      "[DevDashboardPage] Fallo crítico al cargar el diccionario.",
      errorContext
    );
    // Renderiza un estado de error claro para el desarrollador.
    return (
      <Container className="py-12 text-center">
        <h1 className="text-4xl font-bold text-destructive">
          Error: No se pudo cargar el diccionario de contenido.
        </h1>
        <p className="text-muted-foreground">
          Verifique que los archivos i18n son correctos y revise los logs del servidor.
        </p>
      </Container>
    );
  }

  const content = t.devDashboardPage;
  const devToolsConfig = [
    {
      key: "componentCanvas",
      href: routes.devDashboard.path({ locale: awaitedParams.locale }), // Fallback a dev dashboard por ahora
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
    clientLogger.warn("[DevDashboardPage] Contenido 'devDashboardPage' no encontrado en el diccionario.");
    return (
      <Container className="py-12 text-center">
        <h1 className="text-4xl font-bold text-destructive">
          Error: Contenido del Dashboard no encontrado.
        </h1>
        <p className="text-muted-foreground">
          Asegúrese de que la clave 'devDashboardPage' existe en los archivos i18n.
        </p>
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
          // <<-- MEJORA: Renderizado defensivo.
          if (!toolContent) {
            clientLogger.warn(`[DevDashboardPage] Contenido para la herramienta '${tool.key}' no encontrado.`);
            return null;
          }
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