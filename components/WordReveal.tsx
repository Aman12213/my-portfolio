"use client";

import { useLayoutEffect, useRef, type ElementType } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Framer-style word-by-word fade/rise reveal on scroll.
 */
export default function WordReveal({
  text,
  className,
  as = "p",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const Comp = as as ElementType;
  const words = text.split(" ");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll(".wr-word");
    if (prefersReducedMotion()) {
      gsap.set(spans, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { opacity: 0.12, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.022,
          delay,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay]);

  return (
    <Comp ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="wr-word inline-block whitespace-pre">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Comp>
  );
}
