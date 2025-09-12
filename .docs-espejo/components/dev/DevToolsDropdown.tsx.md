// .docs-espejo/components/dev/DevToolsDropdown.tsx.md
/**
 * @file DevToolsDropdown.tsx.md
 * @description Documento espejo y SSoT conceptual para el orquestador del menú de desarrollo.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Orquestador DevToolsDropdown

## 1. Rol Estratégico

El aparato `DevToolsDropdown.tsx` es un **orquestador de lógica del lado del cliente ("Smart Component")**. Su única y exclusiva responsabilidad es preparar los datos necesarios para que el componente de presentación `DevRouteMenu.tsx` pueda renderizar el menú de herramientas de desarrollo.

Actúa como un intermediario que conoce el "contexto" de la aplicación (la ruta actual, el `locale`) y lo utiliza para invocar al generador de datos (`route-menu.generator.ts`), desacoplando completamente la lógica de la presentación.

## 2. Arquitectura y Flujo de Ejecución

1.  **Entrada:** Recibe una única prop `dictionary` con el contenido textual del menú.
2.  **Contexto (Hooks):** Utiliza el hook `usePathname` de Next.js para obtener la URL actual.
3.  **Procesamiento:**
    *   Invoca a la utilidad `getCurrentLocaleFromPathname` para extraer el `locale` de la URL.
    *   Invoca a la función pura `generateDevRoutes`, pasándole el `dictionary` y el `locale` extraído. Esta función devuelve una estructura de datos (`RouteGroup[]`) lista para ser renderizada.
4.  **Salida (Renderizado):** Renderiza el componente de presentación `DevRouteMenu`, pasándole la estructura de datos `routeGroups` como prop. No contiene ningún JSX de presentación propio.

## 3. Contrato de API

*   **Entradas (Props):**
    *   `dictionary: NonNullable<Dictionary["devRouteMenu"]>`
*   **Salidas:**
    *   Un único elemento: `<DevRouteMenu routeGroups={...} />`

## 4. Zona de Melhorias Futuras

1.  **Estado Global:** Si el menú de desarrollo se volviera más complejo y necesitara compartir estado con otras partes del DCC (ej. un tema de UI para las herramientas de desarrollo), esta lógica podría moverse a un proveedor de contexto de React (`Context.Provider`) para una gestión de estado más centralizada.
2.  **Carga Dinámica de Rutas:** Para un DCC extremadamente grande, la estructura de rutas podría cargarse dinámicamente desde un endpoint de API en lugar de ser generada estáticamente, aunque para el alcance actual esto sería una sobreingeniería.

// .docs-espejo/components/dev/DevToolsDropdown.tsx.md