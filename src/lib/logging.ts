// src/lib/logging.ts
/**
 * @file logging.ts
 * @description Aparato SSoT para el logging del lado del cliente.
 * @description_es Proporciona un logger estructurado y con estilo que utiliza
 *               grupos de logs para una máxima legibilidad en desarrollo.
 *               Es completamente silencioso en producción.
 * @version 2.1.0
 * @author RaZ podesta - MetaShark Tech
 */

const STYLES = {
  orchestrator: "color: #8b5cf6; font-weight: bold;", // Púrpura
  hook: "color: #3b82f6; font-weight: bold;", // Azul
  success: "color: #22c55e;", // Verde
  warning: "color: #f59e0b;", // Ámbar/Naranja
  error: "color: #ef4444; font-weight: bold;", // Rojo
  trace: "color: #a1a1aa;", // Gris
};

interface ClientLogger {
  startGroup: (label: string, style?: string) => void;
  endGroup: () => void;
  info: (message: string, context?: object) => void;
  warn: (message: string, context?: object) => void;
  error: (message: string, context?: object) => void;
  trace: (message: string, context?: object) => void;
}

const developmentLogger: ClientLogger = {
  startGroup: (label, style = STYLES.hook) =>
    console.groupCollapsed(`%c▶ ${label}`, style),
  endGroup: () => console.groupEnd(),
  info: (message, context) =>
    console.log(`%c✔ ${message}`, STYLES.success, context || ""),
  warn: (message, context) =>
    console.warn(`%c⚠ ${message}`, STYLES.warning, context || ""),
  error: (message, context) =>
    console.error(`%c✖ ${message}`, STYLES.error, context || ""),
  trace: (message, context) =>
    console.log(`%c${message}`, STYLES.trace, context || ""),
};

const productionLogger: ClientLogger = {
  startGroup: () => {},
  endGroup: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
  trace: () => {},
};

export const clientLogger =
  process.env.NODE_ENV === "development" ? developmentLogger : productionLogger;
// src/lib/logging.ts
