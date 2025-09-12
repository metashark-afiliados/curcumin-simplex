// .docs-espejo/components/dev/utils/route-menu.generator.ts.md
/**
 * @file route-menu.generator.ts.md
 * @description Documento espejo y SSoT conceptual para el generador de menú de desarrollo.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Generador de Rutas de Menú de Desarrollo

## 1. Rol Estratégico

El aparato `route-menu.generator.ts` es un **transformador de datos de lógica pura**. Su única responsabilidad es actuar como un puente entre la capa de contenido (los diccionarios i18n) y la capa de navegación (`navigation.ts`), para producir una estructura de datos limpia y predecible que el componente de presentación `DevRouteMenu.tsx` pueda renderizar sin necesidad de lógica interna.

Este aparato es crucial para mantener la separación de intereses: el contenido vive en los JSON, la definición de rutas vive en `navigation.ts`, y el componente de UI es agnóstico a la lógica de construcción de datos.

## 2. Arquitectura y Flujo de Ejecución

1.  **Entrada:** Recibe dos argumentos:
    *   `dictionary`: El fragmento del diccionario i18n que contiene el texto de las etiquetas del menú.
    *   `locale`: El código de idioma actual (ej. "it-IT").
2.  **Proceso:**
    *   Lee la configuración del productor (`producerConfig`) para obtener datos dinámicos como el `CAMPAIGN_ID`.
    *   Construye un array de objetos `RouteGroup`.
    *   Para cada `RouteItem` dentro de un grupo, invoca la función `path()` correspondiente del manifiesto `routes` (`src/lib/navigation.ts`), pasándole el `locale` y cualquier otro parámetro necesario (como `campaignId`) para generar la URL final y correctamente localizada.
    *   Asigna un nombre de icono (`LucideIconName`) predefinido a cada item.
3.  **Salida:** Devuelve un array `RouteGroup[]`, una estructura de datos lista para ser iterada y renderizada por un componente de React.

## 3. Contrato de API

*   **Entradas:**
    *   `dictionary: NonNullable<Dictionary["devRouteMenu"]>`
    *   `locale: Locale`
*   **Salidas:**
    *   `RouteGroup[]`

## 4. Zona de Melhorias Futuras

1.  **Implementación del Listado de Componentes:** Crear la página `src/app/[locale]/(dev)/dev/components/page.tsx` para listar todos los componentes del `ComponentRegistry`.
2.  **Actualización de `navigation.ts`:** Añadir una nueva entrada `devComponentList` al manifiesto de rutas que apunte a la nueva página de listado.
3.  **Actualización del Generador:** Modificar este generador para que el enlace "Component Canvas" apunte a la nueva ruta `routes.devComponentList.path({ locale })`, completando así la funcionalidad del Developer Command Center.
4.  **Iconos Dinámicos desde i18n:** La asignación de iconos podría moverse al archivo de diccionario i18n para una configuración aún más centralizada, aunque esto añadiría complejidad a los schemas.

// .docs-espejo/components/dev/utils/route-menu.generator.ts.md