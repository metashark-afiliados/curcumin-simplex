// src/app/page.tsx
/**
 * @file page.tsx
 * @description Componente de página principal que actúa como el "Ensamblador Lego".
 * @description_es Este Server Component es el responsable de orquestar el layout de la
 *               página principal. Lee la configuración de secciones activas y el
 *               diccionario de contenido, y renderiza dinámicamente cada sección
 *               en el orden especificado.
 * @version 2.2.0
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { activeSections, type SectionName } from "@/lib/config/sections.config";
import type { Dictionary } from "@/lib/schemas/i18n.schema"; // <<-- 1. IMPORTACIÓN DEL TIPO
import { Hero } from "@/components/sections/Hero";
import { SocialProofLogos } from "@/components/sections/SocialProofLogos";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { IngredientAnalysis } from "@/components/sections/IngredientAnalysis";
import { ThumbnailCarousel } from "@/components/sections/ThumbnailCarousel";
// import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
// import { FaqAccordion } from "@/components/sections/FaqAccordion";
// import { GuaranteeSection } from "@/components/sections/GuaranteeSection";

/**
 * @function SectionRenderer
 * @description Componente auxiliar que mapea un nombre de sección a su componente React.
 * @param {object} props - Propiedades del componente.
 * @param {SectionName} props.sectionName - El nombre de la sección a renderizar.
 * @param {Dictionary} props.dictionary - El diccionario completo de i18n, ahora fuertemente tipado.
 * @returns {React.ReactElement | null} El componente de sección renderizado o null si no se encuentra.
 */
function SectionRenderer({
  sectionName,
  dictionary,
}: {
  sectionName: SectionName;
  dictionary: Dictionary; // <<-- 2. APLICACIÓN DEL TIPO CORRECTO
}) {
  // El contrato de datos ahora es verificado por TypeScript en tiempo de compilación.
  switch (sectionName) {
    case "Hero":
      return dictionary.hero ? (
        <Hero
          title={dictionary.hero.title}
          subtitle={dictionary.hero.subtitle}
        />
      ) : null;
    case "SocialProofLogos":
      return dictionary.socialProof ? (
        <SocialProofLogos
          title={dictionary.socialProof.title}
          logos={dictionary.socialProof.logos}
        />
      ) : null;
    case "BenefitsSection":
      return dictionary.benefitsSection ? (
        <BenefitsSection
          title={dictionary.benefitsSection.title}
          subtitle={dictionary.benefitsSection.subtitle}
          benefits={dictionary.benefitsSection.benefits}
        />
      ) : null;
    case "IngredientAnalysis":
      return dictionary.ingredientAnalysis ? (
        <IngredientAnalysis
          title={dictionary.ingredientAnalysis.title}
          ingredients={dictionary.ingredientAnalysis.ingredients}
        />
      ) : null;
    case "ThumbnailCarousel":
      return dictionary.thumbnailCarousel ? (
        <ThumbnailCarousel
          thumbnails={dictionary.thumbnailCarousel.thumbnails}
          affiliateUrl={dictionary.thumbnailCarousel.affiliateUrl}
          playButtonAriaLabel={dictionary.thumbnailCarousel.playButtonAriaLabel}
          playButtonTitle={dictionary.thumbnailCarousel.playButtonTitle}
        />
      ) : null;
    // case "TestimonialGrid":
    //   return <TestimonialGrid testimonials={...} />;
    default:
      console.warn(
        `[Page] Componente para la sección "${sectionName}" no implementado.`
      );
      return null;
  }
}

/**
 * @page Home
 * @description La página de inicio de Curcumin Simplex.
 * @returns {Promise<React.ReactElement>} El elemento JSX que representa la página completa.
 */
export default async function Home(): Promise<React.ReactElement> {
  console.log(
    "[Observabilidad] Renderizando página Home (Ensamblador de Secciones)"
  );
  const t = await getDictionary();

  return (
    <>
      {activeSections.map((section) => (
        <SectionRenderer
          key={section.name}
          sectionName={section.name}
          dictionary={t}
        />
      ))}
    </>
  );
}
// src/app/page.tsx
