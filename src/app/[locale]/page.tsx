// src/app/[locale]/page.tsx
/**
 * @file page.tsx
 * @description Página de inicio del portal de contenidos "Global Fitwell".
 *              Corregido para pasar correctamente el locale al diccionario.
 * @version 3.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { HeroNews } from "@/components/sections/HeroNews"; // <<-- 1. Importado HeroNews

/**
 * @interface HomePageProps
 * @description Define las props para la página de inicio, incluyendo los parámetros de ruta.
 */
interface HomePageProps {
  params: {
    locale: string;
  };
}

/**
 * @component HomePage
 * @description El componente principal para la ruta '/[locale]'. Ensambla las
 *              secciones que componen la página de inicio del portal.
 * @param {HomePageProps} props - Las propiedades que contienen el locale.
 * @returns {Promise<React.ReactElement>} El elemento JSX de la página.
 */
export default async function HomePage({
  params,
}: HomePageProps): Promise<React.ReactElement> {
  console.log(
    `[Observabilidad] Renderizando Homepage del Portal para el locale: ${params.locale}`
  );

  // <<-- 2. CORRECCIÓN: Se pasa params.locale a getDictionary
  const t = await getDictionary(params.locale);

  return (
    <>
      {/* 
        Renderizado condicional basado en la disponibilidad de datos en el diccionario.
        Esto permite controlar el layout de la página desde los archivos i18n.
      */}
      {t.heroNews && <HeroNews {...t.heroNews} />}
      {t.newsGrid && <NewsGrid {...t.newsGrid} />}
    </>
  );
}
// src/app/[locale]/page.tsx
