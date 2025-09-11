// /.docs-espejo/components/dev/RouteTester.md
/**
 * @file /.docs-espejo/components/dev/RouteTester.md
 * @description Documento Espejo y SSoT conceptual para el aparato RouteTester.tsx.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 * @date 2025-09-10
 */
# Manifiesto Conceptual: RouteTester

## 1. Rol Estratégico y Propósito

El `RouteTester` es una **herramienta de desarrollo** fundamental, clasificada como `@devonly`. Su propósito es proporcionar una navegación rápida y centralizada a las diferentes páginas y configuraciones del proyecto durante el desarrollo. Actúa como un "centro de comando" visual que permite a los desarrolladores saltar entre campañas, páginas legales o la suite de diseño sin manipular URLs manualmente. Es un pilar de la experiencia de desarrollo (DX).

## 2. Arquitectura y Flujo de Ejecución

El `RouteTester` es un componente cliente (`"use client"`) que encapsula un menú desplegable.

1.  **Activación**: Se renderiza en el layout de desarrollo (`src/app/[locale]/(dev)/dev/layout.tsx`).
2.  **Estado Interno**: Gestiona su propio estado de apertura (`isOpen`) y la referencia del menú (`menuRef`).
3.  **Detección de Locale**: Utiliza la función `getCurrentLocaleFromPathname` para extraer el idioma actual de la URL, garantizando que las navegaciones subsiguientes mantengan la coherencia del locale.
4.  **Configuración de Rutas**: Las rutas que ofrece son generadas dinámicamente:
    *   **IDs de Campaña**: Se obtienen de `producerConfig.LANDING_ID`, centralizando la configuración.
    *   **Rutas Base**: Se utilizan las definiciones de `routes` de `src/lib/navigation.ts` para las rutas principales.
    *   **Rutas Legales/Dev**: Algunas rutas se construyen directamente para propósitos de desarrollo (ej. `/dev/branding`).
5.  **Internacionalización**: Todas las etiquetas del menú se obtienen de un diccionario `dictionary` pasado como prop, que a su vez se carga de `src/messages/components/dev/route-tester.i18n.json`.
6.  **Navegación**: Al hacer clic en un ítem, el `handleNavigation` utiliza `next/navigation` (`router.push`) para redirigir al usuario a la ruta seleccionada, asegurando una experiencia de SPA.
7.  **Observabilidad**: `clientLogger` se integra para trazar las acciones de navegación y los eventos de ciclo de vida del componente en el entorno de desarrollo.
8.  **Accesibilidad**: Implementa `aria-haspopup`, `aria-expanded`, `role="menu"` y `role="menuitem"` para mejorar la navegación con tecnologías de asistencia.

## 3. Contrato de API (Props)

```typescript
interface RouteMenuProps {
  /**
   * @param onNavigate Callback que se ejecuta cuando el usuario selecciona una ruta y se produce una navegación.
   */
  onNavigate: () => void;
  /**
   * @param dictionary Objeto de diccionario de i18n para el componente RouteTester.
   *                   Contiene todas las cadenas de texto necesarias para el menú.
   */
  dictionary: NonNullable<Dictionary["routeTester"]>;
}
4. Zona de Mejoras Futuras
Generación Dinámica de Rutas Legales: Actualmente, las rutas legales están hardcodeadas en devRoutes. Se debería crear un sistema para leerlas dinámicamente de navigation.ts o de un archivo de configuración de desarrollo.
Buscador de Rutas: Añadir un input de búsqueda para filtrar las rutas en el menú desplegable.
Configuración de Campañas de Desarrollo: Permitir que CAMPAIGN_ID sea configurable a través de un archivo de configuración de desarrollo o un selector en la UI, en lugar de depender directamente de producerConfig.LANDING_ID.
Subcomponentes para Grupos/Items: Si el menú crece mucho, se podrían atomizar RouteGroup y RouteItem en componentes React propios para mejorar la cohesión y reusabilidad interna.
Internacionalización de Títulos de Página de Desarrollo: Actualmente los títulos como "Dev Canvas" no están internacionalizados, sería buena idea incluirlos en route-tester.i18n.json y pasarlos como parte del diccionario.
Integración con Temas de Desarrollo: Una opción para cambiar el tema de la campaña directamente desde este menú, utilizando el CampaignThemeProvider.
// /.docs-espejo/components/dev/RouteTester.md