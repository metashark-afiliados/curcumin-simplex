// src/lib/schemas/i18n.schema.ts
/**
 * @file i18n.schema.ts
 * @description SSoT Ensamblador para la estructura de datos de i18n global.
 *              Corregido con la sintaxis correcta de Zod para fusión de schemas opcionales.
 * @version 11.1.0
 * @author RaZ podesta - MetaShark Tech
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
import { DoubleScrollingBannerLocaleSchema } from "./components/double-scrolling-banner.schema";
import { FaqAccordionLocaleSchema } from "./components/faq-accordion.schema";
import { GuaranteeSectionLocaleSchema } from "./components/guarantee-section.schema";
import { OrderFormLocaleSchema } from "./components/order-form.schema";
import { NewsGridLocaleSchema } from "./components/news-grid.schema";
import { HeroNewsLocaleSchema } from "./components/hero-news.schema";
import { ProductShowcaseLocaleSchema } from "./components/product-showcase.schema";

// --- Importaciones de Schemas de Páginas ---
import { StorePageLocaleSchema } from "./pages/store-page.schema";
import { TextPageLocaleSchema } from "./pages/text-page.schema";

export const i18nSchema = GlobalsLocaleSchema.merge(HeaderLocaleSchema)
  .merge(FooterLocaleSchema)
  .merge(ScrollingBannerLocaleSchema)
  .merge(NewsGridLocaleSchema)
  .merge(HeroLocaleSchema)
  .merge(SocialProofLocaleSchema)
  .merge(BenefitsSectionLocaleSchema)
  .merge(IngredientAnalysisLocaleSchema)
  .merge(ThumbnailCarouselLocaleSchema)
  .merge(TestimonialGridLocaleSchema)
  .merge(DoubleScrollingBannerLocaleSchema)
  .merge(FaqAccordionLocaleSchema)
  .merge(GuaranteeSectionLocaleSchema)
  .merge(OrderFormLocaleSchema)
  .merge(HeroNewsLocaleSchema)
  .merge(ProductShowcaseLocaleSchema)
  // --- Integración de Schemas de Páginas CORREGIDA ---
  // <<-- CORRECCIÓN: Se utiliza .merge() directamente.
  // La opcionalidad ya está definida dentro de `StorePageLocaleSchema`
  // con la clave `storePage: z.object(...).optional()`.
  .merge(StorePageLocaleSchema)
  .merge(z.object({ aboutPage: TextPageLocaleSchema.optional() }))
  .merge(z.object({ privacyPage: TextPageLocaleSchema.optional() }))
  .merge(z.object({ termsPage: TextPageLocaleSchema.optional() }));

export type Dictionary = z.infer<typeof i18nSchema>;
// src/lib/schemas/i18n.schema.ts
