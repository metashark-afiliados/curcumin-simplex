// src/hooks/useProducerLogic.ts
/\*\*

- @file useProducerLogic.ts
- @description Hook Soberano que replica a lógica de atribuição e tracking
-              do script `webvork.js` de forma desacoplada e compatível com React.
-              Esta é a versão de produção completa, que gerencia todo o ecossistema
-              de tracking definido na configuração.
- @version 2.0.0
- @author RaZ podesta - MetaShark Tech
  \*/
  "use client";

import { useEffect, useState, useCallback } from 'react';
import { clientLogger } from '@/lib/logging';
import { producerConfig } from '@/config/producer.config'; // <<-- Importamos nossa SSoT de configuração

interface TrackingParams {
utm_source?: string;
utm_medium?: string;
utm_campaign?: string;
utm_content?: string;
utm_term?: string;
[key: string]: string | undefined;
}

interface ProducerLogicState {
isInitialized: boolean;
trackingParams: TrackingParams;
guid: string | null;
}

/\*\*

- @function useProducerLogic
- @description Gerencia o ciclo de vida completo da lógica de tracking do produtor.
- @returns {ProducerLogicState} O estado atual da lógica (inicializado, parâmetros, guid).
  \*/
  export function useProducerLogic() {
  const [state, setState] = useState<ProducerLogicState>({
  isInitialized: false,
  trackingParams: {},
  guid: null,
  });

// --- Utilitários Puros (sem alterações) ---
const getParamFromUrl = useCallback((name: string): string | null => {
if (typeof window === 'undefined') return null;
const params = new URLSearchParams(window.location.search);
return params.get(name);
}, []);

const getCookie = useCallback((name: string): string | null => { /_ ... _/ });
const setCookie = useCallback((name: string, value: string, days: number = 1) => { /_ ... _/ });

// --- Efeitos Colaterais (Lógica de Injeção) ---
const injectScript = useCallback((id: string, content: string) => {
if (document.getElementById(id)) return; // Evita injeção duplicada
const script = document.createElement('script');
script.id = id;
script.innerHTML = content;
document.head.appendChild(script);
}, []);

const injectRemoteScript = useCallback((id: string, src: string) => {
if (document.getElementById(id)) return;
const script = document.createElement('script');
script.id = id;
script.src = src;
script.async = true;
document.head.appendChild(script);
}, []);

// --- Efeito Principal de Inicialização ---
useEffect(() => {
clientLogger.info('[useProducerLogic] Inicializando lógica de tracking do produtor v2.0.');

    // 1. Coleta e Persistência de Parâmetros (sem alterações)
    const paramsToTrack: (keyof TrackingParams)[] = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const collectedParams: TrackingParams = {};
    paramsToTrack.forEach(key => {
      const paramKey = String(key);
      const value = getParamFromUrl(paramKey) || getCookie(`c_${paramKey}`);
      if (value) {
        collectedParams[paramKey] = value;
        setCookie(`c_${paramKey}`, value, 1);
      }
    });

    // 2. Injeção Completa de Pixels de Tracking (Lógica expandida)
    if (producerConfig.TRACKING.YANDEX_METRIKA_ID) {
      const ymScript = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.com/metrika/tag.js", "ym"); ym(${producerConfig.TRACKING.YANDEX_METRIKA_ID}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });`;
      injectScript('yandex-metrika-init', ymScript);
      clientLogger.trace('[useProducerLogic] Pixel do Yandex Metrika injetado.');
    }

    if (producerConfig.TRACKING.GOOGLE_ANALYTICS_ID) {
      injectRemoteScript(
        'google-analytics-gtag',
        `https://www.googletagmanager.com/gtag/js?id=${producerConfig.TRACKING.GOOGLE_ANALYTICS_ID}`
      );
      const gaScript = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${producerConfig.TRACKING.GOOGLE_ANALYTICS_ID}');`;
      injectScript('google-analytics-init', gaScript);
      clientLogger.trace('[useProducerLogic] Pixel do Google Analytics injetado.');
    }

    // Futuros pixels (Facebook, TikTok, etc.) seriam adicionados aqui seguindo o mesmo padrão.

    // 3. Chamada ao Tracker da Webvork para obter o GUID (sem alterações, mas agora mais robusto)
    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    (window as any)[callbackName] = (data: any) => {
      try {
        const guidFromHtml = document.documentElement.getAttribute('data-guid');
        if (guidFromHtml) {
          clientLogger.info(`[useProducerLogic] GUID recebido da Webvork: ${guidFromHtml}`);
          setCookie('c_guid', guidFromHtml, 1);
          setState(prevState => ({ ...prevState, guid: guidFromHtml, isInitialized: true }));
        } else {
          clientLogger.warn('[useProducerLogic] Callback da Webvork recebido, mas o data-guid não foi encontrado no HTML.');
        }
      } catch (error) {
        clientLogger.error('[useProducerLogic] Erro no callback do GUID.', { error });
      } finally {
        delete (window as any)[callbackName];
        const scriptTag = document.getElementById(callbackName);
        scriptTag?.remove();
      }
    };

    const trackerUrl = `//webvkrd.com/js.php?landing_id=${producerConfig.LANDING_ID}&offer_id=${producerConfig.OFFER_ID}&page_type=landing&callback=${callbackName}`;
    const scriptTag = document.createElement('script');
    scriptTag.id = callbackName; // Damos um ID ao script para poder removê-lo depois
    scriptTag.src = trackerUrl;
    document.body.appendChild(scriptTag);

    setState(prevState => ({ ...prevState, trackingParams: collectedParams }));

}, [getParamFromUrl, getCookie, setCookie, injectScript, injectRemoteScript]);

return state;
}

// src/hooks/useProducerLogic.ts
