"use client";

import { Brain, Cloud, Database, Server, Sparkles, type LucideIcon } from "lucide-react";
import { SKILL_GROUPS } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const ICONS: Record<string, LucideIcon> = { Server, Brain, Cloud, Database, Sparkles };

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="SKILLS"
        title="The full stack, end to end"
        subtitle="From distributed backends and cloud infrastructure to AI agents and polished frontends."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group, gi) => {
          const Icon = ICONS[group.icon] ?? Server;
          return (
            <Reveal key={group.category} delay={gi} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-3xl glass p-6 transition-all duration-300 hover:-translate-y-1.5 hover:glow">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-fg/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />

                <div className="relative flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fg/10 text-fg">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-fg">{group.category}</h3>
                </div>

                <div className="relative mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-fg/10 bg-fg/[0.03] px-2.5 py-1 text-xs text-fg/70 transition-colors hover:border-fg/40 hover:text-fg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
