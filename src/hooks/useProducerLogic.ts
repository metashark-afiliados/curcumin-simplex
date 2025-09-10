// src/hooks/useProducerLogic.ts
/**
 * @file useProducerLogic.ts
 * @description Hook Soberano Orquestador. Refactorizado para implementar la carga
 *              diferida de scripts de tracking, activándolos solo tras la primera
 *              interacción del usuario para optimizar el rendimiento inicial.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import { useState, useEffect } from "react";
import { clientLogger } from "@/lib/logging";
import { producerConfig } from "@/config/producer.config";
import { useCookieConsent } from "./useCookieConsent";
import { useUtmTracker } from "./tracking/useUtmTracker";
import { useYandexMetrika } from "./tracking/useYandexMetrika";
import { useGoogleAnalytics } from "./tracking/useGoogleAnalytics";
import { useTrufflePixel } from "./tracking/useTrufflePixel";
import { useWebvorkGuid } from "./tracking/useWebvorkGuid";

const ORCHESTRATOR_STYLE =
  "color: #8b5cf6; font-weight: bold; border: 1px solid #8b5cf6; padding: 2px 4px; border-radius: 4px;";

/**
 * @function useProducerLogic
 * @description Orquesta la lógica de tracking del productor.
 *              1. Verifica si el tracking está habilitado globalmente.
 *              2. Verifica si el usuario ha dado su consentimiento.
 *              3. Espera la primera interacción del usuario (scroll, click, etc.).
 *              4. Solo entonces, activa todos los hooks de tracking.
 */
export function useProducerLogic(): void {
  const { status: consentStatus } = useCookieConsent();
  const [hasInteracted, setHasInteracted] = useState(false);

  // Efecto para detectar la primera interacción del usuario.
  useEffect(() => {
    // Si ya ha interactuado, no es necesario volver a añadir los listeners.
    if (hasInteracted) return;

    const handleInteraction = () => {
      clientLogger.info(
        "[useProducerLogic] Interacción de usuario detectada. Activando tracking."
      );
      setHasInteracted(true);
      // Una vez activado, removemos los listeners para no seguir escuchando.
      removeListeners();
    };

    const eventListeners: (keyof WindowEventMap)[] = [
      "mousedown",
      "touchstart",
      "keydown",
      "scroll",
    ];

    const addListeners = () => {
      eventListeners.forEach((event) =>
        window.addEventListener(event, handleInteraction, {
          once: true,
          passive: true,
        })
      );
    };

    const removeListeners = () => {
      eventListeners.forEach((event) =>
        window.removeEventListener(event, handleInteraction)
      );
    };

    addListeners();

    // Limpieza en caso de que el componente se desmonte antes de la interacción.
    return () => removeListeners();
  }, [hasInteracted]);

  const canInitializeTracking =
    producerConfig.TRACKING_ENABLED && consentStatus === "accepted";
  const shouldInitialize = canInitializeTracking && hasInteracted;

  // Si el tracking está deshabilitado por configuración o consentimiento, se logea y se detiene.
  useEffect(() => {
    if (!producerConfig.TRACKING_ENABLED) return;

    if (consentStatus === "rejected") {
      clientLogger.info(
        "[useProducerLogic] Tracking deshabilitado por preferencia del usuario."
      );
    } else if (consentStatus === "accepted" && !hasInteracted) {
      console.log(
        "%c[useProducerLogic] Tracking en espera de interacción del usuario...",
        ORCHESTRATOR_STYLE
      );
    }
  }, [consentStatus, hasInteracted]);

  // Los hooks de tracking ahora se activan solo cuando shouldInitialize es true.
  useUtmTracker(shouldInitialize);
  useYandexMetrika(shouldInitialize);
  useGoogleAnalytics(shouldInitialize);
  useTrufflePixel(shouldInitialize);
  useWebvorkGuid(shouldInitialize);
}
// src/hooks/useProducerLogic.ts
