// src/config/deployment.config.ts
/**
 * @file deployment.config.ts
 * @description SSoT para la configuración del modo de despliegue.
 *              CORRECCIÓN CRÍTICA: Se eliminó la dependencia de `clientLogger`
 *              para resolver el error de resolución de alias de módulo durante la carga
 *              de `next.config.ts`. Se utiliza `console.info` nativo para la observabilidad del build.
 * @version 1.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

// Define los posibles valores para el objetivo de despliegue.
const DeployTargetSchema = z.enum(["vercel", "hostinger"]).default("vercel");

// Lee y valida la variable de entorno.
const deployTarget = DeployTargetSchema.parse(
  process.env.NEXT_PUBLIC_DEPLOY_TARGET
);

/**
 * @constant isStaticExport
 * @description Booleano que indica si el proyecto debe ser compilado como un sitio estático.
 *              Verdadero si el objetivo es 'hostinger'.
 */
export const isStaticExport = deployTarget === "hostinger";

/**
 * @constant isMiddlewareEnabled
 * @description Booleano que indica si el middleware debe estar activo.
 *              Falso si el objetivo es 'hostinger' (estático).
 */
export const isMiddlewareEnabled = deployTarget === "vercel";

// Observabilidad en el momento del build utilizando console.info nativo.
// Este log aparecerá en la terminal cuando se ejecute `pnpm run dev` o `pnpm run build`.
console.info(
  `[DeploymentConfig] Modo de despliegue configurado para: '${deployTarget}'.`,
  {
    isStaticExport,
    isMiddlewareEnabled,
  }
);
// src/config/deployment.config.ts
