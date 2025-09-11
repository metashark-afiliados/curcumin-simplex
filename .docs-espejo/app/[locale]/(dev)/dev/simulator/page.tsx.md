// .docs-espejo/app/[locale]/(dev)/dev/simulator/page.tsx.md
/**
 * @file page.tsx.md
 * @description Documento espejo para la página del simulador de campañas.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Simulador de Campañas

## 1. Rol Estratégico

El Simulador de Campañas es una herramienta de **validación y previsualización** crucial para el equipo de marketing y desarrollo. Su único propósito es leer el manifiesto de mapeo de activos (`campaign.map.json`) y presentar una interfaz clara que permita lanzar cualquier variante de campaña (`sub-campaña`) en una nueva pestaña.

Esta herramienta es la garantía de que la **arquitectura de "configuración sobre código" funciona correctamente**. Permite verificar que los manifiestos de tema y contenido están bien formados y se cargan como se espera, desacoplando completamente el ciclo de vida del contenido del ciclo de desarrollo del código.

## 2. Arquitectura y Flujo de Ejecución

Es un **Server Component** asíncrono.

1.  **Carga de Datos en Paralelo:** Utiliza `Promise.all` para obtener de forma concurrente:
    *   El diccionario de i18n para los textos de la propia página del simulador (título, subtítulo, etc.).
    *   Los datos de las campañas disponibles, invocando a la función helper `getAvailableCampaigns(locale)`.
2.  **`getAvailableCampaigns` (Lógica de Datos):**
    *   Importa estáticamente el archivo `campaign.map.json`.
    *   Transforma la estructura de datos del JSON en un formato más conveniente para el renderizado (`Campaign[]`), construyendo las URLs de previsualización con el `locale` y el `variantId` correctos (ej. `.../campaigns/12157?v=02`).
3.  **Renderizado:**
    *   Renderiza un encabezado y un subtítulo obtenidos del diccionario.
    *   Itera sobre la estructura de datos de las campañas y sus variantes.
    *   Para cada variante, renderiza un componente `Link` estilizado como una `Card`. El `href` del `Link` apunta a la URL de previsualización generada en el paso anterior.
    *   El `target="_blank"` asegura que cada previsualización se abra en una nueva pestaña, permitiendo comparar variantes fácilmente.

## 3. Contrato de API (`Props`)

-   `params: { locale: Locale }`: El `locale` de la URL, necesario para construir las URLs de las campañas y cargar el contenido i18n de la propia página del simulador.

## 4. Zona de Melhorias Futuras

1.  **Selección Dinámica de Campaña:** Actualmente, el simulador está hardcodeado para la campaña `12157`. Se podría extender para escanear el directorio `src/content/campaigns` y presentar un selector que permita elegir qué campaña simular.
2.  **Indicadores de Estado de Activos:** Añadir "badges" a cada tarjeta de variante que indiquen el estado de sus activos (ej. "Válido", "Error de Schema", "Falta Archivo") realizando una validación preliminar de los archivos JSON en `getAvailableCampaigns`.
3.  **Integración con Git:** Mostrar la fecha de la última modificación de los archivos `theme.json` y `content.json` de cada variante para que el equipo de marketing sepa qué tan recientes son los cambios.
4.  **Vista Previa Incrustada:** En lugar de abrir una nueva pestaña, se podría utilizar un `<iframe>` para mostrar una vista previa de la landing page directamente dentro del simulador, facilitando las comparaciones lado a lado.
// .docs-espejo/app/[locale]/(dev)/dev/simulator/page.tsx.md