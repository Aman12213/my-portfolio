"use client";

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  as = "div",
  variant = "fade",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: ElementType;
  variant?: "fade" | "card";
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
      const from =
        variant === "card"
          ? { opacity: 0, y: y + 20, scale: 0.94, force3D: true }
          : { opacity: 0, y, force3D: true };
      gsap.fromTo(el, from, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: variant === "card" ? 0.95 : 0.8,
        delay: delay * 0.09,
        ease: variant === "card" ? "back.out(1.4)" : "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay, y, variant]);

  return (
    <Comp ref={ref} className={`reveal ${className ?? ""}`}>
      {children}
    </Comp>
  );
}
