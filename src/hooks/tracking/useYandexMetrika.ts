// src/hooks/tracking/useYandexMetrika.ts
/**
 * @file useYandexMetrika.ts
 * @description Hook Atómico de Efecto para el píxel de Yandex Metrika.
 *              Ahora se activa condicionalmente.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import { useEffect } from "react";
import { producerConfig } from "@/config/producer.config";
import { clientLogger } from "@/lib/logging";

const YANDEX_SCRIPT_ID = "yandex-metrika-init";

/**
 * @function useYandexMetrika
 * @description Gestiona la inyección del script de Yandex Metrika.
 * @param {boolean} enabled - Controla si el hook debe ejecutar su lógica.
 */
export function useYandexMetrika(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const yandexId = producerConfig.TRACKING.YANDEX_METRIKA_ID;
    if (!yandexId) return;
    if (document.getElementById(YANDEX_SCRIPT_ID)) return;

    clientLogger.trace(
      `[useYandexMetrika] Inyectando script de Yandex Metrika con ID: ${yandexId}`
    );

    const ymScriptContent = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.com/metrika/tag.js", "ym");
      ym(${yandexId}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
    `;

    const script = document.createElement("script");
    script.id = YANDEX_SCRIPT_ID;
    script.innerHTML = ymScriptContent;
    document.head.appendChild(script);

    clientLogger.info(
      "[useYandexMetrika] Pixel de Yandex Metrika inyectado y activado.",
      { id: yandexId }
    );
  }, [enabled]);
}
// src/hooks/tracking/useYandexMetrika.ts
