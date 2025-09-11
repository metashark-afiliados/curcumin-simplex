// .docs-espejo/eslint.config.mjs.md
/**
 * @file .docs-espejo/eslint.config.mjs.md
 * @description Documento Espejo y SSoT conceptual para el aparato de configuración eslint.config.mjs.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: eslint.config.mjs

## 1. Rol Estratégico

El `eslint.config.mjs` es el **Guardián de la Calidad y Consistencia del Código**. Actúa como la Única Fuente de Verdad (SSoT) para el análisis estático del código fuente del proyecto. Su propósito es:

*   **Prevenir Errores:** Detectar patrones de código problemáticos que podrían llevar a bugs en tiempo de ejecución.
*   **Forzar Estándares:** Asegurar que todo el código se adhiera a un conjunto de mejores prácticas predefinidas (reglas de React, TypeScript, accesibilidad).
*   **Mejorar la Legibilidad:** Garantizar un estilo de código consistente en toda la base de código, especialmente con el ordenamiento automático de importaciones.
*   **Automatizar la Calidad:** Se integra en el pipeline de CI/CD para actuar como una barrera de calidad automática, previniendo que código de baja calidad sea fusionado a la rama principal.

## 2. Arquitectura y Flujo de Ejecución

Este aparato es un descriptor de configuración estático en formato "flat config". Es consumido por la herramienta ESLint durante el desarrollo (a través de la extensión del IDE) y en el pipeline de CI (`pnpm run lint`).

El flujo de configuración es un pipeline de capas:

1.  **`ignores`**: Define los directorios que deben ser completamente ignorados por el linter.
2.  **`compat.extends("next/core-web-vitals")`**: Importa el conjunto de reglas base recomendado por Next.js, que incluye configuraciones para React y optimizaciones de rendimiento.
3.  **`simple-import-sort` y `jsx-a11y`**: Añade reglas para el ordenamiento automático de importaciones y para la validación de accesibilidad en el JSX.
4.  **Bloque `files: ["src/**/*.{ts,tsx}"]`**: Define un conjunto de reglas más estricto que se aplica **únicamente** a los archivos de código fuente de TypeScript. Habilita el parser de TypeScript para un análisis más profundo y activa las reglas recomendadas de `react-hooks` y `@typescript-eslint`.
5.  **`eslint-plugin-prettier/recommended`**: Esta es **la última capa** y es crucial. Desactiva todas las reglas de ESLint que podrían entrar en conflicto con Prettier, delegando toda la responsabilidad del formato de código a Prettier.

## 3. Contrato de API

La "API" del archivo es la estructura del array `eslintConfig` exportado, que debe cumplir con la especificación de "flat config" de ESLint.

## 4. Zona de Melhorias Futuras

*   **Reglas de Vitest:** Integrar `eslint-plugin-vitest` para aplicar reglas específicas a los archivos de prueba (`tests/**/*.test.tsx`), como asegurar el uso correcto de las funciones de aserción.
*   **Reglas de Sentry:** Añadir `eslint-plugin-sentry` para detectar y sugerir las mejores prácticas al instrumentar el código con Sentry.
*   **Reglas de `jsx-a11y` más Estrictas:** Activar el modo `strict` en la configuración de `jsx-a11y` para forzar un cumplimiento aún mayor de las pautas de accesibilidad.
*   **Configuración de `simple-import-sort` más Granular:** Personalizar los grupos de importación para separar, por ejemplo, los `hooks` de los `components` y los `types` de la `lib`.
*   **Regla `no-console` en Producción:** Añadir una regla que genere un error si se encuentran llamadas a `console.log` en el código cuando `NODE_ENV` es `production`.
*   **Caché de ESLint:** Habilitar la opción de caché en los scripts de `lint` para acelerar las ejecuciones subsiguientes en el pipeline de CI.
*   **Reglas de Nomenclatura:** Implementar reglas de `@typescript-eslint` para forzar convenciones de nomenclatura (ej. interfaces deben empezar con `I`).
*   **Plugin de `tailwindcss`:** Integrar `eslint-plugin-tailwindcss` para ordenar automáticamente las clases de Tailwind y detectar conflictos.
*   **Documentación de Reglas:** Añadir comentarios en línea en el archivo de configuración para justificar por qué se ha activado, desactivado o modificado una regla específica.
*   **Script de `lint-staged`:** Integrar `lint-staged` con `husky` para ejecutar el linter solo en los archivos modificados antes de cada commit, acelerando el ciclo de feedback local.

// .docs-espejo/eslint.config.mjs.md