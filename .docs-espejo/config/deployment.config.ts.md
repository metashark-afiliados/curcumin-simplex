// .docs-espejo/config/deployment.config.ts.md
/**
 * @file deployment.config.ts.md
 * @description Documento Espejo para la SSoT de Configuración de Despliegue.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Interruptor Maestro de Despliegue

## 1. Rol Estratégico

El aparato `src/config/deployment.config.ts` actúa como el **interruptor maestro de la arquitectura de despliegue**. Su única responsabilidad es interpretar una variable de entorno (`NEXT_PUBLIC_DEPLOY_TARGET`) y traducir esa intención de alto nivel en banderas de configuración concretas (`isStaticExport`, `isMiddlewareEnabled`) que el resto del sistema puede consumir.

Este mecanismo desacopla la lógica de compilación de la configuración del entorno, permitiendo que el proyecto se adapte a diferentes plataformas de hosting (estáticas vs. dinámicas) sin modificar el código fuente.

## 2. Arquitectura y Flujo de Ejecución

1.  **Entrada:** Lee la variable de entorno `NEXT_PUBLIC_DEPLOY_TARGET`. Si no se proporciona, asume un valor por defecto seguro (`vercel`).
2.  **Validación:** Utiliza Zod para asegurar que el valor sea uno de los permitidos (`vercel` o `hostinger`), previniendo errores de configuración.
3.  **Proceso:** Basado en el valor validado, establece dos constantes booleanas inmutables:
    *   `isStaticExport`: `true` solo si el objetivo es `hostinger`.
    *   `isMiddlewareEnabled`: `true` solo si el objetivo es `vercel`.
4.  **Salida:** Exporta estas constantes para ser importadas por otros aparatos de configuración (`next.config.ts`, `middleware.ts`).
5.  **Observabilidad:** Emite un log al inicio del proceso de build para informar al desarrollador sobre el modo en que se está ejecutando el proyecto.

## 3. Contrato de API

*   `isStaticExport: boolean`: Indica si se debe activar `output: 'export'` en `next.config.ts`.
*   `isMiddlewareEnabled: boolean`: Indica si `middleware.ts` debe procesar rutas.

## 4. Zona de Melhorias Futuras

1.  **Validación en Tiempo de Build:** Implementar un script que se ejecute en `postinstall` o `prebuild` para verificar la coherencia del `.env` y fallar rápidamente si la configuración es inválida.
2.  **Múltiples Archivos de Entorno:** Soportar archivos como `.env.vercel` y `.env.hostinger` para que los scripts de `package.json` (`build:vercel`, `build:hostinger`) puedan cargarlos automáticamente.
3.  **Integración con CI/CD:** El pipeline de CI/CD podría establecer `NEXT_PUBLIC_DEPLOY_TARGET` dinámicamente según la rama o el workflow que se esté ejecutando.
// .docs-espejo/config/deployment.config.ts.md