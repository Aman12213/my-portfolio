"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3" });
    const xGlow = gsap.quickTo(glow, "x", { duration: 0.5, ease: "power3" });
    const yGlow = gsap.quickTo(glow, "y", { duration: 0.5, ease: "power3" });

    // Stay hidden until the real mouse moves, so the first screen is truly empty.
    let shown = false;
    const move = (e: MouseEvent) => {
      if (!shown) {
        shown = true;
        gsap.set([dot, glow], { x: e.clientX, y: e.clientY });
        gsap.to([dot, glow], { opacity: 1, duration: 0.4, ease: "power2.out" });
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xGlow(e.clientX);
      yGlow(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] h-5 w-5 opacity-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg mix-blend-difference"
      />
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 h-[360px] opacity-0 w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--fg) / 0.10), transparent 68%)",
        }}
      />
    </>
  );
}
