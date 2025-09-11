// .docs-espejo/package.json.md
/**
 * @file .docs-espejo/package.json.md
 * @description Documento Espejo y SSoT conceptual para el aparato de configuración package.json.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: package.json

## 1. Rol Estratégico

El `package.json` es el **manifiesto de identidad y dependencias** del proyecto `curcumin-simplex`. Actúa como la Única Fuente de Verdad (SSoT) para:

*   **Identidad:** Define el nombre, versión y propósito del proyecto.
*   **Dependencias:** Lista explícitamente todas las librerías de terceros necesarias para el desarrollo (`devDependencies`) y la producción (`dependencies`).
*   **Scripts:** Proporciona un conjunto de comandos estandarizados para interactuar con el ciclo de vida del proyecto (desarrollo, build, test, linting).
*   **Gobernanza:** Fija la versión del gestor de paquetes (`pnpm`), garantizando un entorno de desarrollo 100% reproducible.

Su integridad y precisión son críticas para la estabilidad y mantenibilidad de todo el ecosistema.

## 2. Arquitectura y Flujo de Ejecución

Este aparato es un descriptor estático, no un código ejecutable. Su "flujo" se manifiesta a través de las herramientas del ecosistema Node.js:

1.  **`pnpm install`**: Lee las secciones `dependencies` y `devDependencies` para construir el directorio `node_modules` de forma determinista, basándose en `pnpm-lock.yaml`.
2.  **`pnpm run <script>`**: Ejecuta los comandos definidos en la sección `scripts`.
3.  **CI/CD (GitHub Actions)**: El pipeline de CI/CD consume este archivo para instalar dependencias y ejecutar scripts de validación (`lint`, `test`, `build`).

## 3. Contrato de API

El `package.json` no tiene una API en el sentido de una función, pero su estructura es un contrato estricto. Las claves principales como `name`, `version`, `scripts`, `dependencies` y `devDependencies` son su "API pública" para el ecosistema de herramientas.

## 4. Zona de Melhorias Futuras

*   **Automatización de Versionado:** Implementar `semantic-release` para automatizar el versionado del paquete y la generación del `CHANGELOG.md` basándose en los commits semánticos.
*   **Ganchos Pre-commit:** Integrar `husky` y `lint-staged` para ejecutar automáticamente los scripts de `lint` y `format` en los archivos modificados antes de cada commit, garantizando la calidad del código de forma proactiva.
*   **Auditoría de Dependencias:** Añadir un script `audit` (`pnpm audit`) al pipeline de CI para detectar y alertar sobre vulnerabilidades en las dependencias.
*   **Optimización de Scripts:** Refinar los scripts de `build` para incluir análisis de tamaño de bundle (`@next/bundle-analyzer`) y generar informes de rendimiento.
// .docs-espejo/package.json.md