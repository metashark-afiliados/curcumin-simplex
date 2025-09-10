// src/hooks/tracking/useGoogleAnalytics.ts
/**
 * @file useGoogleAnalytics.ts
 * @description Hook Atómico de Efecto para el píxel de Google Analytics.
 *              Ahora se activa condicionalmente.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import { useEffect } from "react";
import { producerConfig } from "@/config/producer.config";
import { clientLogger } from "@/lib/logging";

const GA_REMOTE_SCRIPT_ID = "google-analytics-gtag";
const GA_INIT_SCRIPT_ID = "google-analytics-init";

/**
 * @function useGoogleAnalytics
 * @description Gestiona la inyección de los scripts de Google Analytics (gtag).
 * @param {boolean} enabled - Controla si el hook debe ejecutar su lógica.
 */
export function useGoogleAnalytics(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const gaId = producerConfig.TRACKING.GOOGLE_ANALYTICS_ID;
    if (!gaId) return;
    if (
      document.getElementById(GA_REMOTE_SCRIPT_ID) ||
      document.getElementById(GA_INIT_SCRIPT_ID)
    )
      return;

    clientLogger.trace(
      `[useGoogleAnalytics] Inyectando scripts de Google Analytics con ID: ${gaId}`
    );

    const remoteScript = document.createElement("script");
    remoteScript.id = GA_REMOTE_SCRIPT_ID;
    remoteScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    remoteScript.async = true;
    document.head.appendChild(remoteScript);

    const initScript = document.createElement("script");
    initScript.id = GA_INIT_SCRIPT_ID;
    initScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(initScript);

    clientLogger.info(
      "[useGoogleAnalytics] Pixel de Google Analytics inyectado y activado.",
      { id: gaId }
    );
  }, [enabled]);
}
// src/hooks/tracking/useGoogleAnalytics.ts
