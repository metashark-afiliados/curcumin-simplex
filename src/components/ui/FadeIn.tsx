// src/components/ui/FadeIn.tsx
"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
};

export function FadeIn({ children, className }: FadeInProps) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Opcional: desconectar el observer una vez que el elemento es visible
          observer.unobserve(entry.target);
        }
      });
    });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  const classes = [
    className,
    "transition-all duration-1000 ease-out",
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={domRef} className={classes}>
      {children}
    </div>
  );
}
