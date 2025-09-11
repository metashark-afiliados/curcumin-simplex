# /.docs-espejo/app/[locale]/about/page.md
/**
 * @file page.md
 * @description Documento espejo para la página "Acerca de Nosotros".
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Página "Acerca de Nosotros"

## 1. Rol Estratégico

Este aparato es una **página de contenido estático** dentro del dominio del Portal. Su propósito principal es construir confianza y autoridad de marca (señales E-E-A-T de Google) proporcionando información transparente sobre la misión, visión y compromiso de Global Fitwell.

Actúa como un punto de contacto fundamental para los usuarios que desean saber más sobre la empresa antes de considerar una compra o suscripción.

## 2. Arquitectura y Flujo de Ejecución

1.  **Enrutamiento:** La página responde a la ruta `/`[locale]`/about`.
2.  **Recepción de `params`:** Como Server Component en una ruta dinámica, recibe el objeto `params` de Next.js como una `Promise`.
3.  **Resolución de `params`:** Utiliza `await` para resolver la promesa y acceder al valor de `locale`.
4.  **Obtención de Contenido:** Invoca a `getDictionary(locale)` para obtener el diccionario de contenido completo para el idioma solicitado.
5.  **Extracción de Datos:** Accede a la clave `aboutPage` del diccionario. El contenido está estructurado según el `TextPageLocaleSchema`, que define un título, subtítulo y un array de bloques de contenido (párrafos o títulos `h2`).
6.  **Renderizado Delegado:**
    -   Pasa el `title` y `subtitle` al componente de presentación `PageHeader`.
    -   Renderiza los bloques de contenido dentro de un `Container`, aplicando estilos de tipografía (`prose`) para una legibilidad óptima.

## 3. Contrato de API (Props)

-   `params`: `Promise<{ locale: Locale }>` - Objeto que contiene los parámetros dinámicos de la ruta, proveído por Next.js como una promesa.

## 4. Zona de Melhorias Futuras

1.  **Contenido Enriquecido:** Evolucionar el `TextPageLocaleSchema` para soportar más tipos de bloques de contenido, como listas (`ul`, `ol`), imágenes (`img`) o citas (`blockquote`), para crear páginas de contenido más ricas y visualmente atractivas.
2.  **Integración con CMS:** Refactorizar la lógica de obtención de datos para que el contenido de la página provenga de un CMS headless (como Strapi o Contentful) en lugar de los archivos JSON estáticos. Esto permitiría al equipo de marketing actualizar el contenido sin necesidad de un despliegue de código.
3.  **Componente de Equipo:** Crear un nuevo componente de sección para mostrar perfiles de los miembros clave del equipo, con fotos y biografías, y añadirlo a la página "Acerca de" para humanizar la marca.
4.  **Metadatos Dinámicos:** Mejorar la función `generateMetadata` de la página para que utilice el título y subtítulo del contenido de la página como metadatos SEO (`<title>` y `<meta name="description">`).
# /.docs-espejo/app/[locale]/about/page.md