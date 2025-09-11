// .docs-espejo/app/[locale]/(dev)/dev/components/[componentName]/page.tsx.md
/**
 * @file page.tsx.md
 * @description Documento espejo para la página anfitriona del canvas de componentes.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Página Anfitriona del Canvas de Componentes

## 1. Rol Estratégico

Este aparato es una **Página de Enrutamiento Dinámico y Anfitriona (Host Page)**. Su única y exclusiva responsabilidad es servir como el punto de entrada para la URL `/dev/components/[componentName]` y renderizar el aparato `ComponentCanvas`.

Actúa como un "caparazón" o "marco" que:
1.  **Genera las Rutas Estáticas:** Informa a Next.js de todas las combinaciones posibles de componentes y locales para que sean pre-renderizadas durante el build (`generateStaticParams`).
2.  **Delega la Lógica:** Pasa los parámetros de la URL (`componentName`, `locale`) directamente a su único hijo, el `ComponentCanvas`, que es el verdadero responsable de la lógica de carga y renderizado.

## 2. Arquitectura y Flujo de Ejecución

Es un **Server Component síncrono** y extremadamente simple.

1.  **`generateStaticParams` (En tiempo de build):**
    *   Consulta el `ComponentRegistry` para obtener la lista de todos los componentes disponibles.
    *   Consulta `i18n.config.ts` para obtener todos los `supportedLocales`.
    *   Crea un array con todas las combinaciones posibles (ej. `{ componentName: 'Hero', locale: 'it-IT' }`, `{ componentName: 'Hero', locale: 'es-ES' }`, etc.).
    *   Devuelve este array a Next.js para la generación de páginas estáticas.
2.  **Renderizado (En tiempo de build/request):**
    *   Recibe los `params` de la URL.
    *   Renderiza el `Container` para mantener la consistencia del layout.
    *   Renderiza el `ComponentCanvas`, pasándole los `params` recibidos. No realiza ninguna otra operación.

Esta arquitectura asegura una separación de intereses perfecta, donde esta página solo se preocupa del enrutamiento y el `ComponentCanvas` de la lógica de la aplicación.

## 3. Contrato de API (`Props`)

-   `params: { locale: Locale; componentName: string }`: El objeto con los segmentos dinámicos de la URL, que son pasados directamente al componente hijo.

## 4. Zona de Melhorias Futuras

1.  **Renderizado de Fallback:** Implementar un mecanismo para manejar elegantemente el caso en que se acceda a una URL con un `componentName` que no existe en el registro (ej. un error tipográfico en la URL). Actualmente, Next.js mostraría un 404, pero se podría renderizar una página de error más informativa para el desarrollador.
2.  **Metadata Dinámica:** La página podría generar metadatos dinámicos (`<title>`) basados en el componente que se está visualizando (ej. `<title>Dev Canvas: Hero</title>`), mejorando la experiencia en el navegador.
// .docs-espejo/app/[locale]/(dev)/dev/components/[componentName]/page.tsx.md