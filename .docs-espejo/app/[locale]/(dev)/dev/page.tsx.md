// .docs-espejo/app/[locale]/(dev)/dev/page.tsx.md
/**
 * @file page.tsx.md
 * @description Documento espejo para la página del dashboard de desarrollo.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Dashboard del Developer Command Center (DCC)

## 1. Rol Estratégico

Esta página (`/dev`) es el **portal de entrada y el panel de control principal** para todas las herramientas de Experiencia de Desarrollador (DX). Su propósito es presentar al equipo de desarrollo y marketing un menú visual y claro de las capacidades de simulación y testeo del proyecto.

Actúa como un "mapa" que guía al usuario hacia la herramienta correcta, ya sea para visualizar un componente atómico en el `ComponentCanvas`, previsualizar una landing page completa en el `CampaignSimulator`, o auditar el sistema de diseño en la página de `Branding`.

## 2. Arquitectura y Flujo de Ejecución

Es un **Server Component** asíncrono.

1.  **Recepción de Locale:** Obtiene el `locale` de los parámetros de la ruta.
2.  **Carga de Contenido:** Invoca `getDictionary(locale)` para cargar todo el texto necesario para la página (título, subtítulo y el nombre/descripción de cada tarjeta de herramienta).
3.  **Definición de Estructura:** Dentro del componente, se define un array de configuración (`devToolsConfig`). Este array define la **estructura** de las tarjetas: su `key` para enlazar con los datos de i18n, la `href` generada a partir de la SSoT de rutas (`navigation.ts`), y el `icon` a renderizar. Esta separación entre la estructura (código) y el contenido (i18n) es deliberada.
4.  **Renderizado por Mapeo:** El componente itera sobre `devToolsConfig`. Para cada herramienta, busca el contenido textual correspondiente en el diccionario cargado y renderiza un componente `Link` estilizado como una tarjeta, combinando la estructura del código con el contenido de i18n.

## 3. Contrato de API (`Props`)

-   `params: { locale: Locale }`: El objeto que contiene el `locale` de la URL, esencial para la carga del diccionario y la generación de URLs internacionalizadas.

## 4. Zona de Melhorias Futuras

1.  **Configuración de Herramientas Externa:** Mover el `devToolsConfig` a un archivo de configuración separado (ej. `src/config/dev-tools.config.ts`) para desacoplarlo completamente del componente de renderizado.
2.  **Indicadores de Estado de Herramienta:** Añadir un `status: 'stable' | 'beta' | 'deprecated'` a la configuración de cada herramienta y renderizar un `badge` visual en la tarjeta para comunicar su estado actual al equipo.
3.  **Accesos Directos Dinámicos:** Implementar una sección de "Acceso Rápido" que muestre enlaces a los componentes o campañas modificados más recientemente, analizando las confirmaciones de Git.
// .docs-espejo/app/[locale]/(dev)/dev/page.tsx.md