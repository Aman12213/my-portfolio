"use client";

import { useLayoutEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { EXPERIENCE } from "@/lib/data";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    if (prefersReducedMotion()) {
      gsap.set(line, { scaleY: 1 });
      return;
    }
    const tween = gsap.fromTo(
      line,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: line,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="experience" className="relative mx-auto max-w-4xl px-6 py-28">
      <SectionHeading eyebrow="EXPERIENCE" title="A journey through systems" />

      <div className="relative">
        <div
          ref={lineRef}
          className="absolute left-4 top-2 h-full w-[2px] bg-gradient-to-b from-fg via-fg/60 to-transparent md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-12">
          {EXPERIENCE.map((exp, i) => (
            <Reveal key={exp.role} delay={i}>
              <div
                className={`relative flex flex-col gap-4 pl-12 md:w-1/2 md:pl-0 ${
                  i % 2 === 0 ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12 md:text-right"
                }`}
              >
                <span
                  className={`absolute left-[9px] top-2 h-4 w-4 rounded-full border-2 border-fg bg-bg md:left-auto ${
                    i % 2 === 0 ? "md:-left-2" : "md:-right-2"
                  }`}
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-fg/40" />
                </span>

                <div className="rounded-3xl glass p-6 transition-all hover:glow">
                  <span className="font-display text-xs tracking-widest text-fg/50">{exp.period}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-fg">{exp.role}</h3>
                  <p className="text-sm text-fg/70">{exp.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-fg/55">{exp.description}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.achievements.map((a) => (
                      <li
                        key={a}
                        className={`flex items-start gap-2 text-sm text-fg/70 ${
                          i % 2 === 0 ? "" : "md:flex-row-reverse md:text-right"
                        }`}
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-fg/80" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
