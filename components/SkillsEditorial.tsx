"use client";

import { SKILL_GROUPS } from "@/lib/data";
import SectionLabel from "./SectionLabel";

export default function SkillsEditorial() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionLabel left="Capabilities" right="Stack & Tools" />

      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_GROUPS.map((group, gi) => (
          // Each column is one typing job, so the crew writes them side by side.
          <div key={group.category} data-mc="type">
            <h3 className="mb-4 font-display text-lg font-semibold text-fg">
              <span className="text-fg/40">0{gi + 1} </span>
              {group.category}
            </h3>
            <ul className="space-y-2">
              {group.skills.map((s) => (
                <li key={s} className="text-sm text-fg/55">
                  <span className="link-underline cursor-default hover:text-fg">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
