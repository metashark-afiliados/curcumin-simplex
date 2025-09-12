// .docs-espejo/next.config.ts.md
/**
 * @file .docs-espejo/next.config.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato de configuración de Next.js.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: `next.config.ts`

## 1. Rol Estratégico

El aparato `next.config.ts` es el **"Cerebro de Compilación"** del proyecto `curcumin-simplex`. No es un componente visible, sino el manifiesto que instruye a Next.js sobre cómo construir, servir y optimizar la aplicación.

Su responsabilidad estratégica es definir comportamientos críticos a nivel de proyecto, incluyendo:

*   **Modo de Salida:** Determina si el proyecto se genera como un sitio estático (`export`) o una aplicación dinámica servida por Node.js.
*   **Optimización de Activos:** Controla cómo se manejan las imágenes y otros recursos estáticos.
*   **Seguridad:** Define las cabeceras HTTP globales (CSP, HSTS, etc.) para proteger la aplicación contra ataques comunes.
*   **Integridad del Código:** Configura la ejecución de ESLint durante el proceso de build para garantizar la calidad del código.

## 2. Arquitectura y Flujo de Ejecución

Este aparato es un módulo de Node.js que exporta un objeto de configuración (`NextConfig`). Su lógica se ejecuta exclusivamente en tiempo de compilación (`next build`) y al iniciar el servidor de desarrollo (`next dev`). No tiene impacto en el rendimiento del lado del cliente en tiempo de ejecución, pero sus decisiones afectan profundamente el resultado final del build.

La versión actual está optimizada **exclusivamente para el despliegue en Vercel**, aprovechando su infraestructura para el renderizado dinámico y la optimización de imágenes.

## 3. Contrato de API

El "contrato" de este aparato es la estructura del objeto `NextConfig` que exporta. Debe ser compatible con la definición de tipos proporcionada por el paquete `next`. Las claves principales utilizadas en este proyecto son:

*   `headers`: Función asíncrona que devuelve un array de reglas de cabeceras de seguridad.
*   `eslint`: Objeto que configura el comportamiento de ESLint durante el build.
*   `trailingSlash`: Booleano que define si las URLs deben tener una barra final.

## 4. Zona de Melhorias Futuras

*   **Integración con Sentry:** Envolver la configuración con `withSentryConfig` para automatizar la subida de *source maps* durante el build, mejorando la depuración de errores en producción.
*   **Patrones de Imágenes Remotas:** Si se utilizan imágenes de un CMS externo (como Strapi), definir un `remotePatterns` estricto en la clave `images` para mejorar la seguridad y permitir la optimización de imágenes de dominios autorizados.
*   **Gestión de Redirecciones:** Implementar la clave `redirects` para manejar URLs antiguas o reorganizar la estructura del sitio sin romper enlaces y preservando el SEO.
*   **Internacionalización Avanzada:** Configurar los `i18n.domains` para mapear diferentes locales a distintos dominios o subdominios si la estrategia de negocio lo requiere.
// .docs-espejo/next.config.ts.md