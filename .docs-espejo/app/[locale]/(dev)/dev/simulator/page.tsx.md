# /.docs-espejo/app/[locale]/(dev)/dev/simulator/page.tsx.md
/**
 * @file page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página del Simulador de Campañas.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Simulador de Campañas

## 1. Rol Estratégico

Este aparato es una **herramienta de desarrollo y marketing de misión crítica**. Su propósito es servir como una interfaz visual para previsualizar cualquier variante de campaña definida en los manifiestos de datos (`campaign.map.json`). Permite una validación rápida y visual de los cambios de contenido y tema, desacoplando completamente el ciclo de vida del marketing del ciclo de desarrollo de software.

## 2. Arquitectura y Flujo de Ejecución

1.  **Obtención de Datos (Servidor):**
    *   La función `getAvailableCampaigns` actúa como la capa de datos. Lee el archivo `campaign.map.json` para descubrir dinámicamente todas las campañas y variantes disponibles.
    *   Para cada variante, construye la URL de previsualización completa, incluyendo el `locale`, el `campaignId` y el parámetro de búsqueda `?v={variantId}`.
    *   Paralelamente, se carga el diccionario `i18n` para obtener los textos de la propia interfaz del simulador.

2.  **Renderizado (Servidor):**
    *   El componente es un Server Component `async` que espera la resolución de los datos de campañas y del diccionario.
    *   Renderiza una interfaz de tarjetas, donde cada tarjeta representa una variante de campaña.
    *   Cada tarjeta es un `Link` de Next.js que apunta a la URL de previsualización generada, configurado para abrirse en una nueva pestaña (`target="_blank"`).

3.  **Interacción (Cliente):**
    *   El usuario (desarrollador o marketer) hace clic en una tarjeta.
    *   Se abre una nueva pestaña en la `CampaignPage`, que a su vez leerá los parámetros y renderizará la variante de campaña seleccionada.

## 3. Contrato de API (Props)

*   `params`: `{ locale: Locale; }` - Define el idioma en el que se renderizará la interfaz del simulador.

## 4. Zona de Melhorias Futuras (Registro de Valor)

1.  **Descubrimiento Multi-Campaña:** La función `getAvailableCampaigns` podría escanear el directorio `src/content/campaigns` para descubrir y mostrar *todas* las campañas del proyecto, no solo la `12157` harcodeada.
2.  **Indicador de Estado de Build:** Se podría añadir un pequeño indicador visual a cada tarjeta que muestre si esa variante específica pasa la validación de Zod en tiempo real.
3.  **Filtrado y Búsqueda:** A medida que crezca el número de campañas y variantes, añadir una barra de búsqueda para filtrar por nombre o descripción.
4.  **Generación de Snapshots Visuales:** Integrar una funcionalidad que, con un clic, utilice una herramienta como Playwright para tomar una captura de pantalla de la landing page y guardarla como un artefacto de referencia.