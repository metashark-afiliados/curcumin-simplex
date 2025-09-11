// .docs-espejo/components/layout/DevHomepageHeader.tsx.md
/**
 * @file DevHomepageHeader.tsx.md
 * @description Documento espejo para el header de la homepage de desarrollo.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: DevHomepageHeader

## 1. Rol Estratégico

El `DevHomepageHeader` es un componente de **Experiencia de Desarrollador (DX)** diseñado para ser renderizado exclusivamente en la página de inicio (`/`) durante el modo de desarrollo. Su propósito es doble:

1.  **Proveer Navegación Rápida:** Ofrece enlaces directos a las principales páginas del portal (`/about`, `/store`, etc.), permitiendo al equipo moverse rápidamente por la aplicación sin depender del `Header` o `Footer` de producción.
2.  **Actuar como Host del `DevRouteMenu`:** Sirve como el punto de anclaje para el `DevRouteMenu`, el menú desplegable principal de herramientas de desarrollo.

Es un componente temporal y de diagnóstico, estilizado de forma llamativa (rojo) para que sea evidente que no forma parte del diseño de producción.

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente Cliente (`"use client"`)** porque necesita acceder al `pathname` actual para determinar el `locale` y construir correctamente los enlaces de navegación.

1.  **Recepción de Props:** Recibe dos porciones del diccionario: una para sus propios enlaces (`devHomepageHeader`) y otra para pasarla a su hijo, el `DevRouteMenu` (`devRouteMenuDictionary`).
2.  **Detección de Locale:** Utiliza el hook `usePathname` para obtener la URL actual y extrae el `locale` con una función helper.
3.  **Renderizado de Enlaces:** Mapea sus datos de `dictionary` para renderizar los `Link` de navegación, construyendo las URLs dinámicamente usando la SSoT de rutas (`navigation.ts`) y el `locale` detectado.
4.  **Renderizado del Menú Dev:** Renderiza el componente `DevRouteMenu`, pasándole el diccionario correspondiente que recibió como prop.

## 3. Contrato de API (`Props`)

-   `dictionary: NonNullable<Dictionary["devHomepageHeader"]>`: El sub-diccionario con el texto para los enlaces de navegación del header.
-   `devRouteMenuDictionary: NonNullable<Dictionary["devRouteMenu"]>`: El sub-diccionario necesario para el componente `DevRouteMenu` anidado.

## 4. Zona de Melhorias Futuras

1.  **Conversión a Server Component:** Si se refactoriza la página principal para que pase explícitamente el `locale` como prop a este componente, se podría eliminar la dependencia de `usePathname` y convertirlo en un Server Component más performante.
2.  **Navegación Dinámica:** En lugar de tener los enlaces hardcodeados, el componente podría recibir un array de objetos de ruta desde sus props, haciéndolo más configurable.
3.  **Indicador de Entorno:** Añadir un `badge` o texto más prominente que indique claramente el entorno (`DEVELOPMENT`) para evitar cualquier confusión.
// .docs-espejo/components/layout/DevHomepageHeader.tsx.md