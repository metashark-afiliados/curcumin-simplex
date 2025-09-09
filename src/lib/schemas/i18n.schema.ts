// src/lib/schemas/i18n.schema.ts
/**
 * @file i18n.schema.ts
 * @description SSoT Ensamblador para la estructura de datos de i18n.
 *              Importa y fusiona todos los esquemas de locale atómicos de los componentes.
 * @version 5.1.0
 */
import { z } from "zod";
import { GlobalsLocaleSchema } from "./globals.schema";
import { HeaderLocaleSchema } from "./components/header.schema";
import { FooterLocaleSchema } from "./components/footer.schema";
import { ScrollingBannerLocaleSchema } from "./components/scrolling-banner.schema";
import { HeroLocaleSchema } from "./components/hero.schema";
import { SocialProofLocaleSchema } from "./components/social-proof.schema";
import { BenefitsSectionLocaleSchema } from "./components/benefits-section.schema";
import { IngredientAnalysisLocaleSchema } from "./components/ingredient-analysis.schema";
import { ThumbnailCarouselLocaleSchema } from "./components/thumbnail-carousel.schema";
import { TestimonialGridLocaleSchema } from "./components/testimonial-grid.schema";

// Fusiona los esquemas de locale globales y de todos los componentes en un único contrato.
export const i18nSchema = GlobalsLocaleSchema.merge(HeaderLocaleSchema)
  .merge(FooterLocaleSchema)
  .merge(ScrollingBannerLocaleSchema)
  .merge(HeroLocaleSchema)
  .merge(SocialProofLocaleSchema)
  .merge(BenefitsSectionLocaleSchema)
  .merge(IngredientAnalysisLocaleSchema)
  .merge(ThumbnailCarouselLocaleSchema)
  .merge(TestimonialGridLocaleSchema);

export type Dictionary = z.infer<typeof i18nSchema>;
// src/lib/schemas/i18n.schema.ts
