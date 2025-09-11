// /.docs-espejo/components/layout/DevHomepageHeader.md
/**
 * @file /.docs-espejo/components/layout/DevHomepageHeader.md
 * @description Documento Espejo y SSoT conceptual para el aparato DevHomepageHeader.tsx.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @date 2025-09-10
 */
# Manifiesto Conceptual: DevHomepageHeader

## 1. Rol Estratégico y Propósito

El `DevHomepageHeader` es un **componente de layout temporal, exclusivo para el entorno de desarrollo (`@devonly`)**, diseñado específicamente para la página de inicio raíz (`src/app/[locale]/page.tsx`). Su propósito es facilitar la navegación y la depuración para los desarrolladores, proporcionando acceso rápido a las páginas clave del portal y a un menú exhaustivo de todas las rutas del proyecto (`DevRouteMenu`). Su existencia está condicionada por `process.env.NODE_ENV === "development"`.

## 2. Arquitectura y Flujo de Ejecución

El `DevHomepageHeader` es un componente cliente (`"use client"`) que actúa como un orquestador ligero para la navegación de desarrollo.

1.  **Activación Condicional**: Se renderiza únicamente en la página de inicio raíz (`src/app/[locale]/page.tsx`) y solo si `process.env.NODE_ENV` es `development`.
2.  **Navegación Principal**: Contiene enlaces directos ("cápsulas") a páginas fundamentales del portal (Inicio, Quiénes Somos, Tienda, Blog), utilizando el locale actual para construir las URLs.
3.  **Integración de `DevRouteMenu`**: Embebe el componente `DevRouteMenu.tsx` (el menú expandible rojo), delegando la gestión de rutas más complejas y la funcionalidad de cambio de idioma de desarrollo.
4.  **Internacionalización**: Todas las cadenas de texto utilizadas en sus enlaces de navegación se obtienen de un diccionario `dictionary` proporcionado a través de `props`, que se carga de `src/messages/components/dev/dev-homepage-header.i18n.json`. El `DevRouteMenu` interno también recibe su propio diccionario.
5.  **Observabilidad**: Incluye llamadas a `clientLogger` para registrar su renderizado, facilitando la depuración.

## 3. Contrato de API (Props)

```typescript
interface DevHomepageHeaderProps {
  /**
   * @param dictionary Objeto de diccionario de i18n para el componente DevHomepageHeader.
   *                   Contiene todas las cadenas de texto necesarias para los enlaces de navegación.
   */
  dictionary: NonNullable<Dictionary["devHomepageHeader"]>;
  /**
   * @param devRouteMenuDictionary Objeto de diccionario de i18n para el componente DevRouteMenu.
   *                               Se pasa directamente al componente hijo DevRouteMenu.
   */
  devRouteMenuDictionary: NonNullable<Dictionary["routeTester"]>;
}