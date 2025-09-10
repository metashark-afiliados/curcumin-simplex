// src/hooks/tracking/useTrufflePixel.ts
/**
 * @file useTrufflePixel.ts
 * @description Hook Atómico de Efecto para el píxel de Truffle.bid.
 *              Ahora se activa condicionalmente.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import { useEffect } from "react";
import { producerConfig } from "@/config/producer.config";
import { clientLogger } from "@/lib/logging";

const TRUFFLE_SCRIPT_ID = "truffle-pixel-init";

/**
 * @function useTrufflePixel
 * @description Gestiona la inyección del script de Truffle.bid.
 * @param {boolean} enabled - Controla si el hook debe ejecutar su lógica.
 */
export function useTrufflePixel(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const truffleId = producerConfig.TRACKING.TRUFFLE_PIXEL_ID;
    if (!truffleId) return;
    if (document.getElementById(TRUFFLE_SCRIPT_ID)) return;

    clientLogger.trace(
      `[useTrufflePixel] Inyectando script de Truffle.bid con ID: ${truffleId}`
    );

    const truffleScriptContent = `
      !function (p,i,x,e,l,j,s) {p[l] = p[l] || function (pixelId) {p[l].pixelId = pixelId};j = i.createElement(x), s = i.getElementsByTagName(x)[0], j.async = 1, j.src = e, s.parentNode.insertBefore(j, s)}(window, document, "script", "https://cdn.truffle.bid/p/inline-pixel.js", "ttf");
      ttf("${truffleId}");
    `;

    const script = document.createElement("script");
    script.id = TRUFFLE_SCRIPT_ID;
    script.innerHTML = truffleScriptContent;
    document.head.appendChild(script);

    clientLogger.info(
      "[useTrufflePixel] Pixel de Truffle.bid inyectado y activado.",
      { id: truffleId }
    );
  }, [enabled]);
}
// src/hooks/tracking/useTrufflePixel.ts
