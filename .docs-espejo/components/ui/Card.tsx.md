// src/components/dev/ComponentLoader.ts
/**
 * @file src/components/dev/ComponentLoader.ts
 * @description Módulo de servicio para la carga dinámica de componentes y sus props de mock
 *              para el Dev Canvas.
 *              ACTUALIZACIÓN CRÍTICA: La lógica de carga de datos de campaña ha sido
 *              completamente refactorizada para alinearse con la arquitectura MACS.
 *              Ahora es consciente de las variantes y pasa un ID de variante por
 *              defecto al motor `getCampaignData`, resolviendo el error TS2554.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { getComponentByName, type ComponentRegistryEntry } from "./ComponentRegistry";
import { clientLogger } from "@/lib/logging";
import { getDictionary } from "@/lib/i18n";
import { getCampaignData } from "@/lib/i18n/campaign.i18n";
import { getFallbackProps } from "./utils/component-props";

// Mapeo estático para carga en desarrollo
import * as HeaderModule from "@/components/layout/Header";
import * as FooterModule from "@/components/layout/Footer";
import * as ScrollingBannerModule from "@/components/layout/ScrollingBanner";
import * as HeroModule from "@/components/sections/Hero";
import * as BenefitsSectionModule from "@/components/sections/BenefitsSection";
import * as DockModule from "@/components/razBits/Dock/Dock";
import * as LightRaysModule from "@/components/razBits/LightRays/LightRays";

const COMPONENT_MODULE_MAP: Record<string, any> = {
  Header: HeaderModule,
  Footer: FooterModule,
  ScrollingBanner: ScrollingBannerModule,
  Hero: HeroModule,
  BenefitsSection: BenefitsSectionModule,
  Dock: DockModule,
  LightRays: LightRaysModule,
};

interface ComponentLoadResult {
  ComponentToRender: React.ComponentType<any> | null;
  componentProps: Record<string, any>;
  appliedTheme: any;
  componentName: string;
  entry: ComponentRegistryEntry;
}

export async function loadComponentAndProps(
  componentName: string,
  locale: string
): Promise<ComponentLoadResult> {
  const entry = getComponentByName(componentName);
  if (!entry) {
    throw new Error(`Componente "${componentName}" no encontrado en el registro.`);
  }

  const componentModule = COMPONENT_MODULE_MAP[componentName];
  if (!componentModule) {
    throw new Error(`Módulo para componente "${componentName}" no encontrado.`);
  }

  const ComponentToRender = componentModule.default || componentModule[componentName];
  if (!ComponentToRender) {
    throw new Error(`Componente exportado no encontrado en el módulo para: ${componentName}`);
  }

  let componentProps: Record<string, any> = {};
  let appliedTheme: any = null;

  try {
    if (entry.isCampaignComponent) {
      // --- LÓGICA REFACTORIZADA PARA COMPONENTES DE CAMPAÑA ---
      clientLogger.info(`[ComponentLoader] Cargando datos de CAMPAÑA para: ${componentName}`);
      const campaignId = "12157"; // Hardcodeado para nuestro caso de uso actual
      const variantIdForDev = "02"; // Usamos 'Vitality' como default para el canvas

      const campaignData = await getCampaignData(campaignId, locale, variantIdForDev);
      appliedTheme = campaignData.theme;
      
      const key = entry.dictionaryKey as keyof typeof campaignData.dictionary;
      const propsFromCampaignDict = campaignData.dictionary[key];

      if (propsFromCampaignDict) {
        componentProps = propsFromCampaignDict;
      } else {
        clientLogger.warn(`[ComponentLoader] Clave '${key}' no encontrada en diccionario de campaña. Usando fallback.`);
        componentProps = getFallbackProps(componentName);
      }
    } else {
      // --- LÓGICA ORIGINAL PARA COMPONENTES GLOBALES ---
      clientLogger.info(`[ComponentLoader] Cargando datos GLOBALES para: ${componentName}`);
      const fullDictionary = await getDictionary(locale);
      const key = entry.dictionaryKey as keyof typeof fullDictionary;
      const propsFromGlobalDict = fullDictionary[key];

      if (propsFromGlobalDict) {
        componentProps = propsFromGlobalDict;
      } else {
        clientLogger.warn(`[ComponentLoader] Clave '${key}' no encontrada en diccionario global. Usando fallback.`);
        componentProps = getFallbackProps(componentName);
      }
    }
  } catch (error) {
    clientLogger.error(`[ComponentLoader] Fallo al cargar datos para ${componentName}. Usando fallback.`, { error });
    componentProps = getFallbackProps(componentName);
  }

  return { ComponentToRender, componentProps, appliedTheme, componentName, entry };
}
// src/components/dev/ComponentLoader.ts