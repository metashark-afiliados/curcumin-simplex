// .docs-espejo/hooks/useProducerLogic.ts.md
/**
 * @file useProducerLogic.ts.md
 * @description Documento espejo para el hook soberano `useProducerLogic`.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: `useProducerLogic`

## 1. Rol Estratégico

El `useProducerLogic` es el **Orquestador Soberano de Tracking del Lado del Cliente**. Su única y crítica responsabilidad es decidir el momento óptimo para activar toda la lógica de seguimiento de terceros (píxeles, UTMs, etc.), actuando como un guardián del rendimiento de la carga inicial.

Su propósito estratégico es desacoplar la lógica de negocio (el tracking) de la experiencia de usuario inicial, implementando una estrategia de **carga diferida** para proteger las métricas de Core Web Vitals.

## 2. Arquitectura y Flujo de Ejecución

Este aparato es un hook de React que no renderiza UI. Su flujo de ejecución es el siguiente:

1.  **Entrada:** No recibe props. Internamente, consume el estado del `useCookieConsent` y la configuración global de `producerConfig`.
2.  **Estado Interno:** Mantiene un estado booleano `hasInteracted` para rastrear si el usuario ya ha interactuado con la página.
3.  **Lógica de Interacción:** En su primer renderizado (`useEffect`), adjunta listeners de eventos pasivos y de un solo uso (`once: true`) a la ventana para detectar la primera interacción del usuario (`scroll`, `mousedown`, `keydown`, `touchstart`).
4.  **Decisión de Activación:** Continuamente evalúa tres condiciones:
    *   ¿Está el tracking habilitado globalmente? (`producerConfig.TRACKING_ENABLED`)
    *   ¿Ha dado el usuario su consentimiento? (`consentStatus === 'accepted'`)
    *   ¿Ha interactuado el usuario con la página? (`hasInteracted === true`)
5.  **Ejecución (Disparo):** Solo cuando las tres condiciones son verdaderas, pasa un booleano `true` a la cascada de hooks de tracking atómicos (`useUtmTracker`, `useGoogleAnalytics`, etc.), activándolos para que ejecuten su lógica de inyección de scripts.

## 3. Contrato de API

*   **Entradas (Inputs):** Ninguna.
*   **Salidas (Outputs):** Ninguna (`void`). Su trabajo se realiza a través de efectos secundarios controlados (la activación de otros hooks).

## 4. Zona de Melhorias Futuras

1.  **Carga Dinámica de Hooks:** Investigar la posibilidad de importar dinámicamente los módulos de los hooks de tracking solo cuando `shouldInitialize` sea `true`, para reducir aún más el tamaño del bundle inicial.
2.  **Integración con Tag Manager:** Añadir un hook atómico para un sistema como Google Tag Manager, permitiendo que la lógica de qué píxeles cargar sea gestionada desde una UI externa, haciendo al orquestador aún más agnóstico.
3.  **Configuración de Eventos de Interacción:** Permitir que los eventos que se consideran una "interacción" (`mousedown`, `scroll`, etc.) sean configurables a través de `producerConfig`.
4.  **Soporte para A/B Testing:** Integrar una bandera que pueda provenir de un servicio de A/B testing para activar selectivamente ciertos hooks de tracking solo para un segmento de usuarios.

// .docs-espejo/hooks/useProducerLogic.ts.md