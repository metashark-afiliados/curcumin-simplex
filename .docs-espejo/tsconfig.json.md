// .docs-espejo/tsconfig.json.md
/**
 * @file .docs-espejo/tsconfig.json.md
 * @description Documento Espejo y SSoT conceptual para el aparato de configuración tsconfig.json.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: tsconfig.json

## 1. Rol Estratégico

El `tsconfig.json` es la **Constitución del Lenguaje** para el proyecto `curcumin-simplex`. Actúa como la Única Fuente de Verdad (SSoT) que dicta al compilador de TypeScript (`tsc`) las reglas para:

*   **Validación de Tipos:** Define el nivel de rigurosidad (`strict: true`) con el que se analiza el código para prevenir errores en tiempo de ejecución.
*   **Transpilación:** Establece el objetivo de JavaScript (`target`) al que se compilará el código para asegurar la compatibilidad con navegadores.
*   **Resolución de Módulos:** Configura cómo se localizan e importan los módulos (`moduleResolution: "bundler"`) y define alias de ruta (`paths`) para mejorar la legibilidad y mantenibilidad del código.

Su correcta configuración es la base para un código base robusto, seguro y una experiencia de desarrollo (DX) de élite.

## 2. Arquitectura y Flujo de Ejecución

Este aparato es un descriptor estático. Su "ejecución" es llevada a cabo por herramientas externas que lo consumen:

1.  **Compilador `tsc` (invocado por Next.js):** Durante el proceso de `pnpm run build`, Next.js utiliza `tsc` con esta configuración para verificar los tipos de todo el proyecto. Un error de tipo aquí detendrá el build.
2.  **Servidor de Lenguaje de TypeScript (en IDEs como VS Code):** El editor lee este archivo para proporcionar IntelliSense, autocompletado y detección de errores en tiempo real mientras se escribe el código.
3.  **Vitest:** El corredor de pruebas utiliza esta configuración para entender cómo resolver los módulos y transpilar el código de prueba.

## 3. Contrato de API

La "API" de este archivo es su propia estructura JSON, definida por la especificación de TypeScript. Las claves principales son:

*   `compilerOptions`: El corazón de la configuración, donde se definen las reglas del compilador.
*   `include`: Un array de patrones `glob` que especifica qué archivos deben ser incluidos en el proceso de compilación.
*   `exclude`: Un array de patrones `glob` para los archivos que deben ser ignorados.

## 4. Zona de Melhorias Futuras

*   **Configuraciones Extendidas:** Para proyectos más complejos o monorepos, se podría crear un `tsconfig.base.json` con la configuración común y que otros `tsconfig.json` (ej. `tsconfig.app.json`, `tsconfig.lib.json`) extiendan de él.
*   **Reglas de Linting más Estrictas:** Integrar `eslint-plugin-typescript` para forzar reglas aún más estrictas que las del compilador base, como `no-unused-vars` o `explicit-function-return-type`.
*   **Generación de Archivos de Declaración:** Habilitar `declaration: true` y `declarationMap: true` si alguna parte de este proyecto se fuera a publicar como una librería reutilizable.
*   **Script de Verificación de Tipos:** Añadir un script `check-types` en `package.json` que ejecute `tsc --noEmit` para permitir una verificación de tipos explícita en el pipeline de CI sin acoplarla al comando `build`.
// .docs-espejo/tsconfig.json.md