// src/lib/schemas/components/header.schema.ts
import { z } from "zod";

/**
 * @file header.schema.ts
 * @description Esquema de Zod que define el contrato de datos para el contenido
 *              de internacionalización del componente Header de Global Fitwell.
 * @version 4.0.0
 */

export const HeaderLocaleSchema = z.object({
  header: z.object({
    logoUrl: z.string(),
    logoAlt: z.string(),
    campaignPills: z.array(
      // <<-- CORREGIDO: de navLinks a campaignPills
      z.object({
        label: z.string(),
        href: z.string(),
      })
    ),
    ctaButton: z.string(),
  }),
});

export const HeaderI18nSchema = z.object({
  "es-ES": HeaderLocaleSchema,
  "pt-BR": HeaderLocaleSchema,
  "en-US": HeaderLocaleSchema,
  "it-IT": HeaderLocaleSchema,
});
// src/lib/schemas/components/header.schema.ts
