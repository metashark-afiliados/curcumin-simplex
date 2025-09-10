// src/components/layout/SectionRenderer.tsx
import React from "react";
import { type SectionName } from "@/lib/config/sections.config";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
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

/**
 * @file SectionRenderer.tsx
 * @description Componente de renderizado condicional. Actúa como un multiplexor
 *              que recibe un nombre de sección y devuelve el componente React
 *              correspondiente, inyectándole los datos del diccionario.
 * @version 1.0.0
 */

interface SectionRendererProps {
  sectionName: SectionName;
  dictionary: Dictionary;
  locale: string;
}

/**
 * @component SectionRenderer
 * @description Renderiza un componente de sección basado en su nombre.
 * @param {SectionRendererProps} props Las propiedades del componente.
 * @returns {React.ReactElement | null} El componente de sección renderizado o null.
 */
export function SectionRenderer({
  sectionName,
  dictionary,
  locale,
}: SectionRendererProps): React.ReactElement | null {
  // Nota: No se incluye un log de observabilidad aquí porque sería excesivamente
  // ruidoso al ser llamado por cada sección. La observabilidad se mantiene en
  // las páginas que lo invocan y en los componentes de sección individuales.

  switch (sectionName) {
    case "Hero":
      return dictionary.hero ? <Hero {...dictionary.hero} /> : null;

    case "SocialProofLogos":
      return dictionary.socialProof ? (
        <SocialProofLogos {...dictionary.socialProof} />
      ) : null;

    case "BenefitsSection":
      return dictionary.benefitsSection ? (
        <BenefitsSection {...dictionary.benefitsSection} />
      ) : null;

    case "IngredientAnalysis":
      return dictionary.ingredientAnalysis ? (
        <IngredientAnalysis {...dictionary.ingredientAnalysis} />
      ) : null;

    case "ThumbnailCarousel":
      return dictionary.thumbnailCarousel ? (
        <ThumbnailCarousel {...dictionary.thumbnailCarousel} />
      ) : null;

    case "TestimonialGrid":
      return dictionary.testimonialGrid ? (
        <TestimonialGrid content={dictionary.testimonialGrid} />
      ) : null;

    case "DoubleScrollingBanner":
      return dictionary.doubleScrollingBanner ? (
        <DoubleScrollingBanner content={dictionary.doubleScrollingBanner} />
      ) : null;

    case "FaqAccordion":
      return dictionary.faqAccordion ? (
        <FaqAccordion content={dictionary.faqAccordion} />
      ) : null;

    case "GuaranteeSection":
      return dictionary.guaranteeSection ? (
        <GuaranteeSection content={dictionary.guaranteeSection} />
      ) : null;

    case "OrderSection":
      return dictionary.orderForm ? (
        <OrderSection content={dictionary.orderForm} locale={locale} />
      ) : null;

    // --- Secciones del Portal/Global Fitwell ---
    case "NewsGrid":
      return dictionary.newsGrid ? <NewsGrid {...dictionary.newsGrid} /> : null;

    case "HeroNews":
      return dictionary.heroNews ? <HeroNews {...dictionary.heroNews} /> : null;

    case "ProductShowcase":
      return dictionary.productShowcase ? (
        <ProductShowcase {...dictionary.productShowcase} />
      ) : null;

    default:
      // En producción, es mejor fallar silenciosamente que romper la página.
      // Un warning en el servidor es suficiente para la depuración.
      // El casting a 'never' asegura que todos los casos de SectionName estén cubiertos.
      const exhaustiveCheck: never = sectionName;
      console.warn(
        `[SectionRenderer] Advertencia: No se encontró un componente para la sección "${exhaustiveCheck}"`
      );
      return null;
  }
}
// src/components/layout/SectionRenderer.tsx
