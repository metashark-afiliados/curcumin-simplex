# /.docs-espejo/postcss.config.md
/**
 * @file postcss.config.md
 * @description Documento espejo para la configuración de PostCSS.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Configuración de PostCSS

## 1. Rol Estratégico

El aparato `postcss.config.mjs` actúa como el **orquestador del pipeline de transformación de CSS**. Su rol estratégico es definir qué herramientas y en qué orden procesarán los archivos CSS del proyecto antes de que se genere el resultado final que se servirá al navegador.

En el contexto de `curcumin-simplex`, su única y fundamental responsabilidad es registrar y habilitar el plugin `@tailwindcss/postcss`, que es el motor principal de Tailwind CSS v4.

## 2. Arquitectura y Flujo de Ejecución

El flujo de ejecución es el siguiente:
1.  **Activación:** Durante el proceso de `build` (o en desarrollo), el framework (Next.js) detecta la presencia de un archivo `postcss.config.mjs`.
2.  **Carga de Configuración:** PostCSS carga este archivo y lee la lista de `plugins`.
3.  **Ejecución del Plugin:** PostCSS invoca al plugin `@tailwindcss/postcss`.
4.  **Procesamiento de Tailwind:** El plugin de Tailwind toma el control y realiza su propio proceso interno:
    -   Lee `tailwind.config.ts` para obtener las rutas del `content`.
    -   Escanea los archivos de `content`.
    -   Lee los archivos CSS de entrada (como `src/app/globals.css`).
    -   Interpreta las directivas de Tailwind (`@theme`, `@layer`, etc.).
    -   Genera el CSS final, optimizado y con prefijos de proveedor (autoprefixer está incorporado en Tailwind v4).
5.  **Salida:** El CSS procesado se entrega de vuelta al proceso de `build` de Next.js para ser incluido en los archivos finales.

La configuración es minimalista por diseño, ya que la complejidad se delega completamente al ecosistema de Tailwind.

## 3. Contrato de API

Este aparato es un archivo de configuración puro y es consumido por la herramienta PostCSS. No expone ninguna API para el código de la aplicación.

## 4. Zona de Melhorias Futuras

1.  **Integración con `postcss-import`:** Si el proyecto creciera y necesitara dividir el CSS en múltiples archivos que se importan unos a otros, se podría añadir `postcss-import` al pipeline *antes* de Tailwind para manejar estas importaciones.
2.  **Herramientas de Linting de CSS:** Se podrían añadir plugins como `stylelint` para aplicar reglas de linting específicas al CSS personalizado, garantizando una mayor consistencia de código.
3.  **Optimización Adicional (CSSNano):** En un escenario donde cada byte cuenta, se podría añadir `cssnano` al final del pipeline (después de Tailwind) para aplicar una minificación de CSS aún más agresiva en producción. (Nota: Generalmente, Next.js y Tailwind ya realizan una minificación muy eficiente).
# /.docs-espejo/postcss.config.md