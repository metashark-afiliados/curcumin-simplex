// .docs-espejo/lib/logging.ts.md
/**
 * @file .docs-espejo/lib/logging.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato de logging.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: `logging.ts` (Suite de Observabilidad)

## 1. Rol Estratégico

El aparato `logging.ts` es el **"Sistema Nervioso Central de Observabilidad"** para el lado del cliente. Su responsabilidad estratégica es proporcionar una API unificada, semántica y segura para registrar eventos durante el desarrollo, sin impactar el rendimiento en producción.

Actúa como una fachada que:
1.  **Abstrae la Implementación:** Oculta la complejidad de `console.log` estilizado.
2.  **Garantiza la Semántica:** Ofrece métodos con nombres claros (`info`, `warn`, `error`, `success`) que describen la intención.
3.  **Proporciona Herramientas de Diagnóstico:** Incluye funcionalidades avanzadas como medición de rendimiento (`time`/`timeEnd`) y trazabilidad de flujos (`startTrace`).
4.  **Controla el Entorno:** Se desactiva casi por completo en producción para evitar la exposición de información y la sobrecarga de la consola del usuario.

## 2. Arquitectura y Flujo de Ejecución

1.  **Exportación Condicional:** Exporta una de dos implementaciones de `ClientLogger` basándose en `process.env.NODE_ENV`.
    *   **`developmentLogger`:** Implementación completa con colores, grupos, timers y trazabilidad.
    *   **`productionLogger`:** Implementación "nula" donde solo `error` tiene efecto, para capturar problemas críticos.
2.  **Gestión de Estado Interna:** Utiliza un `Map` (`timers`) para gestionar el estado de los temporizadores de rendimiento de forma aislada y eficiente.

## 3. Contrato de API

La interfaz `ClientLogger` define el contrato:

*   `startGroup(label, style?)`: Inicia un grupo de logs colapsado.
*   `endGroup()`: Cierra el grupo actual.
*   `success(message, context?)`: Registra un evento de éxito.
*   `info(message, context?)`: Registra un evento informativo.
*   `warn(message, context?)`: Registra una advertencia.
*   `error(message, context?)`: Registra un error.
*   `trace(message, context?)`: Registra un mensaje de bajo nivel.
*   `time(label)`: Inicia un temporizador de rendimiento.
*   `timeEnd(label)`: Detiene un temporizador y muestra la duración.
*   `startTrace(traceName)`: Inicia un flujo de ejecución y devuelve un ID de traza.
*   `traceEvent(traceId, eventName, context?)`: Registra un paso dentro de una traza.
*   `endTrace(traceId)`: Marca el final de una traza.

## 4. Zona de Melhorias Futuras

*   **Integración Selectiva en Producción:** El `productionLogger` podría mejorarse para que el método `error` envíe los errores a un servicio de monitoreo externo ligero y compatible con Vercel.
*   **Niveles de Log Configurables:** Permitir configurar el nivel de log a través de una variable de entorno o un parámetro en la URL para depurar en producción de forma controlada.
*   **Identificador de Sesión:** Integrar un identificador único de sesión en cada log para poder rastrear la secuencia completa de eventos de un usuario.
*   **Creación de Hook `useComponentLogger`:** Atomizar la lógica de añadir el nombre del componente a cada log en un hook reutilizable.
// .docs-espejo/lib/logging.ts.md