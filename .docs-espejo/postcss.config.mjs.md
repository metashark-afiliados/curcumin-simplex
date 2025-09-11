# .docs-espejo/postcss.config.mjs.md
/**
 * @file .docs-espejo/postcss.config.mjs.md
 * @description Documento Espejo para el aparato de configuración postcss.config.mjs.
 * @version 1.0.0
 * @author Raz Podestá - MetaShark Tech
 */

# Manifiesto Conceptual: `postcss.config.mjs`

## 1. Rol Estratégico

El aparato `postcss.config.mjs` actúa como el **Orquestador del Pipeline de Transformación de CSS**. Su única y fundamental responsabilidad es definir qué herramientas (plugins) procesarán los archivos CSS del proyecto.

En la arquitectura de `curcumin-simplex`, su rol es singular: registrar el plugin `@tailwindcss/postcss`. Esto lo convierte en el punto de entrada que "activa" todo el poder de Tailwind CSS, permitiéndole escanear el código, interpretar las directivas personalizadas (`@theme`, `@apply`) y generar el CSS final optimizado.

## 2. Arquitectura y Flujo de Ejecución

Este aparato es un manifiesto de configuración para el ecosistema de PostCSS.

1.  **Entrada:** El archivo CSS principal del proyecto (`src/app/globals.css`).
2.  **Proceso:** Cuando el proceso de build de Next.js encuentra un archivo CSS, invoca a PostCSS. PostCSS lee este archivo de configuración para determinar qué transformaciones aplicar. Carga el plugin `@tailwindcss/postcss` y le pasa el control del CSS.
3.  **Salida:** Un único archivo CSS procesado, optimizado y listo para producción, que contiene todas las clases de utilidad generadas por Tailwind.

## 3. Contrato de API (`plugins`)

*   **`plugins: { "@tailwindcss/postcss": {} }`**: Este es el único contrato del aparato. Es una declaración explícita que establece a Tailwind CSS como la única herramienta de transformación en nuestro pipeline de CSS, asegurando un proceso simple, predecible y alineado con las mejores prácticas de Tailwind 4.

## 4. Zona de Melhorias Futuras

*   **Integración de Autoprefixer (si es necesario):** Aunque Tailwind 4 maneja la mayoría de los prefijos de proveedor a través de Lightning CSS, si se requiriera un control más granular para navegadores específicos, se podría añadir `autoprefixer` al pipeline de plugins.
*   **Integración de `postcss-import`:** Si el proyecto creciera en complejidad de CSS y necesitara una estrategia de importación más avanzada que la nativa de CSS, este plugin podría ser añadido.
*   **Linting de CSS:** Se podría integrar `stylelint` como un plugin de PostCSS para validar el CSS personalizado y asegurar la consistencia.```

---
**Análisis Profundo y Persistente completado.** Se ha identificado que los errores persistentes son un problema de entorno y se ha proporcionado la directiva para solucionarlos. Se ha procedido con la refactorización y documentación del aparato `postcss.config.mjs`.

**Ruta relativa del siguiente aparato a refactorizar:** `tailwind.config.ts`