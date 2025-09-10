// src/lib/config/sections.config.ts
import { z } from "zod";

/**
 * @file sections.config.ts
 * @description SSoT para la configuración de renderizado de secciones de la página.
 * @version 4.0.0
 */

// Define los nombres válidos de TODAS las secciones para una validación estricta.
export const sectionNames = [
  // Secciones de Campaña Original
  "Hero",
  "SocialProofLogos",
  "BenefitsSection",
  "IngredientAnalysis",
  "ThumbnailCarousel",
  "TestimonialGrid",
  "DoubleScrollingBanner",
  "FaqAccordion",
  "GuaranteeSection",
  "OrderSection",
  // Secciones del Portal / Global Fitwell
  "NewsGrid",
  "HeroNews",
  "ProductShowcase",
] as const;

const SectionNameSchema = z.enum(sectionNames);
export type SectionName = z.infer<typeof SectionNameSchema>;

const SectionConfigSchema = z.object({
  name: SectionNameSchema,
  isEnabled: z.boolean(),
  order: z.number(),
});

export type SectionConfig = z.infer<typeof SectionConfigSchema>;

/**
 * @function parseSectionsConfig
 * @description Itera sobre los nombres de sección definidos, lee las variables
 *              de entorno correspondientes, las parsea y valida.
 * @deprecated Esta lógica ahora solo es relevante para campañas antiguas. Las nuevas
 *             campañas definen su layout en su `theme.json`.
 * @returns {SectionConfig[]} Un array ordenado de las configuraciones de sección.
 */
function parseSectionsConfig(): SectionConfig[] {
  // El log de observabilidad se mantiene por si se usa en contextos legacy.
  console.log(
    "[Observabilidad] Parseando configuración de secciones desde .env (Lógica Legacy)"
  );
  const configuredSections: SectionConfig[] = [];

  for (const name of sectionNames) {
    const envVar = process.env[`SECTION_${name}`];

    if (envVar) {
      try {
        const [visibility, orderStr] = envVar.split(",");
        const order = parseInt(orderStr, 10);
        const isEnabled = visibility === "visible";

        if (isNaN(order)) {
          throw new Error(`Orden inválido para la sección ${name}`);
        }

        configuredSections.push({ name, isEnabled, order });
      } catch (error) {
        console.error(
          `[Configuración] Error al parsear la variable de entorno para la sección ${name}:`,
          error
        );
      }
    }
  }

  z.array(SectionConfigSchema).parse(configuredSections);

  return configuredSections.sort((a, b) => a.order - b.order);
}

/**
 * @deprecated Usar `theme.layout.sections` para nuevas campañas.
 */
export const activeSections = parseSectionsConfig().filter((s) => s.isEnabled);
// src/lib/config/sections.config.ts
