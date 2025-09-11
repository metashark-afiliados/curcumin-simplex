// /.docs-espejo/lib/config/sections.config.md
/**
 * @file /.docs-espejo/lib/config/sections.config.md
 * @description Documento Espejo y SSoT conceptual para el aparato sections.config.ts.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @date 2025-09-10
 */
# Manifiesto Conceptual: sections.config.ts

## 1. Rol Estratégico y Propósito

`sections.config.ts` es la **Única Fuente de Verdad (SSoT)** para la definición de los nombres de todas las secciones de UI que pueden ser renderizadas en el proyecto `curcumin-simplex`. Su propósito principal es centralizar una lista exhaustiva de estos nombres, que luego es utilizada por el esquema de validación (`i18n.schema.ts`) y por los componentes de orquestación de layout (como `SectionRenderer`) para asegurar la consistencia y la seguridad de tipos.

## 2. Arquitectura y Flujo de Ejecución

Este aparato es un módulo de TypeScript que exporta un array `sectionNames` y un tipo derivado `SectionName` (validado por Zod).

1.  **Definición de Nombres Canónicos**: Declara `sectionNames` como un `const` array de strings. Esta es la lista autoritativa de todas las secciones de UI disponibles en el proyecto.
2.  **Generación de Tipo Zod**: Utiliza `z.enum(sectionNames)` para crear un esquema Zod que validará cualquier valor contra esta lista de nombres, y `z.infer` para generar el tipo TypeScript `SectionName`.
3.  **Consumo por Ensambladores**:
    *   `src/lib/i18n/campaign.i18n.ts`: Utiliza `sectionNames` para validar la estructura `layout.sections` dentro del `theme.json` de cada campaña, asegurando que solo se soliciten secciones válidas.
    *   `src/components/layout/SectionRenderer.tsx`: Actúa como un multiplexor que mapea estos `SectionName`s a sus respectivos componentes React para el renderizado.
4.  **Eliminación de Lógica Deprecada**: Previamente, este archivo contenía lógica para parsear la configuración de secciones de variables de entorno (lógica legacy). Esta ha sido eliminada para simplificar el archivo y adherirse a la nueva arquitectura donde los layouts de campaña se definen en `theme.json` y el portal se gestiona a través del diccionario de i18n.

## 3. Contrato de API (Exportaciones)

```typescript
/**
 * @constant sectionNames
 * @description Un array de solo lectura que contiene todos los nombres canónicos de las secciones de UI.
 */
export const sectionNames: readonly ("Hero" | "SocialProofLogos" | "BenefitsSection" | "IngredientAnalysis" | "ThumbnailCarousel" | "TestimonialGrid" | "DoubleScrollingBanner" | "FaqAccordion" | "GuaranteeSection" | "OrderSection" | "NewsGrid" | "HeroNews" | "ProductShowcase")[];

/**
 * @type SectionName
 * @description Tipo TypeScript derivado de `sectionNames`, que representa un nombre de sección válido.
 */
export type SectionName = "Hero" | "SocialProofLogos" | "BenefitsSection" | "IngredientAnalysis" | "ThumbnailCarousel" | "TestimonialGrid" | "DoubleScrollingBanner" | "FaqAccordion" | "GuaranteeSection" | "OrderSection" | "NewsGrid" | "HeroNews" | "ProductShowcase";```

## 4. Zona de Mejoras Futuras

1.  **Categorización de Secciones**: Dividir `sectionNames` en categorías (ej. `CampaignSections`, `PortalSections`, `RazBitSections`) para una mejor organización y tipado más granular.
2.  **Registro Extensible**: Implementar un registro más dinámico para las secciones que permita añadir nuevas secciones de forma programática (ej. mediante un plugin), en lugar de una lista estática.
3.  **Metadatos de Sección**: Extender la definición de cada sección para incluir metadatos como una descripción, requisitos de datos, o una URL de documentación.
4.  **Soporte para Módulos Híbridos**: Si en el futuro se requieren secciones con lógica específica de Server y Client Components, actualizar el registro para distinguir y gestionar estas complejidades.
// /.docs-espejo/lib/config/sections.config.md