# /.docs-espejo/app/[locale]/(dev)/dev/layout.md
/**
 * @file layout.md
 * @description Documento espejo para el layout del dominio de desarrollo.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Layout del Dominio de Desarrollo

## 1. Rol Estratégico

Este aparato es un **layout de grupo de rutas** (`Route Group Layout`). Su única responsabilidad es aplicar una estructura de UI consistente a todas las páginas que residen bajo el segmento de ruta `/(dev)/`.

Su propósito es:
-   **Separación de Entornos:** Proveer una experiencia de usuario y una navegación (`DevHeader`) completamente separada del portal público, dejando claro que se está en un entorno de desarrollo.
-   **Consistencia de UI:** Asegurar que todas las herramientas de desarrollo (Canvas, Simulador, etc.) compartan un marco visual común.
-   **Principio DRY:** Evitar la repetición del `DevHeader` y la estructura de `<main>` en cada página de desarrollo individual.

## 2. Arquitectura y Flujo de Ejecución

1.  **Activación por Ruta:** Next.js activa este layout automáticamente para cualquier ruta que coincida con el patrón `/[locale]/dev/...`.
2.  **Recepción de Parámetros:** Como Server Component, recibe las `props` del framework, incluyendo el objeto `params` que contiene el `locale` de la URL.
3.  **Resolución de `params`:** La primera acción del componente es usar `await` para resolver la `Promise` del objeto `params`. Este es un paso crítico y mandatorio para acceder a los valores de los parámetros de ruta.
4.  **Renderizado de Componentes Hijos:**
    -   Renderiza el `DevHeader`, pasándole el `locale` resuelto para que pueda generar sus propios enlaces y cargar su contenido i18n correctamente.
    -   Renderiza el prop `children`, que corresponde al contenido de la página específica que se está visitando (ej. `dev/page.tsx` o `dev/components/[componentName]/page.tsx`).

## 3. Contrato de API (Props)

-   `children`: `React.ReactNode` - El contenido de la página anidada que será renderizado.
-   `params`: `Promise<{ locale: Locale }>` - Objeto que contiene los parámetros dinámicos de la ruta, proveído por Next.js como una promesa.

## 4. Zona de Melhorias Futuras

1.  **Contexto de Desarrollo:** Implementar un `Context Provider` de React a nivel de este layout para compartir estado o funciones entre las diferentes herramientas de desarrollo (ej. un estado global para el tema de campaña seleccionado en el simulador).
2.  **DevFooter:** Añadir un pie de página específico para el entorno de desarrollo que pueda mostrar información útil como la versión actual del proyecto, el `commit` de Git, o enlaces a la documentación.
3.  **Barra Lateral de Navegación:** Para herramientas de desarrollo más complejas, se podría evolucionar el `DevHeader` hacia una barra lateral de navegación persistente para un acceso más rápido a las diferentes secciones del DCC.
4.  **Protección de Entorno:** Integrar este layout con el middleware para asegurar que solo sea accesible en entornos de `development`, redirigiendo o mostrando un error 404 en producción.
# /.docs-espejo/app/[locale]/(dev)/dev/layout.md