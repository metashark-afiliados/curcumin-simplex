// /.docs-espejo/pages/dev-component-canvas-page.md
/**
 * @file /.docs-espejo/pages/dev-component-canvas-page.md
 * @description Documento Espejo y SSoT conceptual para el aparato DevComponentCanvasPage.tsx.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.1.1
 * @date 2025-09-10
 */
# Manifiesto Conceptual: DevComponentCanvasPage

## 1. Rol Estratégico y Propósito

La `DevComponentCanvasPage` (ubicada en `src/app/[locale]/(dev)/dev/components/[componentName]/page.tsx`) es una **página de desarrollo (`@devonly`)** cuyo rol estratégico es proporcionar un entorno aislado y enriquecido para la visualización y depuración de componentes de UI individuales. Actúa como el "lienzo" donde cada componente registrado se renderiza con sus datos de mock, permitiendo a los desarrolladores inspeccionar su apariencia, comportamiento y respuesta de forma independiente, fuera del contexto de la aplicación principal. Además, ahora presenta metadatos relevantes del componente y su contexto de tema.

## 2. Arquitectura y Flujo de Ejecución

La `DevComponentCanvasPage` es un Server Component de Next.js que opera de forma asíncrona.

1.  **Manejo de `params`**: `await`a el objeto `params` (`await params`) para asegurar un acceso robusto a los parámetros de ruta como `locale` y `componentName`, conforme a las directrices de Next.js 15+.
2.  **Generación de Parámetros Estáticos (`generateStaticParams`)**: Implementa `generateStaticParams` para pre-generar estáticamente todas las combinaciones posibles de `locale` y `componentName` a partir de `supportedLocales` y `getComponentList()`, lo cual es mandatorio para `output: 'export'`.
3.  **Carga de Diccionario**: Invoca a `getDictionary` para asegurar que el sistema de i18n esté inicializado para el `locale` actual, aunque la página en sí no use directamente las traducciones (las pasa implícitamente a través del contexto o son usadas por componentes hijos).
4.  **Delegación de Renderizado Enriquecido**: Su responsabilidad principal es delegar el renderizado del componente real al componente `ComponentCanvas`. Le pasa el `componentName` y el `locale` extraídos de `awaitedParams`.
5.  **Aislamiento de UI con Contexto**: El `ComponentCanvas` ahora no solo renderiza el componente, sino que lo envuelve en un "marco de diseño" visual y muestra un panel de metadatos detallados. Este panel incluye:
    *   **Metadatos del Componente**: Nombre del componente.
    *   **Tema y Colores**: Información sobre los colores del tema aplicado (ya sea el por defecto o uno de campaña).
    *   **Tipografía**: Detalles sobre las fuentes en uso.
    *   **Dimensiones y Responsividad**: Indicadores de Mobile-First y breakpoints de Tailwind.
    *   **Props de Mock Aplicadas**: Un JSON de las props finales que se le pasan al componente, útil para la depuración.
6.  **Observabilidad**: Utiliza `clientLogger.info` para registrar su proceso de renderizado y el componente específico que se está visualizando, lo cual es vital para el flujo de trabajo de desarrollo.
7.  **Layout**: Se envuelve en el `DevLayout` (`src/app/[locale]/(dev)/dev/layout.tsx`), que proporciona un `DevHeader` común para el entorno de desarrollo y un contenedor (`Container`) para la consistencia del espaciado.

## 3. Contrato de API (Props)

```typescript
interface DevComponentCanvasPageProps {
  /**
   * @param params Objeto que contiene los parámetros de ruta dinámicos.
   *               Incluye el `locale` actual y el `componentName` a renderizar.
   *               Debe ser `await`ado antes de acceder a sus propiedades.
   */
  params: {
    locale: Locale;
    componentName: string;
  };
}
4. Zona de Mejoras Futuras
Selector de Locale/Tema en Canvas: Permitir cambiar el locale o aplicar diferentes configuraciones de tema (CampaignThemeProvider) directamente dentro del lienzo de un componente individual, para probar su adaptabilidad visual.
Editor de Props en Vivo: Integrar un panel de control interactivo que permita a los desarrolladores editar las props de mock de un componente en tiempo real y ver los cambios instantáneamente, mejorando drásticamente la experiencia de desarrollo.
Visualización de JSON/Schema: Mostrar un panel lateral con el JSON de las props de mock y el esquema Zod asociado al componente, para una referencia rápida y una depuración de datos.
Captura de Screenshot/Grabación: Añadir funcionalidad para tomar capturas de pantalla o grabar el componente mientras interactúa, útil para la documentación o el reporte de bugs.
Pruebas Unitarias/Visuales Automatizadas: Integrar herramientas como Storybook o Chromatic para automatizar pruebas visuales y de regresión para cada componente en este lienzo.
// /.docs-espejo/pages/dev-component-canvas-page.md