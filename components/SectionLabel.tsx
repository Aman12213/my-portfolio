"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function SectionLabel({ left, right }: { left: string; right: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const line = el.querySelector(".sl-line");
    const tween = gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={ref} className="mb-8 flex items-center gap-4">
      <div className="flex items-center gap-2 whitespace-nowrap font-display text-xs uppercase tracking-[0.2em] text-fg/60">
        <span className="text-fg/40">©</span>
        <span className="text-fg/80">{left}</span>
        <span className="text-fg/30">|</span>
        <span className="text-fg/50">{right}</span>
      </div>
      <span className="sl-line h-px flex-1 origin-left bg-fg/20" />
    </div>
  );
}
