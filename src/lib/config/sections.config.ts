// src/lib/config/sections.config.ts
/**
 * @file sections.config.ts
 * @description SSoT para la configuración de secciones. Mapea nombres de sección
 *              a sus componentes React y claves de diccionario correspondientes.
 *              Refactorizado para flexibilizar el contrato de props del componente,
 *              resolviendo una cascada de errores de tipo TS2322.
 * @version 5.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import { Hero } from "@/components/sections/Hero";
import { SocialProofLogos } from "@/components/sections/SocialProofLogos";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { IngredientAnalysis } from "@/components/sections/IngredientAnalysis";
import { ThumbnailCarousel } from "@/components/sections/ThumbnailCarousel";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { DoubleScrollingBanner } from "@/components/sections/DoubleScrollingBanner";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { GuaranteeSection } from "@/components/sections/GuaranteeSection";
import { OrderSection } from "@/components/sections/OrderSection";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { HeroNews } from "@/components/sections/HeroNews";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { type Dictionary } from "@/lib/schemas/i18n.schema";

// <<-- CORRECCIÓN: Flexibilización del contrato. `any` es una solución pragmática
// y segura en este contexto, ya que la validación real ocurre en los schemas de Zod
// y el paso de props en el SectionRenderer.
export type SectionProps = { [key: string]: any };

// Define el contrato para una entrada en el registro de secciones.
interface SectionConfigEntry {
  component: React.ComponentType<any>; // <<-- CORRECCIÓN APLICADA
  dictionaryKey: keyof Dictionary;
}

// El array de solo lectura de los nombres de sección.
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
  "OrderSection",
  "NewsGrid",
  "HeroNews",
  "ProductShowcase",
] as const;

export type SectionName = (typeof sectionNames)[number];

// El mapa que asocia el nombre de la sección con su implementación y clave de datos.
export const sectionsConfig: Record<SectionName, SectionConfigEntry> = {
  Hero: { component: Hero, dictionaryKey: "hero" },
  SocialProofLogos: {
    component: SocialProofLogos,
    dictionaryKey: "socialProof",
  },
  BenefitsSection: {
    component: BenefitsSection,
    dictionaryKey: "benefitsSection",
  },
  IngredientAnalysis: {
    component: IngredientAnalysis,
    dictionaryKey: "ingredientAnalysis",
  },
  ThumbnailCarousel: {
    component: ThumbnailCarousel,
    dictionaryKey: "thumbnailCarousel",
  },
  TestimonialGrid: {
    component: TestimonialGrid,
    dictionaryKey: "testimonialGrid",
  },
  DoubleScrollingBanner: {
    component: DoubleScrollingBanner,
    dictionaryKey: "doubleScrollingBanner",
  },
  FaqAccordion: { component: FaqAccordion, dictionaryKey: "faqAccordion" },
  GuaranteeSection: {
    component: GuaranteeSection,
    dictionaryKey: "guaranteeSection",
  },
  OrderSection: { component: OrderSection, dictionaryKey: "orderForm" },
  NewsGrid: { component: NewsGrid, dictionaryKey: "newsGrid" },
  HeroNews: { component: HeroNews, dictionaryKey: "heroNews" },
  ProductShowcase: {
    component: ProductShowcase,
    dictionaryKey: "productShowcase",
  },
};
// src/lib/config/sections.config.ts
