"use client";

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const Comp = as as ElementType;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      // opacity + transform only — compositor-friendly, no layout/filter cost
      gsap.fromTo(
        el,
        { opacity: 0, y, force3D: true },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y]);

  return (
    <Comp ref={ref} className={`reveal ${className ?? ""}`}>
      {children}
    </Comp>
  );
}
