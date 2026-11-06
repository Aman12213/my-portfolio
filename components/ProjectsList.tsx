"use client";

import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/data";
import SectionLabel from "./SectionLabel";

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <a href={project.url} target="_blank" rel="noreferrer" className="group relative block">
      <span data-mc="line" aria-hidden className="absolute inset-x-0 top-0 h-px bg-fg/15" />
      <div className="relative flex items-center gap-4 py-8 md:py-10">
        <span data-mc="type" className="w-10 shrink-0 font-display text-sm text-fg/40 md:w-16">
          {num}
        </span>

        <div className="min-w-0 flex-1">
          <h3
            data-mc="type"
            className="font-display text-3xl font-semibold tracking-tight text-fg transition-transform duration-500 ease-out group-hover:translate-x-2 sm:text-4xl md:text-5xl"
          >
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
          <p data-mc="type" className="mt-2 text-sm text-fg/45">
            {project.tagline}
          </p>
        </div>

        <span
          data-mc="pop"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-fg/15 text-fg/60 transition-all duration-500 group-hover:rotate-45 group-hover:border-fg group-hover:bg-fg group-hover:text-bg"
        >
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

      <p data-mc="type" className="mb-6 max-w-2xl text-fg/55">
        Skip the filler and dive straight into the work that matters — real, live systems I&apos;ve
        designed and shipped end-to-end.
      </p>

      <div>
        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.title} project={p} index={i} />
        ))}
        <span data-mc="line" aria-hidden className="block h-px bg-fg/15" />
      </div>
    </section>
  );
}
