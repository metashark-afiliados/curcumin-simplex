// .docs-espejo/app/[locale]/(dev)/dev/simulator/page.tsx.md
/**
 * @file page.tsx.md (Campaign Simulator)
 * @description Documento espejo y SSoT conceptual para la página del Simulador de Campañas.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Página del Simulador de Campañas

## 1. Rol Estratégico

El aparato `src/app/[locale]/(dev)/dev/simulator/page.tsx` es una **herramienta de desarrollo y marketing crucial**. Su propósito principal es proporcionar una interfaz visual que permita a cualquier miembro del equipo **previsualizar todas las variantes de una campaña** de forma rápida y sencilla.

Actúa como un "lanzador" que lee la configuración de campañas directamente desde la SSoT (`campaign.map.json`) y genera enlaces para abrir cada variante en una nueva pestaña, simulando el acceso de un usuario final. Esto es fundamental para el A/B testing, la revisión de contenido y la validación de la arquitectura de campañas.

## 2. Arquitectura y Flujo de Ejecución

La página sigue una arquitectura clara que separa la lógica de datos de la presentación.

1.  **Capa de Datos (`getAvailableCampaigns`):**
    *   Esta función asíncrona se encarga de leer y transformar los datos.
    *   Importa estáticamente el `campaign.map.json` de la campaña `12157`.
    *   Itera sobre el objeto `variants` del mapa.
    *   Para cada variante, construye una URL completa y correctamente localizada, incluyendo el `campaignId` y el `variantId` como parámetro de búsqueda (`?v=...`).
    *   Devuelve una estructura de datos `Campaign[]` limpia y lista para ser consumida por la UI.

2.  **Capa de Presentación (`CampaignSimulatorPage`):**
    *   Es un Server Component asíncrono.
    *   Invoca a `getDictionary` y a `getAvailableCampaigns` en paralelo usando `Promise.all` para optimizar la carga.
    *   **Lógica de Resiliencia:** Verifica que el contenido específico de la página exista en el diccionario. Si no, renderiza un estado de error controlado.
    *   Itera sobre la estructura de datos `campaigns` recibida de la capa de datos.
    *   Renderiza una cuadrícula de componentes `Card`, donde cada tarjeta representa una variante de campaña y enlaza (`Link` de Next.js) a la URL generada.

## 3. Contrato de API

*   **Entradas (Props):**
    *   `params: { locale: Locale }` (inyectado por Next.js como `Promise`)
*   **Salidas:**
    *   Un elemento JSX `<Container>...</Container>` que contiene la interfaz del simulador o un estado de error.

## 4. Zona de Melhorias Futuras

1.  **Simulador Multi-Campaña:** Actualmente, el simulador está harcodeado para la campaña `12157`. Podría evolucionar para descubrir dinámicamente *todos* los directorios de campaña en `src/content/campaigns` y presentar un selector para elegir qué campaña simular.
2.  **Selector de Locale en la UI:** Añadir un `LanguageSwitcher` a la página permitiría a los revisores cambiar el idioma de las URLs generadas sin tener que cambiar el `locale` en la barra de direcciones del navegador.
3.  **Indicadores de Estado de Activos:** Cada tarjeta de variante podría mostrar pequeños indicadores visuales que confirmen que sus archivos de tema y contenido asociados existen y son válidos, proporcionando una capa de diagnóstico rápido.

// .docs-espejo/app/[locale]/(dev)/dev/simulator/page.tsx.md