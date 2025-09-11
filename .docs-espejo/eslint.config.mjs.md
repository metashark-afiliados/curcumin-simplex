# .docs-espejo/eslint.config.mjs.md
/**
 * @file .docs-espejo/eslint.config.mjs.md
 * @description Documento Espejo para el aparato de configuración eslint.config.mjs.
 * @version 1.0.0
 * @author Raz Podestá - MetaShark Tech
 */

# Manifiesto Conceptual: `eslint.config.mjs`

## 1. Rol Estratégico

El aparato `eslint.config.mjs` es el **Guardián de la Calidad Estática del Código**. Su rol estratégico es actuar como la Única Fuente de Verdad (SSoT) que define un conjunto de reglas no negociables sobre el estilo, la sintaxis y las buenas prácticas del código TypeScript y React del proyecto.

Es una herramienta de prevención proactiva que:
1.  **Asegura la Consistencia:** Garantiza que todo el código escrito por cualquier desarrollador se adhiera a un estándar uniforme, mejorando drásticamente la legibilidad y la mantenibilidad.
2.  **Previene Errores Comunes:** Detecta patrones de código problemáticos, como violaciones a las Reglas de Hooks de React, antes de que lleguen a la fase de pruebas o producción.
3.  **Automatiza la Calidad:** Se integra en el pipeline de CI/CD para actuar como una puerta de calidad automática, bloqueando la fusión de código que no cumpla con los estándares.

## 2. Arquitectura y Flujo de Ejecución

Este aparato es un **manifiesto de configuración** para el motor de ESLint, utilizando el moderno formato "Flat Config".

1.  **Entrada:** El conjunto de archivos del proyecto (excluyendo los definidos en `ignores`).
2.  **Proceso:** El comando `pnpm run lint` invoca a ESLint, que carga este archivo. ESLint procesa la configuración como un array, fusionando los objetos de configuración. Importa y aplica las reglas de los plugins especificados (`next`, `prettier`, `react-hooks`).
3.  **Salida:** Un reporte en la terminal que lista todas las violaciones a las reglas definidas. Si hay errores, el proceso termina con un código de salida distinto de cero, lo que permite su uso en pipelines de CI.

## 3. Contrato de API (Configuraciones Clave)

El "contrato" de este aparato es el conjunto de reglas que impone al resto de la base de código.

*   **`extends: ['...','prettier']`**: Este contrato es fundamental. Garantiza que las reglas de formato de ESLint no entrarán en conflicto con las de Prettier, delegando la responsabilidad del formato a la herramienta especializada y evitando "guerras" entre linters.
*   **`plugins: { 'react-hooks': ... }`**: Este contrato impone las Reglas de Hooks de React, una de las defensas más importantes contra bugs de estado y ciclo de vida en componentes funcionales.
*   **`ignores: [...]`**: Define explícitamente las fronteras del análisis, mejorando el rendimiento y evitando falsos positivos en código de terceros o de build.

## 4. Zona de Melhorias Futuras

*   **Integración de `eslint-plugin-jsx-a11y`:** Añadir reglas para forzar las mejores prácticas de accesibilidad directamente en el JSX.
*   **Reglas de Orden de Importación:** Implementar `eslint-plugin-import` para estandarizar el orden de las declaraciones `import`, mejorando la legibilidad.
*   **Reglas Específicas del Proyecto:** Desarrollar reglas de ESLint personalizadas para forzar convenciones propias del proyecto (ej. nomenclatura de componentes, estructura de props).
*   **Análisis de Complejidad Ciclomática:** Añadir reglas que marquen funciones que excedan un umbral de complejidad, promoviendo la refactorización hacia código más simple.
*   **Configuración por Entorno:** Crear configuraciones diferenciadas que apliquen reglas más estrictas (como `no-console`) solo para los builds de producción.