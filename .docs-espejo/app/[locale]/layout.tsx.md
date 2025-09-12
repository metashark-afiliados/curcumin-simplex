<!-- .docs-espejo/app/layout.tsx.md -->
/**
 * @file .docs-espejo/app/layout.tsx.md
 * @description Documento Espejo y SSoT conceptual para el `RootLayout`.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Layout Raíz (`layout.tsx`)

## 1. Rol Estratégico

El `RootLayout` es la **columna vertebral del documento HTML** de toda la aplicación. Su rol es ser un **Componente de Servidor (RSC) puro** que establece la estructura fundamental (`<html>`, `<head>`, `<body>`), gestiona la configuración de fuentes, e inyecta elementos críticos del lado del servidor.

## 2. Arquitectura y Flujo de Ejecución

1.  **Generación de Metadatos:** La función `generateMetadata` se ejecuta en el servidor durante el build. Llama a `getDictionary` para obtener el título y la descripción del sitio para el `locale` correspondiente y los inyecta en el `<head>`, optimizando el SEO.
2.  **Inyección de Tema:** El componente `ThemeInjector` se renderiza en el servidor. Genera las variables CSS del tema global y las inserta en una etiqueta `<style>`, garantizando que los estilos base estén presentes desde la primera pintura del navegador y eliminando el FOUC.
3.  **Delegación a Cliente:** Envuelve el contenido de la página (`children`) con el componente `AppProviders`. Esta es una delegación explícita de responsabilidad: toda la lógica que necesite el entorno del navegador (hooks, estado, etc.) será manejada por `AppProviders`, manteniendo el `RootLayout` limpio y enfocado en el servidor.

## 3. Contrato de API

*   **Entradas (`props`):**
    *   `children`: El contenido de la página a renderizar.
    *   `params.locale`: El `locale` actual, proporcionado por el App Router de Next.js.
*   **Salidas:** Una estructura HTML completa y semántica.

## 4. Zona de Melhorias Futuras

*   **Soporte para Temas Oscuro/Claro:** Integrar un `ThemeProvider` que gestione el cambio entre temas claro y oscuro, posiblemente leyendo una cookie de preferencia.
*   **Datos Estructurados (JSON-LD):** Añadir un script de JSON-LD en el `<head>` para mejorar aún más el SEO con datos estructurados sobre la organización.
<!-- .docs-espejo/app/layout.tsx.md -->