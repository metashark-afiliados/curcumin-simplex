// .docs-espejo/app/[locale]/(campaigns)/[campaignId]/page.tsx.md
/**
 * @file page.tsx.md
 * @description Documento espejo para la página de campañas dinámicas.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Página de Campañas Dinámicas

## 1. Rol Estratégico

La `CampaignPage` es el **corazón del motor de conversión**. Es un aparato de enrutamiento dinámico que actúa como un "reproductor" o "ensamblador" universal para cualquier landing page de campaña. Su diseño se basa en el principio de **"Configuración sobre Código"**: la estructura, el contenido y el estilo de la página que renderiza no están definidos en su propio código, sino en los manifiestos de datos (`theme.json`, `content.json`) a los que apunta el `campaign.map.json`.

Su única responsabilidad es interpretar los parámetros de la URL (`campaignId`, `locale`, `variantId`), orquestar la carga de los activos de datos correctos y delegar el renderizado de cada sección al `SectionRenderer`.

## 2. Arquitectura y Flujo de Ejecución

Es un **Server Component** asíncrono.

1.  **Recepción de Parámetros:** Recibe `params` (`campaignId`, `locale`) y `searchParams` (`v` para el `variantId`) de Next.js.
2.  **Resolución de Parámetros:** Se aplica un `await` a `params` para cumplir con el contrato de tipos de Next.js. Se extrae el `variantId` del `searchParams`, con un fallback al valor `'01'`.
3.  **Orquestación de Datos:** Invoca a `getCampaignData`, el orquestador principal del dominio de campañas, pasándole los tres identificadores. Esta función maneja toda la complejidad de resolver, cargar y validar los datos de la campaña y el tema.
4.  **Inyección de Tema:** Envuelve todo su contenido en el `CampaignThemeProvider`, pasándole el objeto `theme` obtenido. Este provider se encarga de inyectar las variables CSS específicas de la campaña en el DOM del cliente.
5.  **Renderizado por Mapeo:** Itera sobre el array `theme.layout.sections` (que define el orden y la composición de la página) y, para cada sección, invoca al `SectionRenderer`, delegándole la responsabilidad de renderizar el componente correcto con los datos apropiados.

## 3. Contrato de API (`Props`)

-   `params: { campaignId: string; locale: Locale }`: Contiene los segmentos dinámicos de la ruta.
-   `searchParams: { [key: string]: string | ... }`: Contiene los parámetros de la URL, crucialmente `v` para la selección de variantes.

## 4. Zona de Melhorias Futuras

1.  **Manejo de Errores Elegante:** Implementar un `try-catch` alrededor de `getCampaignData` para mostrar una página de error de campaña personalizada si los manifiestos de datos no se encuentran o son inválidos, en lugar de una página 500 genérica de Next.js.
2.  **Generación de Metadatos Dinámicos:** Implementar una función `generateMetadata` que cargue el `content.json` de la campaña para generar etiquetas `<title>` y `<meta description>` dinámicas y específicas para cada variante, mejorando el SEO.
3.  **Streaming de Secciones con Suspense:** Para campañas muy largas, se podría envolver el mapeo de `SectionRenderer` en un `<Suspense>` para hacer streaming de las secciones, mejorando el Time to First Byte (TTFB) y el LCP.
// .docs-espejo/app/[locale]/(campaigns)/[campaignId]/page.tsx.md