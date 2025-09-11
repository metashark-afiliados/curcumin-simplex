# /.docs-espejo/app/[locale]/(campaigns)/[campaignId]/page.tsx.md
/**
 * @file .docs-espejo/app/[locale]/(campaigns)/[campaignId]/page.tsx.md
 * @description Documento espejo para el componente de página de campaña dinámica.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: El Motor de Renderizado de Campañas

## 1. Rol Estratégico

El aparato `CampaignPage` es el **corazón dinámico del dominio de campañas**. Su única responsabilidad es actuar como un **ensamblador de alto nivel**. No contiene lógica de presentación, sino que orquesta el flujo de datos y renderizado para construir cualquier landing page de campaña definida por la arquitectura de datos soberanos (MACS). Es el punto final donde la configuración (`campaign.map.json`, `theme.json`) se traduce en una interfaz de usuario visible.

## 2. Arquitectura y Flujo de Ejecución

Este aparato es un **React Server Component (RSC)** asíncrono. Su flujo de ejecución es el siguiente:

1.  **Recepción de Contexto de Ruta:** Recibe `params` (conteniendo `campaignId` y `locale`) y `searchParams` (conteniendo el `variantId` opcional en la clave `v`) como promesas desde el enrutador de Next.js.
2.  **Resolución de Parámetros:** Utiliza `await` para resolver las promesas de `params` y `searchParams`, obteniendo acceso seguro a los identificadores de la campaña, el idioma y la variante.
3.  **Obtención de Datos de Campaña:** Invoca al orquestador `getCampaignData`, pasándole los identificadores resueltos. Esta es su principal dependencia y el punto de entrada a toda la lógica de carga de datos de campaña.
4.  **Preparación para el Renderizado:** Una vez que `getCampaignData` devuelve el `dictionary` y el `theme`, la página extrae la lista de secciones a renderizar desde `theme.layout.sections`.
5.  **Inyección de Tema:** Envuelve todo el contenido en el `CampaignThemeProvider`, pasándole el objeto `theme` completo. Esto asegura que las variables CSS específicas de la campaña se inyecten en el servidor, evitando FOUC.
6.  **Renderizado Iterativo:** Itera sobre la lista de secciones y, para cada una, invoca al `SectionRenderer`. Le delega la responsabilidad de encontrar y renderizar el componente React correcto, pasándole el `dictionary` completo y el `locale`.

## 3. Contrato de API

### Props de Entrada

*   `params: { campaignId: string, locale: Locale }`: Parámetros de la ruta dinámica.
*   `searchParams: { v?: string }`: Parámetros de consulta para seleccionar la variante.

### Lógica de Generación Estática (`generateStaticParams`)

*   Exporta una función que genera las rutas base para todas las combinaciones de `campaignId` y `locale` conocidas. Esto permite a Next.js pre-renderizar las versiones por defecto de las campañas durante el build (SSG). Las variantes con `?v=` se renderizarán dinámicamente bajo demanda.

## 4. Zona de Melhorias Futuras

1.  **Gestión de Errores Sofisticada:** En lugar de dejar que un error en `getCampaignData` rompa la página, se podría implementar un `try...catch` para mostrar una página de error de campaña personalizada o redirigir a una página de fallback.
2.  **Soporte para Múltiples Campañas:** La función `generateStaticParams` podría leer un índice de nivel superior para descubrir dinámicamente todos los `campaignId` disponibles en `src/content/campaigns`, en lugar de tener `12157` harcodeado.
3.  **Metadata Dinámica:** Implementar una función `generateMetadata` que cargue el `dictionary` para obtener un título y descripción específicos para cada variante de campaña, mejorando el SEO.
4.  **Streaming con Suspense:** Para campañas muy largas, las secciones "below the fold" podrían envolverse en `<Suspense>`, permitiendo que la parte superior de la página se envíe al cliente más rápido mientras las secciones inferiores aún se están renderizando en el servidor.