// src/hooks/tracking/useUtmTracker.ts
/**
 * @file useUtmTracker.ts
 * @description Hook Atómico de Efecto. Captura parámetros UTM y los persiste en cookies.
 *              Ahora se activa condicionalmente.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import { useEffect, useCallback } from "react";
import { clientLogger } from "@/lib/logging";

const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
type UtmParam = (typeof UTM_PARAMS)[number];

/**
 * @function useUtmTracker
 * @description Lee los parámetros UTM de la URL y los guarda en cookies.
 * @param {boolean} enabled - Controla si el hook debe ejecutar su lógica.
 */
export function useUtmTracker(enabled: boolean): void {
  const getParamFromUrl = useCallback((name: string): string | null => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }, []);

  const setCookie = useCallback(
    (name: string, value: string, days: number = 30) => {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = `${name}=${value || ""}${expires}; path=/`;
    },
    []
  );

  useEffect(() => {
    if (!enabled) return;

    clientLogger.trace("[useUtmTracker] Verificando parámetros UTM na URL...");
    const collectedParams: Partial<Record<UtmParam, string>> = {};

    UTM_PARAMS.forEach((paramName) => {
      const value = getParamFromUrl(paramName);
      if (value) {
        collectedParams[paramName] = value;
        setCookie(`wv_${paramName}`, value);
      }
    });

    if (Object.keys(collectedParams).length > 0) {
      clientLogger.info(
        "[useUtmTracker] Parámetros UTM capturados y persistidos.",
        collectedParams
      );
    }
  }, [enabled, getParamFromUrl, setCookie]);
}
// src/hooks/tracking/useUtmTracker.ts
