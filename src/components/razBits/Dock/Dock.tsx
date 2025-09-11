// src/components/razBits/Dock/Dock.tsx
/**
 * @file Dock.tsx
 * @description Componente de UI interactivo tipo "dock" con efectos de magnificación y etiquetas flotantes.
 *              Naturalizado para integrarse con el sistema de diseño y observabilidad de Curcumin Simplex.
 * @version 1.0.1
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/razBits/Dock.md
 */
"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion";
import React, {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { clientLogger } from "@/lib/logging";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { DockConfigSchema } from "./dock.schema";

/**
 * @interface DockItemData
 * @description Define la estructura de datos para cada ítem individual dentro del Dock.
 */
export type DockItemData = {
  /**
   * @param icon El elemento React (ej. un icono SVG) que se mostrará dentro del ítem.
   */
  icon: React.ReactNode;
  /**
   * @param label El texto o elemento React que se mostrará como etiqueta flotante al pasar el ratón.
   */
  label: React.ReactNode;
  /**
   * @param onClick La función de callback que se ejecuta al hacer clic en el ítem del Dock.
   */
  onClick: () => void;
  /**
   * @param className Clases CSS adicionales para aplicar al DockItem.
   */
  className?: string;
};

/**
 * @interface DockProps
 * @description Define las propiedades configurables para el componente Dock principal.
 */
export type DockProps = {
  /**
   * @param items Un array de objetos DockItemData que representan los elementos del Dock.
   */
  items: DockItemData[];
  /**
   * @param className Clases CSS adicionales para aplicar al contenedor principal del Dock.
   */
  className?: string;
  /**
   * @param config Objeto de configuración validado por Zod para personalizar el comportamiento y los estilos.
   */
  config?: z.infer<typeof DockConfigSchema>;
  /**
   * @param spring Opciones de configuración para la animación de resorte (magnificación).
   *                Se le asigna un valor por defecto.
   */
  spring?: SpringOptions;
};

/**
 * @interface DockItemInternalProps
 * @description Propiedades internas para el componente DockItem, utilizadas por el Dock principal.
 */
type DockItemInternalProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
};

/**
 * @component DockItem
 * @description Renderiza un solo ítem del Dock, aplicando la lógica de magnificación basada en el ratón.
 * @param {DockItemInternalProps} props - Propiedades del ítem del Dock.
 * @returns {React.ReactElement} Elemento JSX del ítem.
 */
function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemInternalProps): React.ReactElement {
  clientLogger.trace("[DockItem] Renderizando un ítem del Dock");
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={twMerge(
        `relative inline-flex items-center justify-center rounded-full bg-secondary border border-muted shadow-md ${className}`
      )}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(
        children,
        (child) =>
          cloneElement(
            child as React.ReactElement<DockIconProps | DockLabelProps>,
            { isHovered }
          ) // <<-- CORRECCIÓN AQUÍ
      )}
    </motion.div>
  );
}

/**
 * @interface CommonDockChildProps
 * @description Propiedades comunes que los hijos de DockItem pueden esperar.
 */
interface CommonDockChildProps {
  isHovered?: MotionValue<number>;
}

/**
 * @interface DockLabelProps
 * @description Propiedades para la etiqueta flotante de un ítem del Dock.
 */
interface DockLabelProps extends CommonDockChildProps {
  // <<-- EXTENSIÓN AQUÍ
  className?: string;
  children: React.ReactNode;
}

/**
 * @component DockLabel
 * @description Renderiza la etiqueta de texto flotante de un ítem del Dock al pasar el ratón.
 * @param {DockLabelProps} props - Propiedades de la etiqueta.
 * @returns {React.ReactElement} Elemento JSX de la etiqueta.
 */
function DockLabel({
  children,
  className = "",
  ...rest
}: DockLabelProps): React.ReactElement {
  clientLogger.trace("[DockLabel] Renderizando etiqueta flotante");
  const { isHovered } = rest; // isHovered is now guaranteed to be there if passed
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return; // Safeguard if isHovered is not passed (though it should be)
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={twMerge(
            `${className} absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-muted bg-background px-2 py-0.5 text-xs text-foreground`
          )}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * @interface DockIconProps
 * @description Propiedades para el icono de un ítem del Dock.
 */
interface DockIconProps extends CommonDockChildProps {
  // <<-- EXTENSIÓN AQUÍ
  className?: string;
  children: React.ReactNode;
}

/**
 * @component DockIcon
 * @description Renderiza el contenedor para el icono de un ítem del Dock.
 * @param {DockIconProps} props - Propiedades del icono.
 * @returns {React.ReactElement} Elemento JSX del contenedor del icono.
 */
function DockIcon({
  children,
  className = "",
}: DockIconProps): React.ReactElement {
  clientLogger.trace("[DockIcon] Renderizando contenedor de icono");
  return (
    <div className={twMerge(`flex items-center justify-center ${className}`)}>
      {children}
    </div>
  );
}

/**
 * @component Dock
 * @description Componente principal que orquesta un Dock de aplicaciones interactivo.
 *              Presenta un conjunto de ítems con magnificación al pasar el ratón y etiquetas.
 * @param {DockProps} props - Propiedades configurables del Dock.
 * @returns {React.ReactElement} Elemento JSX del Dock.
 */
export default function Dock({
  items,
  className = "",
  config,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
}: DockProps): React.ReactElement {
  clientLogger.info("[Dock] Renderizando componente Dock (Naturalizado)");

  const validatedConfig = DockConfigSchema.parse(config || {});
  const { magnification, distance, panelHeight, dockHeight, baseItemSize } =
    validatedConfig;

  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{ height, scrollbarWidth: "none" }}
      className="mx-2 flex max-w-full items-center"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={twMerge(
          `${className} absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-4 rounded-2xl border border-muted pb-2 px-4`
        )}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
// src/components/razBits/Dock/Dock.tsx
