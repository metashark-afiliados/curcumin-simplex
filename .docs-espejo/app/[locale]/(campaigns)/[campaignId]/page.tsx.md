# /.docs-espejo/app/[locale]/(campaigns)/[campaignId]/page.tsx.md
/**
 * @file page.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato ensamblador de campañas.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: El Ensamblador de Campañas

## 1. Rol Estratégico

Este aparato (`page.tsx`) es el **motor de renderizado soberano** para todas las landing pages de campañas. Su única responsabilidad es actuar como un "Ensamblador Lego" dinámico. No contiene lógica de presentación ni contenido hardcodeado; su función es orquestar la obtención de datos y delegar el renderizado a componentes especializados.

Esta arquitectura cumple con el Principio de Responsabilidad Única y permite una flexibilidad de marketing infinita, ya que la estructura, el estilo y el contenido de cualquier campaña se definen enteramente en archivos de configuración JSON, sin requerir cambios en el código React.

## 2. Arquitectura y Flujo de Ejecución

El aparato sigue un flujo de datos unidireccional y predecible en el servidor:

1.  **Recepción de Coordenadas:** El componente recibe `params` (con `campaignId` y `locale`) y `searchParams` (con `v` para la `variantId`) desde el App Router de Next.js.
2.  **Invocación del Orquestador:** Llama a la función `getCampaignData` con las coordenadas recibidas.
3.  **Obtención de Datos:** `getCampaignData` ejecuta el pipeline MACS (Metodología de Activos de Campaña Soberanos): resuelve las rutas desde `campaign.map.json`, carga los archivos de tema y contenido, los fusiona con el diccionario global y los valida contra los esquemas Zod.
4.  **Recepción de "Planos":** El componente recibe de vuelta dos objetos validados:
    *   `theme`: Contiene el "plano" de la página (`layout.sections`) y los tokens de diseño (`colors`, `fonts`).
    *   `dictionary`: Contiene todo el contenido textual necesario para renderizar las secciones.
5.  **Delegación del Renderizado:**
    *   Envuelve la página en el `CampaignThemeProvider`, inyectando las variables CSS del tema.
    *   Itera sobre el array `layout.sections` del objeto `theme`.
    *   Para cada sección, invoca al `SectionRenderer`, pasándole el nombre de la sección y el diccionario completo.

## 3. Contrato de API (Props)

*   `params`: `{ campaignId: string; locale: Locale; }` - Identifica la campaña y el idioma.
*   `searchParams`: `{ v?: string; }` - Opcional. Identifica la variante de la campaña a renderizar.

## 4. Zona de Melhorias Futuras (Registro de Valor)

1.  **Loading UI con Suspense:** Implementar un archivo `loading.tsx` en el mismo directorio para mostrar un esqueleto de carga (skeleton loader) mientras `getCampaignData` resuelve, mejorando la Perceived Performance.
2.  **`generateStaticParams` Dinámico:** La función podría leer el directorio `src/content/campaigns` para descubrir automáticamente todos los `campaignId` disponibles, eliminando la necesidad de harcodearlos.
3.  **Metadata de Imagen (Open Graph):** La función `generateMetadata` podría enriquecerse para incluir imágenes `og:image` dinámicas, obteniendo la ruta de la imagen principal desde el contenido de la campaña.
6. Zona de Melhorias Futuras (Nuevas)
Error Boundary Específico: En lugar de un notFound() genérico, se podría implementar un error.tsx en este directorio para capturar fallos de renderizado y mostrar un mensaje de error de campaña más específico y amigable.
Pre-carga de Variantes: Para pruebas A/B, se podría implementar una lógica de prefetch en el Link que lleva a la campaña para pre-cargar los datos de múltiples variantes si es necesario.
