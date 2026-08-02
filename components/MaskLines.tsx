"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Framer-style line-by-line mask reveal.
 * Each child (a line) is wrapped in an overflow-hidden block and slides up.
 */
export default function MaskLines({
  children,
  className,
  delay = 0,
  trigger = "scroll",
  stagger = 0.12,
}: {
  children: ReactNode[];
  className?: string;
  delay?: number;
  trigger?: "load" | "scroll";
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inners = el.querySelectorAll(".mask-inner");
    if (prefersReducedMotion()) {
      gsap.set(inners, { yPercent: 0, opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(inners, { yPercent: 115 });
      gsap.to(inners, {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
        stagger,
        delay: trigger === "load" ? delay : 0,
        scrollTrigger:
          trigger === "scroll"
            ? { trigger: el, start: "top 85%", once: true }
            : undefined,
      });
    }, el);
    return () => ctx.revert();
  }, [delay, trigger, stagger]);

  return (
    <div ref={ref} className={className}>
      {children.map((line, i) => (
        <span key={i} className="mask-line">
          <span className="mask-inner">{line}</span>
        </span>
      ))}
    </div>
  );
}
