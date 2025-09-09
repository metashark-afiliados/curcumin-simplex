// src/lib/schemas/components/header.schema.ts
import { z } from "zod";

/**
 * @file header.schema.ts
 * @description Esquema de Zod que define el contrato de datos para el contenido
 *              de internacionalización del componente Header.
 * @version 2.0.0
 */

// Define la estructura para un único locale.
export const HeaderLocaleSchema = z.object({
  header: z.object({
    ctaButton: z.string(),
    affiliateUrl: z.string().url(),
    logoUrl: z.string(),
    logoAlt: z.string(),
    homeAriaLabel: z.string(),
  }),
});

// Define la estructura completa del archivo .i18n.json.
export const HeaderI18nSchema = z.object({
  "es-ES": HeaderLocaleSchema,
  "pt-BR": HeaderLocaleSchema,
  "en-US": HeaderLocaleSchema,
  "it-IT": HeaderLocaleSchema,
});
// src/lib/schemas/components/header.schema.ts
