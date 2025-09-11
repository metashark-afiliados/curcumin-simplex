// .docs-espejo/next.config.ts.md
/**
 * @file .docs-espejo/next.config.ts.md
 * @description Documento Espejo y SSoT conceptual para la configuración de Next.js.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: next.config.ts

## 1. Rol Estratégico

El `next.config.ts` es el **Manifiesto de Build y Runtime** del proyecto Next.js. Actúa como la Única Fuente de Verdad (SSoT) para instruir al compilador y al servidor de Next.js sobre cómo debe comportarse la aplicación.

Sus responsabilidades estratégicas incluyen:
*   **Definir el Modo de Salida:** Determina si el proyecto se compila como una aplicación dinámica servida por Node.js (`output: undefined`) o como un conjunto de archivos estáticos para hostings tradicionales (`output: 'export'`).
*   **Configurar la Seguridad:** Establece cabeceras HTTP globales (como `Content-Security-Policy`) para proteger la aplicación.
*   **Optimización de Activos:** Gobierna cómo se manejan y optimizan las imágenes.

## 2. Arquitectura y Flujo de Ejecución

Este aparato es un descriptor de configuración estático que es consumido por las herramientas de Next.js en diferentes fases del ciclo de vida del desarrollo:

1.  **`pnpm run dev`**: Next.js lee este archivo para configurar el servidor de desarrollo.
2.  **`pnpm run build`**: Next.js utiliza este archivo para determinar cómo compilar y empaquetar la aplicación para producción. La lógica condicional basada en la variable de entorno `NEXT_PUBLIC_DEPLOY_TARGET` se ejecuta en esta fase.
3.  **`pnpm run start`**: El servidor de producción de Next.js utiliza esta configuración para servir la aplicación y aplicar las cabeceras definidas.

## 3. Contrato de API

La "API" de este aparato es el objeto `NextConfig` exportado por defecto. Su estructura y propiedades están estrictamente definidas por la documentación de Next.js. Las claves principales utilizadas en este proyecto son:

*   `output: 'export' | undefined`: Controla el tipo de compilación.
*   `headers: () => Promise<Header[]>`: Función asíncrona para definir cabeceras HTTP.
*   `images: ImageConfig`: Configuración para la optimización de imágenes.
*   `trailingSlash: boolean`: Controla si las URLs deben tener una barra final.

## 4. Zona de Melhorias Futuras

*   **Política de Seguridad de Contenido (CSP):** Implementar una cabecera `Content-Security-Policy` robusta para mitigar ataques XSS.
*   **Integración de `next-bundle-analyzer`:** Añadir el plugin `@next/bundle-analyzer` para generar un informe visual del tamaño de los bundles de JavaScript, facilitando la optimización del rendimiento.
*   **Configuración de PWA:** Integrar el plugin `@ducanh2912/next-pwa` para añadir capacidades de Progressive Web App (Service Worker, manifest, etc.).
*   **Redirects y Rewrites Centralizados:** Utilizar las propiedades `redirects` y `rewrites` para gestionar redirecciones de SEO y reescrituras de URL a nivel de configuración, en lugar de en el middleware.
*   **Validación de Variables de Entorno:** Integrar Zod para validar la presencia y el formato de todas las variables de entorno requeridas en tiempo de build, deteniendo la compilación si la configuración es inválida.
*   **Manejo de Dominios Remotos para Imágenes:** Expandir la configuración de `images.remotePatterns` para incluir dominios de CDNs o sistemas de gestión de activos.
*   **Habilitar React Strict Mode:** Establecer `reactStrictMode: true` para activar comprobaciones adicionales en desarrollo que ayudan a identificar problemas potenciales.
*   **Configuración de Compilador:** Utilizar la opción `compiler` para habilitar optimizaciones experimentales de Rust como `removeConsole` o `styledComponents`.
*   **Internacionalización de Dominios:** Configurar `i18n.domains` para mapear diferentes dominios a diferentes locales para una estrategia de SEO internacional avanzada.
*   **Externalización de Configuración de Seguridad:** Mover la lógica de generación de cabeceras de seguridad a un módulo separado (`src/config/security.config.ts`) si se vuelve muy compleja, aunque se debe tener cuidado con los problemas de resolución de módulos.

// .docs-espejo/next.config.ts.md