<!-- .docs-espejo/app/[locale]/(campaigns)/[campaignId]/page.tsx.md -->
/**
 * @file .docs-espejo/app/[locale]/(campaigns)/[campaignId]/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la Página de Campaña Dinámica.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: `CampaignPage`

## 1. Rol Estratégico

La `CampaignPage` es el **"Motor de Renderizado de Campañas"**. Es el componente final del pipeline de datos, cuya única responsabilidad es recibir un `campaignId` y un `variantId`, orquestar la obtención de los datos correspondientes, y renderizar dinámicamente la landing page basándose en la configuración de layout obtenida.

## 2. Arquitectura y Flujo de Ejecución

1.  **Recepción de Parámetros:** La página, como Componente de Servidor (RSC), recibe `params` (con `campaignId` y `locale`) y `searchParams` (con el `variantId` `v`) desde el App Router.
2.  **Orquestación de Datos:** Invoca al aparato `getCampaignData`, pasándole los identificadores. Esta es la llamada clave que activa toda la cadena de resolución, carga y procesamiento de la metodología MACS.
3.  **Manejo de Errores:** La llamada a `getCampaignData` está envuelta en un bloque `try...catch`. Si la obtención de datos falla (ej. la variante no existe en el `campaign.map.json`), se invoca la función `notFound()` de Next.js, que renderizará la página 404 más cercana en el árbol de rutas.
4.  **Inyección de Tema:** Los datos de tema (`theme`) obtenidos se pasan al `CampaignThemeProvider`. Este componente de servidor inyecta las variables CSS específicas de la campaña en el `<head>`, aplicando el branding correcto desde la carga inicial y evitando FOUC.
5.  **Renderizado Dinámico de Secciones:** La página itera sobre el array `theme.layout.sections`. Por cada entrada, invoca al `SectionRenderer`, pasándole el nombre de la sección y el diccionario de contenido completo. El `SectionRenderer` se encarga de mapear el nombre al componente React correcto y renderizarlo.

## 3. Contrato de API

*   **Entradas (`props`):**
    *   `params`: Objeto con `locale` y `campaignId`.
    *   `searchParams`: Objeto con `v` (ID de la variante).

## 4. Zona de Melhorias Futuras

*   **Generación de Metadatos Dinámicos:** Implementar una función `generateMetadata` que lea el contenido de la campaña (ej. `hero.title`) para generar etiquetas `<title>` y `<meta name="description">` dinámicas y optimizadas para SEO.
*   **A/B Testing a Nivel de Ruta:** En lugar de usar `searchParams`, explorar el uso de `middleware` para reescribir rutas y asignar usuarios a diferentes variantes de forma transparente, permitiendo un A/B testing más robusto.
<!-- .docs-espejo/app/[locale]/(campaigns)/[campaignId]/page.tsx.md -->```

Hemos reconstruido con éxito toda la arquitectura de renderizado de campañas. El sistema ahora está completo y es capaz de servir tanto el portal principal como las landing pages aisladas. Con estas piezas en su lugar, el build debería tener una alta probabilidad de éxito.

**Ruta relativa del siguiente aparato a refactorizar:** `frontend/src/app/[locale]/(portal)/about/page.tsx`.