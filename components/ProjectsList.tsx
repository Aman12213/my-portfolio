"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/data";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionLabel from "./SectionLabel";

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const num = String(index + 1).padStart(2, "0");

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="group relative block border-t border-fg/12"
    >
      <div ref={ref} className="relative flex items-center gap-4 py-8 md:py-10">
        <span className="w-10 shrink-0 font-display text-sm text-fg/40 md:w-16">{num}</span>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-3xl font-semibold tracking-tight text-fg transition-transform duration-500 ease-out group-hover:translate-x-2 sm:text-4xl md:text-5xl">
            {project.title}
          </h3>
          <div className="mt-3 flex max-h-0 flex-wrap gap-2 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:max-h-20 group-hover:opacity-100">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-fg/15 px-3 py-1 text-xs text-fg/60"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-2 text-sm text-fg/45">{project.tagline}</p>
        </div>

        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-fg/15 text-fg/60 transition-all duration-500 group-hover:rotate-45 group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </a>
  );
}

export default function ProjectsList() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionLabel left="Featured Projects" right="Case Studies" />

      <p className="mb-6 max-w-2xl text-fg/55">
        Skip the filler and dive straight into the work that matters — real, live systems I&apos;ve
        designed and shipped end-to-end.
      </p>

      <div className="border-b border-fg/12">
        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
