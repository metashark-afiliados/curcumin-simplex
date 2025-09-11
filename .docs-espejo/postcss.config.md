// .docs-espejo/postcss.config.mjs.md
/**
 * @file .docs-espejo/postcss.config.mjs.md
 * @description Documento Espejo y SSoT conceptual para la configuración de PostCSS.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: postcss.config.mjs

## 1. Rol Estratégico

El `postcss.config.mjs` es el **Punto de Entrada del Pipeline de CSS**. Actúa como la Única Fuente de Verdad (SSoT) que le indica a PostCSS, nuestro procesador de CSS, qué transformaciones debe aplicar al código CSS del proyecto.

En `curcumin-simplex`, su única y crucial responsabilidad es **invocar el plugin de Tailwind CSS v4 (`@tailwindcss/postcss`)**, que orquesta todo el proceso de compilación de estilos.

## 2. Arquitectura y Flujo de Ejecución

Este aparato es un descriptor de configuración estático. Es consumido por las herramientas de build de Next.js en el siguiente flujo:

1.  **Trigger:** Durante el build (`pnpm run build`) o en desarrollo (`pnpm run dev`), Next.js detecta archivos CSS como `src/app/globals.css`.
2.  **Invocación de PostCSS:** Next.js invoca a PostCSS para procesar el archivo CSS.
3.  **Lectura de Configuración:** PostCSS lee `postcss.config.mjs` para determinar qué plugins ejecutar.
4.  **Ejecución del Plugin:** Se ejecuta el plugin `@tailwindcss/postcss`. Este, a su vez:
    *   Lee `tailwind.config.ts` para encontrar los archivos de contenido.
    *   Escanea los archivos (`.tsx`, `.ts`) en busca de clases de utilidad.
    *   Procesa las directivas especiales de Tailwind (`@theme`, `@layer`).
    *   Genera el CSS final, optimizado y con prefijos de proveedor (`autoprefixer` está incluido).
5.  **Salida:** El CSS procesado se inyecta en la aplicación.

```mermaid
graph TD
    A[Build Process (Next.js)] --> B[PostCSS];
    B --> C{Lee postcss.config.mjs};
    C --> D[Ejecuta @tailwindcss/postcss];
    D --> E{Lee tailwind.config.ts};
    E --> F[Escanea archivos de código];
    F --> G[Procesa directivas CSS];
    G --> H[Genera CSS final];
    H --> I[Inyecta en la App];
3. Contrato de API
La "API" de este archivo es la estructura del objeto de configuración exportado, que debe cumplir con el contrato esperado por postcss-load-config.
plugins: object: Un objeto donde las claves son los nombres de los plugins y los valores son sus opciones.
4. Zona de Melhorias Futuras
Integración de Stylelint: Añadir el plugin stylelint al pipeline para realizar linting sobre el CSS personalizado y asegurar la consistencia.
PostCSS Preset Env: Integrar postcss-preset-env para permitir el uso de características de CSS futuras ( polyfills) que aún no están soportadas por Tailwind o los navegadores objetivo.
Optimización de CSS en Producción: Añadir cssnano al pipeline, pero solo para el build de producción, para minificar el CSS final y reducir aún más su tamaño.
Generación de Fallbacks: Utilizar plugins como postcss-custom-properties-fallback para generar fallbacks para navegadores muy antiguos que no soportan variables CSS.
Ordenamiento de Propiedades: Integrar postcss-sorting para ordenar las propiedades de CSS en el CSS personalizado de forma consistente.
Informes de Build: Utilizar postcss-reporter para generar informes más detallados sobre el proceso de compilación de CSS en la consola.
Configuración por Entorno: Crear una configuración dinámica que cargue diferentes plugins para desarrollo (development) y producción (production).
Pruebas de Regresión Visual: Integrar plugins que faciliten las pruebas de regresión visual, como postcss-clean.
Manejo de Assets: Utilizar postcss-url para gestionar y optimizar las rutas de los assets referenciados en el CSS.
Documentación de Plugins: Mantener comentarios en línea en el archivo de configuración explicando el propósito de cada plugin añadido y el porqué de su configuración específica.
// .docs-espejo/postcss.config.mjs.md
code
Code