"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { gsap } from "@/lib/gsap";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function TiltCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rx = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power3" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rx(-py * 12);
      ry(px * 12);
    };
    const reset = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="group relative h-full overflow-hidden rounded-3xl glass-strong p-7"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(600px_circle_at_50%_0%,rgb(var(--fg)/0.10),transparent_60%)]" />

      <div style={{ transform: "translateZ(40px)" }} className="relative">
        <div className="flex items-start justify-between">
          <span className="rounded-xl bg-fg/10 px-3 py-1 font-display text-xs tracking-wide text-fg/80">
            {project.tagline}
          </span>
          <div className="flex gap-2">
            <a
              href="#"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-fg/5 text-fg/60 transition-colors hover:text-fg"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Live demo"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-fg/5 text-fg/60 transition-colors hover:text-fg"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <h3 className="mt-6 font-display text-2xl font-bold text-fg">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-fg/55">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-fg/10 bg-fg/[0.03] px-2.5 py-1 text-xs text-fg/70"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="PROJECTS"
        title="Systems I've built"
        subtitle="A selection of backend, cloud, and AI systems shipped to production."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1200px" }}>
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i} className="h-full">
            <TiltCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
