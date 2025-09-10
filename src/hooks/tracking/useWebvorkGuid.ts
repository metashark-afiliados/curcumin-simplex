// src/hooks/tracking/useWebvorkGuid.ts
/**
 * @file useWebvorkGuid.ts
 * @description Hook Atómico de Efecto para obtener el GUID de Webvork.
 *              Ahora se activa condicionalmente.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import { useEffect, useCallback } from "react";
import { producerConfig } from "@/config/producer.config";
import { clientLogger } from "@/lib/logging";

/**
 * @function useWebvorkGuid
 * @description Gestiona la obtención del GUID de Webvork.
 * @param {boolean} enabled - Controla si el hook debe ejecutar su lógica.
 */
export function useWebvorkGuid(enabled: boolean): void {
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

    clientLogger.startGroup("Hook: Webvork GUID");
    const { LANDING_ID, OFFER_ID } = producerConfig;

    if (!LANDING_ID || !OFFER_ID) {
      clientLogger.warn(
        "LANDING_ID o OFFER_ID no configurados. Abortando llamada de GUID."
      );
      clientLogger.endGroup();
      return;
    }

    clientLogger.trace("Iniciando solicitud de GUID a Webvork...");

    const callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());
    const scriptTagId = `script_${callbackName}`;

    (window as any)[callbackName] = () => {
      clientLogger.startGroup("Callback: Webvork GUID Recibido");
      try {
        const guidFromHtml = document.documentElement.getAttribute("data-guid");
        if (guidFromHtml) {
          clientLogger.info(
            `GUID confirmado desde atributo data-guid: ${guidFromHtml}`
          );
          setCookie("wv_guid", guidFromHtml, 30);
        } else {
          clientLogger.warn(
            "Callback recibido, pero el atributo data-guid no fue encontrado."
          );
        }
      } catch (error) {
        clientLogger.error("Error procesando callback de GUID.", { error });
      } finally {
        delete (window as any)[callbackName];
        document.getElementById(scriptTagId)?.remove();
        clientLogger.endGroup();
      }
    };

    const trackerUrl = `//webvkrd.com/js.php?landing_id=${LANDING_ID}&offer_id=${OFFER_ID}&page_type=landing&callback=${callbackName}`;
    const scriptTag = document.createElement("script");
    scriptTag.id = scriptTagId;
    scriptTag.src = trackerUrl;
    document.body.appendChild(scriptTag);

    clientLogger.endGroup();
  }, [enabled, setCookie]);
}
// src/hooks/tracking/useWebvorkGuid.ts
