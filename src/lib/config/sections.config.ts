// src/lib/config/sections.config.ts
import { z } from "zod";

/**
 * @file sections.config.ts
 * @description SSoT para la configuración de renderizado de secciones de la página.
 *              Define el schema y la lógica para parsear la configuración
 *              desde las variables de entorno.
 * @version 2.0.0
 * @date 2025-09-09
 */

// Define los nombres válidos de las secciones para una validación estricta.
export const sectionNames = [
  "Hero",
  "SocialProofLogos",
  "BenefitsSection",
  "IngredientAnalysis",
  "ThumbnailCarousel",
  "TestimonialGrid",
  "DoubleScrollingBanner",
  "FaqAccordion",
  "GuaranteeSection",
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
 * @returns {SectionConfig[]} Un array ordenado de las configuraciones de sección.
 */
function parseSectionsConfig(): SectionConfig[] {
  console.log("[Observabilidad] Parseando configuración de secciones desde .env");
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
        // Opcional: lanzar un error para detener el build si la config es crítica
        // throw new Error(`Configuración inválida para SECTION_${name}`);
      }
    }
  }
  // Valida el array completo al final
  z.array(SectionConfigSchema).parse(configuredSections);

  return configuredSections.sort((a, b) => a.order - b.order);
}

/**
 * Configuración de las secciones exportada y lista para ser usada.
 * Se filtra para incluir solo las secciones habilitadas.
 */
export const activeSections = parseSectionsConfig().filter(
  (s) => s.isEnabled
);
// src/lib/config/sections.config.ts