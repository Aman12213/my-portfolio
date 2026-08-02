"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const ring2Ref = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      gsap.to(ringRef.current, { rotate: 360, duration: 4, repeat: -1, ease: "none" });
      gsap.to(ring2Ref.current, { rotate: -360, duration: 2.4, repeat: -1, ease: "none" });
      gsap.fromTo(
        textRef.current,
        { opacity: 0, letterSpacing: "0.1em" },
        { opacity: 1, letterSpacing: "0.35em", duration: 1, ease: "power2.out" }
      );

      gsap.to(rootRef.current, {
        opacity: 0,
        filter: "blur(12px)",
        delay: 1.7,
        duration: 0.7,
        ease: "power2.inOut",
        onComplete: () => {
          document.body.style.overflow = "";
          setMounted(false);
        },
      });
    }, rootRef);
    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-24 w-24">
          <span
            ref={ringRef}
            className="absolute inset-0 rounded-full border border-fg/25"
          />
          <span
            ref={ring2Ref}
            className="absolute inset-2 rounded-full border-t-2 border-fg"
          />
          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg" />
        </div>
        <p ref={textRef} className="font-display text-sm tracking-[0.35em] text-fg/70">
          LOADING
        </p>
      </div>
    </div>
  );
}
