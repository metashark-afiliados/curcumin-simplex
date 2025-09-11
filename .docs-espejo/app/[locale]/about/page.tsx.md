// .docs-espejo/app/[locale]/about/page.tsx.md
/**
 * @file .docs-espejo/app/[locale]/about/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato AboutPage.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
# Manifiesto Conceptual: Aparato `AboutPage`

## 1. Rol Estratégico y Propósito

La `AboutPage` (`/src/app/[locale]/about/page.tsx`) es un componente de servidor que renderiza la página "Sobre Nosotros" del portal. Su propósito es comunicar la misión, visión y valores de "Global Fitwell", actuando como un pilar fundamental para construir la confianza y autoridad de la marca (señales E-E-A-T para SEO).

Arquitectónicamente, es un ejemplo canónico de una página de contenido estático, consumiendo datos desde un diccionario i18n y utilizando componentes de UI reutilizables.

## 2. Arquitectura y Flujo de Ejecución

1.  **Entrada:** Recibe los `params` de la ruta como una `Promise`.
2.  **Resolución de Parámetros:** Utiliza `await params` para resolver la promesa y obtener el `locale` de forma segura.
3.  **Obtención de Datos:** Invoca a `getDictionary(locale)` para cargar el diccionario de contenido.
4.  **Extracción de Contenido:** Accede a la clave `aboutPage` del diccionario. El contenido se valida contra el `TextPageLocaleSchema` genérico.
5.  **Renderizado Robusto:**
    *   Si el contenido para `aboutPage` no se encuentra, se registra una advertencia y el componente devuelve un fragmento vacío para evitar un crash.
    *   Si el contenido existe, renderiza el `PageHeader` con el título y subtítulo.
    *   Renderiza el cuerpo del contenido (`content`) iterando sobre el array y generando etiquetas `<h2>` o `<p>` según la propiedad `type` de cada bloque.
    *   Utiliza las clases de `@tailwindcss/typography` (`prose`) para un estilizado tipográfico automático y consistente.

## 3. Contrato de API

*   **Entradas (`props`):**
    *   `params: { locale: Locale }`: Objeto de parámetros de ruta proporcionado por Next.js.
*   **Salidas:** Un `React.ReactElement` que representa la página "Sobre Nosotros" completamente renderizada en el servidor.

## 4. Zona de Melhorias Futuras

### Novas Melhorias Futuras de Valor
1.  **Contenido desde CMS:** Migrar la fuente de datos desde el archivo JSON estático a un Headless CMS para permitir la edición de contenido sin intervención del desarrollador.
2.  **Componentes de Contenido Enriquecido:** Extender el `TextPageLocaleSchema` para soportar más tipos de bloques de contenido, como imágenes (`type: "image"`), citas (`type: "quote"`) o listas (`type: "list"`).
3.  **Metadatos Estructurados (Schema.org):** Añadir metadatos JSON-LD a la página para definirla como una `Organization` o `WebPage` para mejorar el SEO semántico.
4.  **Sección de Equipo:** Añadir un nuevo tipo de bloque de contenido o un componente de sección separado para mostrar perfiles de los miembros clave del equipo, reforzando la señal de "Experiencia" (E-E-A-T).
5.  **Mapa Interactivo:** Integrar un mapa (ej. Leaflet o Google Maps) si la organización tiene una ubicación física que desee destacar.
// .docs-espejo/app/[locale]/about/page.tsx.md