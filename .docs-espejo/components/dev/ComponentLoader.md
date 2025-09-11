// .docs-espejo/components/dev/ComponentLoader.ts.md
/**
 * @file ComponentLoader.ts.md
 * @description Documento espejo para el cargador de componentes del Dev Canvas.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Component Loader

## 1. Rol Estratégico

El `ComponentLoader` es el **motor de obtención de datos para el Developer Component Canvas**. Su única responsabilidad es actuar como un intermediario que, dado el nombre de un componente, orquesta la carga dinámica de dos activos clave:

1.  **El Módulo de Código del Componente:** El archivo `.tsx` que contiene la lógica de renderizado.
2.  **Las Props de Contenido (i18n):** El objeto de datos (texto, URLs, etc.) que el componente necesita para renderizarse, extraído de los archivos `.i18n.json`.

Al centralizar esta lógica, se asegura que el Canvas de Componentes sea una representación fiel de cómo los componentes se comportarán con datos reales, facilitando el desarrollo y la depuración en un entorno aislado.

## 2. Arquitectura y Flujo de Ejecución

La lógica se basa en una única fuente de verdad, el `ComponentRegistry`, para un flujo predecible y mantenible.

1.  **Entrada:** Recibe un `componentName` (ej. "Hero") y un `locale`.
2.  **Consulta a la SSoT:** Busca en `ComponentRegistry.ts` la entrada correspondiente a `componentName` para obtener sus metadatos (`componentPath`, `dictionaryKey`, `isCampaignComponent`).
3.  **Carga de Datos Condicional:**
    *   Si `isCampaignComponent` es `true`, invoca a `getCampaignData` para obtener el diccionario y el tema de una campaña de desarrollo predefinida.
    *   Si es `false`, invoca a `getDictionary` para obtener el diccionario global del portal.
4.  **Extracción de Props:** Utiliza el `dictionaryKey` de la SSoT para extraer el sub-objeto de datos relevante del diccionario cargado. Si no se encuentra, recurre a `getFallbackProps` para evitar un crash.
5.  **Importación Dinámica de Código:** Utiliza la ruta `componentPath` de la SSoT para importar dinámicamente el módulo del componente (ej. `import('@/components/sections/Hero')`).
6.  **Salida:** Devuelve un objeto `ComponentLoadResult` que contiene el componente React listo para ser renderizado (`ComponentToRender`), sus `componentProps`, el `appliedTheme` (si aplica) y la entrada del registro (`entry`).

Esta arquitectura elimina la duplicación de datos y hace que añadir un nuevo componente al Canvas solo requiera una única modificación en el `ComponentRegistry`.

## 3. Contrato de API

-   **Función:** `loadComponentAndProps(componentName: string, locale: string): Promise<ComponentLoadResult>`
-   **Salida (`ComponentLoadResult`):**
    -   `ComponentToRender: React.ComponentType<any>`: El componente funcional.
    -   `componentProps: Record<string, any>`: Los datos de i18n para el componente.
    -   `appliedTheme: any`: El objeto de tema de la campaña (o `null`).
    -   `entry: ComponentRegistryEntry`: Los metadatos del registro.

## 4. Zona de Melhorias Futuras

1.  **Selección Dinámica de Variante:** Permitir que la página del Dev Canvas pase un `variantId` (ej. `?variant=01`) al `ComponentLoader` para poder testear un componente con los datos de cualquier sub-campaña, no solo la de por defecto.
2.  **Caché de Módulos:** Implementar un caché en memoria para los módulos de componentes importados dinámicamente para acelerar la navegación entre componentes en el Canvas durante la misma sesión.
3.  **Manejo de Errores Mejorado:** En lugar de lanzar una excepción, el loader podría devolver un objeto de error estructurado, permitiendo al `ComponentCanvas` renderizar una interfaz de error más informativa y amigable para el desarrollador.
// .docs-espejo/components/dev/ComponentLoader.ts.md