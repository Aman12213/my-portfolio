"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Counts up from 0 when the cursor crew reveals it (the `mc:reveal` event on
 * its nearest [data-mc] host). Without the crew it simply shows the number.
 */
export default function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.closest("[data-mc]");
    if (!el || !host) return;

    // Update the existing text node so React keeps its reference to it.
    const write = (v: number) => {
      if (el.firstChild) el.firstChild.nodeValue = `${v}${suffix}`;
    };
    let tween: gsap.core.Tween | null = null;
    const onReveal = (e: Event) => {
      if ((e as CustomEvent<{ instant?: boolean }>).detail?.instant) return;
      const obj = { val: 0 };
      write(0);
      tween?.kill();
      tween = gsap.to(obj, {
        val: to,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => write(Math.round(obj.val)),
      });
    };

    host.addEventListener("mc:reveal", onReveal);
    return () => {
      host.removeEventListener("mc:reveal", onReveal);
      tween?.kill();
      write(to);
    };
  }, [to, suffix]);

  return <span ref={ref}>{`${to}${suffix}`}</span>;
}
