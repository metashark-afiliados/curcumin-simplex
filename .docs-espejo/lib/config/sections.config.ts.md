# /.docs-espejo/lib/config/sections.config.ts.md

/**
 * @file /.docs-espejo/lib/config/sections.config.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato de configuración de secciones.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */

# Manifiesto Conceptual: `sections.config`

## 1. Rol Estratégico y Propósito

Este aparato es el **cerebro del sistema de renderizado condicional "plug and play"**. Su única responsabilidad es actuar como un intermediario robusto y validado entre la configuración explícita del archivo `.env` y el resto de la aplicación.

Transforma un conjunto de variables de entorno legibles (`SECTION_Hero="visible,1"`) en una estructura de datos tipada, ordenada y segura (`activeSections: SectionConfig[]`), que la página principal utiliza para construir la UI dinámicamente.

## 2. Arquitectura y Principios Aplicados

-   **Configuración Explícita y Legible:** La SSoT reside en el `.env` en un formato de "una variable por sección". Esta estrategia es superior porque es auto-documentada, fácil de gestionar por humanos y menos propensa a errores de sintaxis que una única cadena compleja.
-   **Validación Estricta con Zod:** Utiliza Zod para validar tanto los nombres de las secciones (a través de un `z.enum` derivado de una lista `const`) como la estructura final de los datos parseados. Esto garantiza que cualquier error de configuración en el `.env` (un nombre de sección incorrecto, un orden no numérico) sea detectado, previniendo fallos en producción.
-   **Procesamiento Centralizado:** Toda la lógica de leer, parsear, validar y ordenar la configuración está encapsulada en este único módulo. La página principal (`page.tsx`) consume una lista ya procesada y filtrada (`activeSections`), manteniendo la lógica de presentación limpia y simple.

## 3. Zona de Melhorias Futuras

1.  **Integración con Headless CMS:** Este sistema es el precursor ideal para una gestión de contenido más avanzada. Las variables de entorno podrían ser reemplazadas por una llamada a un CMS, permitiendo a los editores de contenido gestionar el layout de la página visualmente.
2.  **Configuración por Ruta:** El sistema podría evolucionar para leer diferentes conjuntos de variables (ej. `ABOUT_SECTION_...`) basados en la ruta, permitiendo layouts únicos para diferentes páginas.
3.  **Pruebas A/B de Layout:** La lógica podría extenderse para leer diferentes configuraciones basadas en cookies o parámetros de URL, facilitando la experimentación con diferentes ordenamientos de secciones para optimizar la conversión.