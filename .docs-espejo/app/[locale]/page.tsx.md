// .docs-espejo/app/[locale]/page.tsx.md
/**
 * @file page.tsx.md
 * @description Documento espejo para la página de inicio del portal.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Homepage del Portal

## 1. Rol Estratégico

La `HomePage` (`/[locale]`) es la **portada principal y el hub de contenido** del ecosistema Global Fitwell. Su objetivo estratégico es presentar una visión general de la marca, destacar el contenido más reciente y relevante, y actuar como un punto de partida para que los usuarios exploren las diferentes áreas del portal (Noticias, Tienda, etc.).

Es un **Server Component** puro, optimizado para un rendimiento de carga rápido y un excelente SEO.

## 2. Arquitectura y Flujo de Ejecución

El componente sigue un patrón de **Ensamblaje Condicional Basado en Datos**:

1.  **Recepción de Locale:** Recibe el `locale` como parámetro desde la estructura de enrutamiento de Next.js.
2.  **Carga de Diccionario:** Invoca a `getDictionary(locale)` para obtener el objeto de contenido completo para el idioma solicitado.
3.  **Renderizado Condicional:** La estructura de la página no está hardcodeada. El componente verifica la existencia de claves de sección específicas en el diccionario (`t.heroNews`, `t.newsGrid`, etc.). **Solo si una clave de contenido existe, se renderiza la sección correspondiente**. Este mecanismo convierte a los archivos de contenido (`.i18n.json`) en la SSoT para el layout de la página, permitiendo al equipo de contenido activar o desactivar secciones sin tocar el código.
4.  **Inyección de Props (Spread):** A cada componente de sección que se renderiza, se le pasan sus datos correspondientes del diccionario utilizando el operador de propagación (`...t.heroNews`), lo cual es una forma limpia y eficiente de inyectar las `props`.
5.  **Inyección de Header de Desarrollo:** En modo de desarrollo (`process.env.NODE_ENV === 'development'`), el componente renderiza condicionalmente el `DevHomepageHeader`, proporcionando acceso a las herramientas de DX.

## 3. Contrato de API (`Props`)

-   `params: { locale: Locale }`: El objeto que contiene el `locale` de la URL, garantizando la carga del contenido correcto.

## 4. Zona de Melhorias Futuras

1.  **Layout Dinámico desde CMS:** Evolucionar el sistema para que el orden y la selección de secciones no solo dependan de la existencia de datos, sino de una lista explícita (`layout: ["HeroNews", "NewsGrid"]`) que podría provenir de un Headless CMS, dando control total al equipo de contenido.
2.  **Personalización de Contenido:** Integrar lógica para mostrar diferentes secciones basadas en cookies de usuario o datos geográficos, permitiendo una experiencia de portada personalizada.
3.  **Streaming de Secciones:** Para páginas con muchas secciones, implementar React Server Components con `Suspense` para hacer streaming del contenido, mostrando las secciones superiores inmediatamente mientras las inferiores se cargan.
// .docs-espejo/app/[locale]/page.tsx.md