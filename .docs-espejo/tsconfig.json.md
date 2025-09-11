# .docs-espejo/tsconfig.json.md
/**
 * @file .docs-espejo/tsconfig.json.md
 * @description Documento Espejo para el aparato de configuración tsconfig.json.
 * @version 1.0.0
 * @author Raz Podestá - MetaShark Tech
 */

# Manifiesto Conceptual: `tsconfig.json`

## 1. Rol Estratégico

El `tsconfig.json` es el **Manifiesto de Compilación y la Única Fuente de Verdad (SSoT)** que gobierna cómo el compilador de TypeScript (TSC) interpreta, analiza y valida el código fuente del proyecto.

Su rol estratégico es actuar como el **guardián principal de la calidad estática del código**. Define el contrato de tipos, el nivel de rigurosidad y las reglas de interoperabilidad de módulos, previniendo una categoría entera de errores en tiempo de ejecución antes de que el código sea siquiera transpilado.

## 2. Arquitectura y Flujo de Ejecución

Este aparato no es código ejecutable, sino un **documento de configuración** que dirige un proceso de build.

1.  **Entrada:** El conjunto de archivos especificado en la directiva `include`.
2.  **Proceso:** `tsc` (generalmente invocado por Next.js) lee este manifiesto y aplica las reglas definidas en `compilerOptions` para analizar estáticamente todos los archivos de entrada.
3.  **Salida:** Un conjunto de diagnósticos (errores o advertencias) que informan sobre la salud tipológica del proyecto. La opción `"noEmit": true` asegura que `tsc` solo se use para la verificación de tipos, delegando la transpilación a Next.js.

## 3. Contrato de API (`compilerOptions`)

Las `compilerOptions` son el "contrato de API" del compilador. Las directivas más críticas en nuestra configuración son:

*   **`"strict": true`**: Activa el modo más riguroso de TypeScript, que es no negociable para la calidad del proyecto.
*   **`"target": "ES2017"`**: Informa al compilador que el código se ejecutará en un entorno de JavaScript moderno, dándole acceso a las definiciones de tipo para `Map`, `Iterable`, `Promise`, etc.
*   **`"moduleResolution": "bundler"`**: Utiliza el algoritmo de resolución de módulos más moderno, que emula cómo herramientas como Next.js/Vite resuelven las importaciones.
*   **`"paths"`**: Define los alias de importación (`@/*`), que es un contrato fundamental para la organización del código y el Principio DRY.

## 4. Zona de Melhorias Futuras

*   **Reglas de Linting de Tipos más Estrictas:** Integrar `typescript-eslint` para habilitar reglas que requieran tipos de retorno explícitos en todas las funciones.
*   **Activación de `noUnusedLocals` y `noUnusedParameters`:** Habilitar estas opciones para mantener la base de código más limpia, eliminando variables y parámetros no utilizados que pueden generar confusión.
*   **Project References:** Si el proyecto evoluciona hacia un monorepo, se puede utilizar `references` para optimizar los tiempos de compilación entre paquetes.
*   **Extender una Configuración Base:** Crear un paquete `@metashark/tsconfig` con una configuración base compartida para todos los proyectos, promoviendo la consistencia a nivel de organización.
*   **Generación Automática de `paths`:** Implementar un script que genere automáticamente los alias en `paths` basándose en la estructura de directorios de `src/`, reduciendo la configuración manual.