// src/lib/logging.ts
/**
 * @file logging.ts
 * @description Aparato SSoT para el logging del lado del cliente.
 *              Refactorizado para incluir marcas de tiempo de alta precisión
 *              en cada log, mejorando drásticamente la observabilidad y la
 *              capacidad de depuración cronológica.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/lib/logging.ts.md
 */

const STYLES = {
  orchestrator: "color: #8b5cf6; font-weight: bold;",
  hook: "color: #3b82f6; font-weight: bold;",
  success: "color: #22c55e;",
  warning: "color: #f59e0b;",
  error: "color: #ef4444; font-weight: bold;",
  trace: "color: #a1a1aa;",
  timestamp: "color: #64748b;", // Gris pizarra para la marca de tiempo
};

interface ClientLogger {
  startGroup: (label: string, style?: string) => void;
  endGroup: () => void;
  info: (message: string, context?: object) => void;
  warn: (message: string, context?: object) => void;
  error: (message: string, context?: object) => void;
  trace: (message: string, context?: object) => void;
}

// <<-- MEJORA DE VALOR: Función para obtener una marca de tiempo precisa
const getTimestamp = (): string => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

// <<-- REFACTORIZACIÓN (DRY): Función interna para formatear mensajes
const formatMessage = (
  icon: string,
  message: string,
  style: string,
  context?: object
) => {
  const timestamp = getTimestamp();
  if (context) {
    console.log(
      `%c${timestamp} %c${icon} ${message}`,
      STYLES.timestamp,
      style,
      context
    );
  } else {
    console.log(`%c${timestamp} %c${icon} ${message}`, STYLES.timestamp, style);
  }
};

const developmentLogger: ClientLogger = {
  startGroup: (label, style = STYLES.hook) => {
    const timestamp = getTimestamp();
    console.groupCollapsed(
      `%c${timestamp} %c▶ ${label}`,
      STYLES.timestamp,
      style
    );
  },
  endGroup: () => console.groupEnd(),
  info: (message, context) =>
    formatMessage("✔", message, STYLES.success, context),
  warn: (message, context) =>
    formatMessage("⚠", message, STYLES.warning, context),
  error: (message, context) =>
    formatMessage("✖", message, STYLES.error, context),
  trace: (message, context) =>
    formatMessage("•", message, STYLES.trace, context),
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
