"use client";

import { EXPERIENCE } from "@/lib/data";
import SectionLabel from "./SectionLabel";

export default function ExperienceList() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionLabel left="Experience" right="Fonix Technology" />

      <div>
        <span data-mc="line" aria-hidden className="block h-px bg-fg/15" />
        {EXPERIENCE.map((exp) => (
          <div key={exp.role} className="relative grid gap-4 py-8 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <span data-mc="type" className="font-display text-sm text-fg/50">
                {exp.period}
              </span>
            </div>
            <div className="md:col-span-9">
              <h3
                data-mc="type"
                className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
              >
                {exp.role}
              </h3>
              <p data-mc="type" className="mt-1 text-sm text-fg/50">
                {exp.company}
              </p>
              <p data-mc="type" className="mt-4 max-w-2xl leading-relaxed text-fg/60">
                {exp.description}
              </p>
              <ul data-mc="type" className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {exp.achievements.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-fg/55">
                    <span className="h-1 w-1 rounded-full bg-fg/40" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <span
              data-mc="line"
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px bg-fg/15"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
