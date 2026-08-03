"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { HERO_LINES, HERO_LAST, HERO_INTRO, PROFILE } from "@/lib/data";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import MaskLines from "./MaskLines";
import MagneticButton from "./MagneticButton";

export default function HeroEditorial() {
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();
      // fade in the meta bits after the mask lines
      gsap.from(".hero-fade", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 2.7,
        stagger: 0.12,
        ease: "power3.out",
      });

      if (!reduced) {
        gsap.to(contentRef.current, {
          yPercent: -12,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const lines = HERO_LINES.map((l, i) => (
    <span key={i}>
      {l.t}
      {l.i && <span className="serif-italic">{l.i}</span>}
      {i === HERO_LINES.length - 1 && <span className="serif-italic">{HERO_LAST}</span>}
    </span>
  ));

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative flex min-h-screen items-end px-6 pb-20 pt-32"
    >
      <div ref={contentRef} className="mx-auto w-full max-w-6xl">
        <p className="hero-fade mb-8 flex items-center gap-2 font-display text-xs uppercase tracking-[0.25em] text-fg/60">
          <span className="text-fg/40">©</span> {PROFILE.experience} · Backend &amp; AI Engineer · {PROFILE.location}
        </p>

        <MaskLines
          trigger="load"
          delay={2.1}
          stagger={0.13}
          className="font-display text-[13vw] font-semibold leading-[0.98] tracking-tight text-fg sm:text-7xl md:text-8xl lg:text-[6.5rem]"
        >
          {lines}
        </MaskLines>

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-xl text-base leading-relaxed text-fg/60 sm:text-lg">
            {HERO_INTRO}
          </p>

          <div className="hero-fade flex flex-shrink-0 items-center gap-3">
            <MagneticButton>
              <a
                href="#about"
                className="group flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
              >
                More About Me
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#work"
                className="flex items-center gap-2 rounded-full border border-fg/20 px-6 py-3 text-sm font-medium text-fg/80 transition-colors hover:border-fg/60 hover:text-fg"
              >
                View Work <ArrowUpRight className="h-4 w-4" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href={PROFILE.resume}
                download
                className="flex items-center gap-2 rounded-full border border-fg/20 px-6 py-3 text-sm font-medium text-fg/80 transition-colors hover:border-fg/60 hover:text-fg"
              >
                Download CV <Download className="h-4 w-4" />
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="hero-fade absolute bottom-6 right-6 hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-fg/40 md:flex">
        Scroll <ArrowDown className="h-3 w-3 animate-bounce" />
      </div>
    </section>
  );
}
