// src/components/layout/AntiCopyHandler.tsx
"use client";

import React, { useEffect } from "react";

/**
 * Este componente cliente aplica listeners de eventos al `document.body`
 * para deshabilitar el menú de contexto (clic derecho). Es la forma
 * correcta de manejar efectos secundarios del navegador en Next.js App Router
 * sin interferir con la renderización del servidor.
 */
export function AntiCopyHandler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.body.addEventListener("contextmenu", disableContextMenu);

    // Función de limpieza para remover el listener cuando el componente se desmonte
    return () => {
      document.body.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []); // El array vacío asegura que este efecto solo se ejecute una vez

  return <>{children}</>;
}
